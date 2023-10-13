// @ts-expect-error
import { Menu, Transition } from '@headlessui/react';
import { ArrowDown2 } from 'iconsax-react';
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

const MobileNav: React.FC<{ active: string }> = (props) => {
  return (
    <Menu as={'div'} className={'lg:hidden px-4'}>
      <Menu.Button className={'flex justify-between items-center w-full text-dark-200 mb-4'}>
        <span className="capitalize font-manropeB font-semibold tracking-wide">
          {navLinks.find((link) => link.active === props.active)?.title || props.active}
        </span>
        <ArrowDown2 size="24" color="#1E1E22" />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className={'flex flex-col gap-4 shadow-md rounded-lg'}>
          {navLinks.map((nav) => (
            <Menu.Item key={nav.link}>
              <Link
                className={`${
                  nav.active === props.active && 'font-medium border-l-2 border-l-brand-green-primary '
                } pb-1 text-gray-600 pl-4 text-base font-semibold  leading-normal tracking-tight  whitespace-nowrap  cursor-pointer transition`}
                href={`${nav.link === '/' ? '/dashboard' : `/dashboard${nav.link}`}`}
              >
                {nav.title}
              </Link>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MobileNav;
