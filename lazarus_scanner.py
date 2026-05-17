#!/usr/bin/env python3
"""
Lazarus 'Contagious Interview' / BeaverTail scanner + safeguarder.

Detects, kills, and prevents reinfection from the JS-config supply-chain
attack documented at:
https://github.com/orgs/community/discussions/188732#discussioncomment-16368443

Cross-platform: Linux, macOS, Windows.  Standard library only.

Quick usage:
    python3 lazarus_scanner.py                      # scan cwd
    python3 lazarus_scanner.py --scan-home          # scan home
    python3 lazarus_scanner.py --scan-home --fix    # quarantine + clean configs
    python3 lazarus_scanner.py --kill               # kill suspicious processes
    python3 lazarus_scanner.py --harden             # proactive defenses
    python3 lazarus_scanner.py --all                # scan + fix + kill + harden
    python3 lazarus_scanner.py --watch              # continuous monitor
"""

from __future__ import annotations

import argparse
import json
import os
import platform
import re
import shutil
import signal
import subprocess
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterator

IS_WINDOWS = os.name == "nt"
IS_MACOS = platform.system() == "Darwin"
IS_LINUX = platform.system() == "Linux"

# ===========================================================================
# IOCs (file content)
# ===========================================================================

IOC_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"global\[\s*['\"]!['\"]\s*\]"),         "global['!'] marker"),
    (re.compile(r"_\$_1e42"),                            "_$_1e42 obfuscation marker"),
    (re.compile(r"global\[['\"]_V['\"]\]\s*=\s*['\"]A4-1928['\"]"), "A4-1928 marker"),
    (re.compile(r"api\.trongrid\.io"),                   "TRON RPC endpoint"),
    (re.compile(r"bsc-dataseed"),                        "BSC RPC endpoint"),
    (re.compile(r"data-seed-prebsc"),                    "BSC testnet endpoint"),
    (re.compile(r"\bTronWeb\b"),                         "TronWeb library reference"),
    (re.compile(r"ethers\.providers\.JsonRpcProvider"),  "ethers RPC provider in config"),
    (re.compile(r"icloud\.com.*upload", re.IGNORECASE),  "icloud exfil endpoint"),
    (re.compile(r"\bSolana\b.*Keypair", re.IGNORECASE),  "Solana keypair access"),
    (re.compile(r"login\.keychain", re.IGNORECASE),      "macOS keychain reference"),
    (re.compile(r"\.config/google-chrome|Login Data"),   "Chrome creds path"),
]

WHITESPACE_RUN = re.compile(r"[ \t]{200,}")
EVAL_PATTERN   = re.compile(r"\beval\s*\(")
LONG_B64       = re.compile(r"['\"][A-Za-z0-9+/=_-]{500,}['\"]")

# IOCs in process command lines.
PROCESS_CMDLINE_IOCS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"trongrid", re.IGNORECASE),         "TRON RPC in cmdline"),
    (re.compile(r"bsc-dataseed", re.IGNORECASE),     "BSC RPC in cmdline"),
    (re.compile(r"data-seed-prebsc", re.IGNORECASE), "BSC testnet in cmdline"),
    (re.compile(r"_\$_1e42"),                        "obfuscation marker in cmdline"),
    (re.compile(r"\bTronWeb\b"),                     "TronWeb in cmdline"),
    (re.compile(r"\bSolana\b.*Keypair"),             "Solana keypair access"),
]

# Hosts to suggest blocking via the hosts file.  Not auto-written — needs root.
C2_HOSTS = [
    "api.trongrid.io",
    "api.shasta.trongrid.io",
    "api.nileex.io",
    "bsc-dataseed.binance.org",
    "bsc-dataseed1.defibit.io",
    "bsc-dataseed1.ninicoin.io",
    "data-seed-prebsc-1-s1.binance.org",
    "data-seed-prebsc-2-s1.binance.org",
]

CONFIG_FILE_NAMES = {
    "next.config.js", "next.config.mjs", "next.config.cjs", "next.config.ts",
    "postcss.config.js", "postcss.config.mjs", "postcss.config.cjs",
    "tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs",
    "vite.config.js", "vite.config.ts", "vite.config.mjs",
    "webpack.config.js", "webpack.config.ts",
    "rollup.config.js", "rollup.config.mjs",
    "svelte.config.js", "astro.config.mjs", "nuxt.config.ts",
    "remix.config.js", "gatsby-config.js",
    "babel.config.js", "babel.config.mjs", "babel.config.cjs",
}

