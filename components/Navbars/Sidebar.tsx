import NavDashBoard from '@modules/dashboard/component/Navbar';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

function Sidebar({ activePage }: { activePage: string }) {
  const sidebarStyle = (page: string) => {
    return page === activePage
      ? 'bg-dark-100 text-white-100 px-2 py-2 font-ppB'
      : 'bg-white-400 text-dark-100 font-ppReg px-2 py-2';
  };

  return <NavDashBoard active={activePage} />;
}

export default Sidebar;
