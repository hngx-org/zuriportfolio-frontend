import Link from "next/link";
import Image from "next/image";
function UI2FA() {
    return (
        <>
              <header className="w-full py-4
      border border-gray-300 border-opacity-40 border-x-0
      border-t-0 px-4 md:hidden relative z-3">
        <Link href={'/'}>
          <Image
          src="/assets/auth/zuri_logo.svg"
          alt="logo"
          width={120}
          height={120}
          style={{ width: "130px", height: "40px" }}
          />
        </Link>
      </header>
      <div className="h-full">
        <Image
        src="/assets/auth/auth_img.svg"
        alt="a person looking at a laptop"
        priority
        width={780}
        height={500}
        style={{ width: "950px", height: "100%" }}
        className="hidden md:block"
      />
      </div>
        <Image
          src="/assets/auth/unlock.svg"
          alt=""
          width={120}
          height={100}
          style={{ width: "280px", height: "100%" }}
          className="hidden md:block lg:hidden absolute bottom-[-0%] left-[-21.5%] z-[-1] opacity-70"
        />
        <Image
          src="/assets/auth/shape.svg"
          alt=""
          width={120}
          height={100}
          style={{ width: "280px", height: "100%" }}
          className="absolute bottom-[88%] md:bottom-[93%] left-[80%]
          lg:left-[70%] z-[-1] opacity-40 hidden md:block"
        />
        </>
    )
}

export default UI2FA;