SKIP_DIRS = {
    "node_modules", ".git", ".next", ".nuxt", ".turbo", ".svelte-kit",
    "dist", "build", "out", ".cache", ".venv", "venv", "__pycache__",
    ".pnpm-store", ".yarn", ".vercel", ".vscode-server",
}


@dataclass
class FileFinding:
    path: Path
    size: int
    indicators: list[str] = field(default_factory=list)
    backup_path: Path | None = None
    cleaned: bool = False
    clean_message: str = ""


@dataclass
class ProcessFinding:
    pid: int
    score: int
    indicators: list[str]
    cmdline: str
    cwd: str = ""
    exe: str = ""
    user: str = ""
    ppid: int = 0
    killed: bool = False
    kill_message: str = ""


# ===========================================================================
# File scanning
# ===========================================================================

def iter_targets(root: Path) -> Iterator[Path]:
    for dirpath, dirnames, filenames in os.walk(root, followlinks=False):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        for fn in filenames:
            if fn in CONFIG_FILE_NAMES:
                yield Path(dirpath) / fn


def scan_file(path: Path) -> FileFinding | None:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
        size = path.stat().st_size
    except OSError:
        return None

    indicators: list[str] = []
    for pat, label in IOC_PATTERNS:
        if pat.search(text):
            indicators.append(f"IOC: {label}")
    if WHITESPACE_RUN.search(text):
        indicators.append("hidden payload: whitespace run >200 chars")
    has_eval = bool(EVAL_PATTERN.search(text))
    if has_eval:
        indicators.append("contains eval()")
    if LONG_B64.search(text):
        indicators.append("long encoded blob (>=500 chars)")
    if size > 8192 and has_eval:
        indicators.append(f"large config ({size}B) with eval()")
    return FileFinding(path=path, size=size, indicators=indicators) if indicators else None


def quarantine(path: Path) -> Path:
    backup = path.with_suffix(path.suffix + f".malware-backup-{int(time.time())}")
    shutil.copy2(path, backup)
    return backup


def clean_file(path: Path) -> tuple[bool, str]:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError as e:
        return False, f"read failed: {e}"
    end_markers = [
        re.compile(r"export\s+default\s+[A-Za-z_$][\w$]*\s*;", re.MULTILINE),
        re.compile(r"module\.exports\s*=\s*[A-Za-z_$][\w$]*\s*;", re.MULTILINE),
        re.compile(r"export\s+default\s+\{[\s\S]*?\}\s*;?", re.MULTILINE),
        re.compile(r"module\.exports\s*=\s*\{[\s\S]*?\}\s*;?", re.MULTILINE),
    ]
    cut = -1
    for pat in end_markers:
        m = pat.search(text)
        if m:
            cut = m.end() if cut < 0 else min(cut, m.end())
    if cut < 0:
        return False, "no legit end marker found — review manually"
    cleaned = text[:cut].rstrip() + "\n"
    if cleaned == text:
        return False, "no trailing payload to remove"
    removed = len(text) - len(cleaned)
    if removed < 50:
        return False, f"trailing diff only {removed}B — skipping"
    path.write_text(cleaned, encoding="utf-8")
    return True, f"removed {removed}B of trailing content"


# ===========================================================================
# Process scanning
# ===========================================================================

def _list_processes_linux() -> list[dict[str, Any]]:
    procs: list[dict[str, Any]] = []
    proc_root = Path("/proc")
    if not proc_root.exists():
        return procs
    for pid_dir in proc_root.iterdir():
        if not pid_dir.name.isdigit():
            continue
        pid = int(pid_dir.name)
        try:
            cmdline_raw = (pid_dir / "cmdline").read_bytes()
            if not cmdline_raw:
                continue
            args = [a.decode("utf-8", "replace") for a in cmdline_raw.split(b"\0") if a]
            cmdline = " ".join(args)
            stat = (pid_dir / "stat").read_text()
            m = re.match(r"\d+\s+\(.*\)\s+\S+\s+(\d+)", stat)
            ppid = int(m.group(1)) if m else 0
            try:
                cwd = os.readlink(pid_dir / "cwd")
            except OSError:
                cwd = ""
            try:
                exe = os.readlink(pid_dir / "exe")
            except OSError:
                exe = ""
            uid = ""
            try:
                for line in (pid_dir / "status").read_text().splitlines():
                    if line.startswith("Uid:"):
                        uid = line.split()[1]
                        break
            except OSError:
                pass
            procs.append({
                "pid": pid, "ppid": ppid, "user": uid,
                "cmdline": cmdline, "cwd": cwd, "exe": exe,
            })
        except (OSError, ValueError):
            continue
    return procs


