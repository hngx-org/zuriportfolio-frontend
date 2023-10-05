import React from 'react';
const navLinks: {
  link: string;
  title: string;
}[] = [
  {
    link: '/',
    title: 'Dashboard',
  },
  {
    link: '/products',
    title: 'Products',
  },
  {
    link: '/orders',
    title: 'Order Management',
  },
  {
    link: '/promotions',
    title: 'Promotions',
  },
  {
    link: '/reviews',
    title: 'Reviews',
  },
];
const NavDashBoard: React.FC = () => {
  return (
    <nav className="max-w-[1024px] mx-auto pt-[22px]">
      <ul
        className="gap-20 font-manropeB font-semibold text-[#737876] text-base text-center flex"
        style={{
          gap: '72px',
          color: '#737876',
        }}
      >
        {navLinks.map((nav) => (
          <li
            key={nav.link}
            className={`${
              nav.link === '/' && 'text-brand-green-primary border-b-2 border-b-brand-green-primary px-[31.5px]'
            } pb-2  whitespace-nowrap  cursor-pointer hover:text-brand-green-primary transition`}
          >
            {nav.title}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavDashBoard;
