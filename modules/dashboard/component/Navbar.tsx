import Link from 'next/link';
import React from 'react';
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

const NavDashBoard: React.FC<{ active: string }> = (props) => {
  return (
    <nav className={'max-w-[1240px] mx-auto pt-[22px] mt-[22px] mb-16 hidden lg:block px-4 '}>
      <ul className="gap-[72px] font-manropeB font-semibold text-[#737876] text-base text-center flex">
        {navLinks.map((nav) => (
          <li
            key={nav.link}
            className={`${
              nav.active === props.active &&
              'text-brand-green-primary border-b-2 border-b-brand-green-primary px-[31.5px]'
            } pb-2  whitespace-nowrap  cursor-pointer hover:text-brand-green-primary transition`}
          >
            <Link href={`${nav.link === '/' ? '/dashboard' : `/dashboard${nav.link}`}`}>{nav.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavDashBoard;