def _list_processes_posix() -> list[dict[str, Any]]:
    """ps fallback for macOS / non-Linux POSIX."""
    try:
        out = subprocess.run(
            ["ps", "-eo", "pid,ppid,user,command"],
            capture_output=True, text=True, timeout=10,
        ).stdout
    except (subprocess.SubprocessError, FileNotFoundError):
        return []
    procs: list[dict[str, Any]] = []
    for line in out.splitlines()[1:]:
        parts = line.split(None, 3)
        if len(parts) < 4:
            continue
        try:
            pid, ppid, user, cmd = parts
            procs.append({
                "pid": int(pid), "ppid": int(ppid), "user": user,
                "cmdline": cmd, "cwd": "", "exe": "",
            })
        except ValueError:
            continue
    return procs


def _list_processes_windows() -> list[dict[str, Any]]:
    try:
        out = subprocess.run(
            ["powershell", "-NoProfile", "-Command",
             "Get-CimInstance Win32_Process | "
             "Select-Object ProcessId,ParentProcessId,Name,CommandLine,ExecutablePath | "
             "ConvertTo-Json -Depth 2"],
            capture_output=True, text=True, timeout=15,
        ).stdout
    except (subprocess.SubprocessError, FileNotFoundError):
        return []
    if not out.strip():
        return []
    try:
        data = json.loads(out)
    except json.JSONDecodeError:
        return []
    if isinstance(data, dict):
        data = [data]
    procs: list[dict[str, Any]] = []
    for p in data:
        procs.append({
            "pid": int(p.get("ProcessId") or 0),
            "ppid": int(p.get("ParentProcessId") or 0),
            "user": "",
            "cmdline": p.get("CommandLine") or p.get("Name") or "",
            "cwd": "",
            "exe": p.get("ExecutablePath") or "",
        })
    return procs


def list_processes() -> list[dict[str, Any]]:
    if IS_LINUX:
        return _list_processes_linux()
    if IS_WINDOWS:
        return _list_processes_windows()
    return _list_processes_posix()


def score_process(p: dict[str, Any]) -> tuple[int, list[str]]:
    """Return (score, reasons).  Score >= 2 = suspicious."""
    cmdline = (p.get("cmdline") or "").lower()
    cwd     = (p.get("cwd") or "").lower()
    exe     = (p.get("exe") or "").lower()

    if not any(t in (cmdline + " " + exe) for t in ("node", "electron", "bun")):
        return 0, []

    score = 0
    reasons: list[str] = []

    for pat, label in PROCESS_CMDLINE_IOCS:
        if pat.search(p.get("cmdline") or ""):
            reasons.append(label)
            score += 2

    if len(cmdline) > 1500:
        reasons.append(f"very long cmdline ({len(cmdline)} chars)")
        score += 1

    sus_paths = ("/tmp/", "/var/tmp/", "/dev/shm/",
                 "appdata\\local\\temp\\", "\\windows\\temp\\",
                 "/private/tmp/")
    for sp in sus_paths:
        if sp in cwd or sp in exe:
            reasons.append(f"runs from temp path: {sp}")
            score += 2
            break

    if p.get("ppid") == 1 and "node" in cmdline:
        reasons.append("detached (ppid=1)")
        score += 1

    if "eval(" in cmdline or "atob(" in cmdline:
        reasons.append("eval/atob in cmdline")
        score += 2

    if re.search(r"['\"][A-Fa-f0-9]{200,}['\"]", cmdline):
        reasons.append("hex blob in cmdline")
        score += 2

    return score, reasons


def scan_processes() -> list[ProcessFinding]:
    findings: list[ProcessFinding] = []
    for p in list_processes():
        score, reasons = score_process(p)
        if score >= 2:
            findings.append(ProcessFinding(
                pid=p["pid"], score=score, indicators=reasons,
                cmdline=(p.get("cmdline") or "")[:500],
                cwd=p.get("cwd") or "", exe=p.get("exe") or "",
                user=str(p.get("user") or ""), ppid=p.get("ppid") or 0,
            ))
    return findings


