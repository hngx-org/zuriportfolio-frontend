import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

function Sidebar({ activePage }: { activePage: string }) {
  const sidebarStyle = (page: string) => {
    return page === activePage
      ? 'bg-dark-100 text-white-100 px-2 py-2 font-ppB'
      : 'bg-white-400 text-dark-100 font-ppReg px-2 py-2';
  };

  return (
    <div className="w-[250px] h-screen bg-white-100">
      <ul className="flex flex-col items-start justify-start">
        <Link href="/" className={twMerge(sidebarStyle('home'))}>
          Home
        </Link>
        <Link href="/auth/login" className={twMerge(sidebarStyle('login'))}>
          Login
        </Link>
        <Link href="/auth/signup" className={twMerge(sidebarStyle('signup'))}>
          Signup
        </Link>
        <Link href="/auth/signup" className={twMerge(sidebarStyle('dashboard'))}>
          Signup
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
