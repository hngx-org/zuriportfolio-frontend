const navLinks: {
  link: string;
  title: string;
  active: string;
}[] = [
  {
    link: '/',
    title: 'Dashboard',
    active: 'dashboard',
  },
  {
    link: '/products',
    title: 'Products',
    active: 'products',
  },
  {
    link: '/orders',
    title: 'Order Management',
    active: 'orders',
  },
  {
    link: '/promotions',
    title: 'Promotions',
    active: 'promotions',
  },
  {
    link: '/reviews',
    title: 'Reviews',
    active: 'reviews',
  },
];

import Link from 'next/link';
import React from 'react';

const MobileNav: React.FC<{ active: string }> = (props) => {
  return (
    <div>
      <nav className={'lg:hidden'}>
        <ul className="gap-4 my-4 flex-col font-manropeL font-normal text-gray-600 text-base text-center flex">
          {navLinks.map((nav) => (
            <li key={nav.link}>
              <Link
                className={`${
                  nav.active === props.active && 'font-medium border-b-2 border-b-brand-green-primary '
                } pb-1  whitespace-nowrap  cursor-pointer transition`}
                href={`${nav.link === '/' ? '/dashboard' : `/dashboard${nav.link}`}`}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