def kill_process(pid: int) -> tuple[bool, str]:
    try:
        if IS_WINDOWS:
            subprocess.run(
                ["taskkill", "/F", "/PID", str(pid)],
                capture_output=True, text=True, timeout=5, check=True,
            )
        else:
            os.kill(pid, signal.SIGKILL)
        return True, f"killed pid {pid}"
    except (subprocess.CalledProcessError, ProcessLookupError, PermissionError, OSError) as e:
        return False, f"failed to kill pid {pid}: {e}"


# ===========================================================================
# Persistence checks
# ===========================================================================

def check_shell_persistence(home: Path) -> list[str]:
    notes: list[str] = []
    rc_files = [home / r for r in (".bashrc", ".bash_profile", ".profile",
                                    ".zshrc", ".zprofile",
                                    ".config/fish/config.fish")]
    sus = re.compile(
        r"(curl|wget|iwr|invoke-webrequest).*\|.*(node|sh|bash|powershell)",
        re.IGNORECASE,
    )
    for rc in rc_files:
        if not rc.exists():
            continue
        try:
            text = rc.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for n, line in enumerate(text.splitlines(), 1):
            if sus.search(line):
                notes.append(f"{rc}:{n}: {line.strip()[:120]}")
    return notes


def check_cron_persistence() -> list[str]:
    if IS_WINDOWS:
        return []
    notes: list[str] = []
    try:
        out = subprocess.run(
            ["crontab", "-l"], capture_output=True, text=True, timeout=5,
        ).stdout
    except (subprocess.SubprocessError, FileNotFoundError):
        return notes
    sus = re.compile(r"(curl|wget|node\b)", re.IGNORECASE)
    for n, line in enumerate(out.splitlines(), 1):
        if line.strip() and not line.lstrip().startswith("#") and sus.search(line):
            notes.append(f"crontab:{n}: {line.strip()[:150]}")
    return notes


def check_launchd_persistence(home: Path) -> list[str]:
    if not IS_MACOS:
        return []
    notes: list[str] = []
    for d in (home / "Library" / "LaunchAgents",):
        if not d.exists():
            continue
        for plist in d.glob("*.plist"):
            try:
                t = plist.read_text(encoding="utf-8", errors="replace")
            except OSError:
                continue
            if re.search(r"(node|curl|wget)", t, re.IGNORECASE):
                notes.append(f"{plist}: contains node/curl reference — review")
    return notes


def check_windows_persistence() -> list[str]:
    if not IS_WINDOWS:
        return []
    notes: list[str] = []
    try:
        out = subprocess.run([
            "powershell", "-NoProfile", "-Command",
            "Get-ScheduledTask | "
            "Where-Object { $_.Actions.Execute -match 'node|curl|wget' } | "
            "Select-Object TaskName,@{N='Cmd';E={$_.Actions.Execute}},"
            "@{N='Args';E={$_.Actions.Arguments}} | ConvertTo-Json -Depth 3",
        ], capture_output=True, text=True, timeout=15).stdout
        if out.strip():
            notes.append(f"scheduled task references node/curl/wget — review:\n{out.strip()}")
    except (subprocess.SubprocessError, FileNotFoundError):
        pass
    try:
        out = subprocess.run([
            "powershell", "-NoProfile", "-Command",
            "Get-ItemProperty HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run "
            "| Out-String",
        ], capture_output=True, text=True, timeout=10).stdout
        for line in out.splitlines():
            if re.search(r"node|curl|wget|powershell.*-enc", line, re.IGNORECASE):
                notes.append(f"HKCU Run: {line.strip()}")
    except (subprocess.SubprocessError, FileNotFoundError):
        pass
    return notes


def all_persistence_checks(home: Path) -> list[str]:
    out: list[str] = []
    out.extend(check_shell_persistence(home))
    out.extend(check_cron_persistence())
    out.extend(check_launchd_persistence(home))
    out.extend(check_windows_persistence())
    return out


# ===========================================================================
# Hardening
# ===========================================================================

def harden_npm_ignore_scripts() -> tuple[bool, str]:
    try:
        cur = subprocess.run(
            ["npm", "config", "get", "ignore-scripts"],
            capture_output=True, text=True, timeout=10,
        ).stdout.strip()
        if cur == "true":
            return True, "npm ignore-scripts already true"
        subprocess.run(
            ["npm", "config", "set", "ignore-scripts", "true"],
            capture_output=True, text=True, timeout=10, check=True,
        )
        return True, "npm ignore-scripts=true (revert: npm config delete ignore-scripts)"
    except (subprocess.SubprocessError, FileNotFoundError) as e:
        return False, f"npm not available or set failed: {e}"


def hosts_path() -> Path:
    if IS_WINDOWS:
        return Path(r"C:\Windows\System32\drivers\etc\hosts")
    return Path("/etc/hosts")


def check_hosts_blocked() -> tuple[set[str], set[str]]:
    p = hosts_path()
    try:
        text = p.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return set(), set(C2_HOSTS)
    blocked: set[str] = set()
    for h in C2_HOSTS:
        if re.search(rf"^\s*[\d.:a-fA-F]+\s+{re.escape(h)}\s*$", text, re.MULTILINE):
            blocked.add(h)
    return blocked, set(C2_HOSTS) - blocked


def hosts_block_lines(missing: set[str]) -> list[str]:
    return [f"127.0.0.1\t{h}" for h in C2_HOSTS if h in missing]


def clear_git_credential_cache() -> tuple[bool, str]:
    try:
        subprocess.run(
            ["git", "credential-cache", "exit"],
            capture_output=True, text=True, timeout=5,
        )
        return True, "ran git credential-cache exit"
    except (subprocess.SubprocessError, FileNotFoundError) as e:
        return False, f"git unavailable: {e}"


def harden(report_lines: list[str]) -> None:
    ok, msg = harden_npm_ignore_scripts()
    report_lines.append(("OK   " if ok else "FAIL ") + msg)
    ok, msg = clear_git_credential_cache()
    report_lines.append(("OK   " if ok else "FAIL ") + msg)
    blocked, missing = check_hosts_blocked()
    if missing:
        report_lines.append(
            f"hosts file is missing {len(missing)} C2 entries — append to "
            f"{hosts_path()} as root/admin:"
        )
        for line in hosts_block_lines(missing):
            report_lines.append(f"  {line}")
    else:
        report_lines.append("OK   all C2 hosts blocked in hosts file")


# ===========================================================================
# CLI
# ===========================================================================

def confirm(prompt: str, assume_yes: bool) -> bool:
    if assume_yes:
        return True
    try:
        return input(f"{prompt} [y/N] ").strip().lower() == "y"
    except EOFError:
        return False


def run_once(args: argparse.Namespace, home: Path) -> dict[str, Any]:
    roots = [Path(p).expanduser().resolve() for p in (args.paths or [os.getcwd()])]
    if args.scan_home:
        roots.append(home)

    seen_files: set[Path] = set()
    file_findings: list[FileFinding] = []
    for root in roots:
        if not root.exists():
            print(f"skip (missing): {root}", file=sys.stderr)
            continue
        for path in iter_targets(root):
            rp = path.resolve()
            if rp in seen_files:
                continue
            seen_files.add(rp)
            f = scan_file(rp)
            if f:
                file_findings.append(f)

    if args.fix:
        for f in file_findings:
            f.backup_path = quarantine(f.path)
            ok, msg = clean_file(f.path)
            f.cleaned = ok
            f.clean_message = msg

    proc_findings: list[ProcessFinding] = []
    if not args.no_process_check:
        proc_findings = scan_processes()

    if args.kill and proc_findings:
        for pf in proc_findings:
            preview = (pf.cmdline[:80] + "…") if len(pf.cmdline) > 80 else pf.cmdline
            if confirm(f"kill pid {pf.pid} (score {pf.score})? {preview}", args.yes):
                ok, msg = kill_process(pf.pid)
                pf.killed = ok
                pf.kill_message = msg

    persistence = all_persistence_checks(home)

    harden_results: list[str] = []
    if args.harden:
        harden(harden_results)

    return {
        "timestamp": time.time(),
        "scanned_files": len(seen_files),
        "scanned_roots": [str(r) for r in roots],
        "file_findings": [
            {
                "path": str(f.path), "size": f.size, "indicators": f.indicators,
                "backup": str(f.backup_path) if f.backup_path else None,
                "cleaned": f.cleaned, "clean_message": f.clean_message,
            } for f in file_findings
        ],
        "process_findings": [
            {
                "pid": p.pid, "score": p.score, "indicators": p.indicators,
                "cmdline": p.cmdline, "cwd": p.cwd, "exe": p.exe,
                "user": p.user, "ppid": p.ppid,
                "killed": p.killed, "kill_message": p.kill_message,
            } for p in proc_findings
        ],
        "persistence": persistence,
        "harden_results": harden_results,
    }


def render(report: dict[str, Any], args: argparse.Namespace) -> int:
    if args.json:
        print(json.dumps(report, indent=2, default=str))
    else:
        print(f"scanned {report['scanned_files']} config file(s) "
              f"across {len(report['scanned_roots'])} root(s)")
        ff = report["file_findings"]
        pf = report["process_findings"]
        pst = report["persistence"]
        hr = report["harden_results"]

        if not ff:
            print("  files:        clean")
        else:
            print(f"\n  FILE FINDINGS ({len(ff)}):")
            for f in ff:
                print(f"    {f['path']}  [{f['size']}B]")
                for ind in f["indicators"]:
                    print(f"      - {ind}")
                if f["backup"]:
                    print(f"      backup: {f['backup']}")
                if f["clean_message"]:
                    s = "CLEANED" if f["cleaned"] else "skip"
                    print(f"      {s}: {f['clean_message']}")

        if args.no_process_check:
            print("  processes:    skipped (--no-process-check)")
        elif not pf:
            print("  processes:    clean")
        else:
            print(f"\n  PROCESS FINDINGS ({len(pf)}):")
            for p in pf:
                cm = (p["cmdline"][:120] + "…") if len(p["cmdline"]) > 120 else p["cmdline"]
                k = " [KILLED]" if p["killed"] else ""
                print(f"    pid {p['pid']} ppid {p['ppid']} score {p['score']}{k}")
                print(f"      cmd: {cm}")
                for ind in p["indicators"]:
                    print(f"      - {ind}")
                if p["kill_message"] and not p["killed"]:
                    print(f"      kill: {p['kill_message']}")

        if pst:
            print(f"\n  PERSISTENCE ({len(pst)}):")
            for line in pst:
                print(f"    {line}")
        else:
            print("  persistence:  clean")

        if hr:
            print("\n  HARDENING:")
            for line in hr:
                print(f"    {line}")

    if args.log:
        try:
            args.log.parent.mkdir(parents=True, exist_ok=True)
            with args.log.open("a", encoding="utf-8") as fp:
                fp.write(json.dumps(report, default=str) + "\n")
        except OSError as e:
            print(f"log write failed: {e}", file=sys.stderr)

    bad = bool(report["file_findings"] or report["process_findings"]
               or report["persistence"])
    return 1 if bad else 0


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Scan, kill, and safeguard against the Lazarus JS-config supply-chain attack.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    ap.add_argument("paths", nargs="*", help="Directories to scan (default: cwd)")
    ap.add_argument("--scan-home", action="store_true", help="Also scan $HOME")
    ap.add_argument("--fix", action="store_true",
                    help="Quarantine and clean infected config files")
    ap.add_argument("--kill", action="store_true",
                    help="Kill suspicious processes (with confirmation)")
    ap.add_argument("--harden", action="store_true",
                    help="Apply proactive defenses (npm ignore-scripts, hosts hint, ...)")
    ap.add_argument("--all", action="store_true",
                    help="Equivalent to --scan-home --fix --kill --harden")
    ap.add_argument("--yes", "-y", action="store_true",
                    help="Skip confirmation prompts")
    ap.add_argument("--watch", action="store_true",
                    help="Continuous scan loop (Ctrl-C to stop)")
    ap.add_argument("--interval", type=int, default=60,
                    help="Watch interval in seconds (default 60)")
    ap.add_argument("--json", action="store_true", help="Machine-readable output")
    ap.add_argument("--no-process-check", action="store_true",
                    help="Skip running-process inspection")
    ap.add_argument("--log", type=Path,
                    help="Append JSON findings to this log file")
    args = ap.parse_args()

    if args.all:
        args.scan_home = args.fix = args.kill = args.harden = True

    home = Path.home()

    if args.watch:
        print(f"watch mode (interval {args.interval}s, Ctrl-C to stop)")
        try:
            while True:
                report = run_once(args, home)
                print(f"\n=== {time.strftime('%Y-%m-%d %H:%M:%S')} ===")
                render(report, args)
                time.sleep(args.interval)
        except KeyboardInterrupt:
            print("\nstopped")
            return 0
    else:
        return render(run_once(args, home), args)


if __name__ == "__main__":
    sys.exit(main())
