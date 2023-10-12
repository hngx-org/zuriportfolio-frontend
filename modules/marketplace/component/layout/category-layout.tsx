import Link from 'next/link';
import MainLayout from '../../../../components/Layout/MainLayout';
import Breadcrumbs from './BreadCrumbs';
import { categoryMenus } from './data/category-data';
import { useEffect, useRef } from 'react';
import CategoriesNav from '../CategoriesNav/CategoriesNav';

interface LayoutProps extends React.ComponentPropsWithRef<'section'> {
  children: React.ReactNode;
}

const CategoryLayout = ({ children, ...props }: LayoutProps) => {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      {/* This menu will be replaced witht actual categories nav */}
      <CategoriesNav navItems={categoryMenus} />
      <div className="max-w-[1240px] mx-auto px-5 md:px-0 -z-30">
        <div className="my-4 md:my-6 lg:my-8">
          <Breadcrumbs />
        </div>
        <section {...props}>{children}</section>
      </div>
    </MainLayout>
  );
};

export default CategoryLayout;

const caretIcon = (
  <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.408789 15.775L1.89212 17.25L10.1338 9L1.88379 0.75L0.408789 2.225L7.18379 9L0.408789 15.775Z"
      fill="#282828"
    />
  </svg>
);

const menuBar = (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8H12V6.66667H0V8ZM0 4.66667H12V3.33333H0V4.66667ZM0 0V1.33333H12V0H0Z" fill="#080808" />
  </svg>
);

const DropdownMenu = [
  'Graphics Design Templates',
  'Illustrations',
  'Logos',
  'Branding Assets',
  'Ui/Ux Design Elements',
];

const DropDown = () => {
  return (
    <menu className="absolute top-5 hidden group-hover/dropdown:flex flex-col shadow-xl rounded-md bg-white-100 z-50">
      {DropdownMenu.map((menu, i) => {
        const to = `/marketplace/categories/${menu}`;
        return (
          <Link key={i} href={to} className="px-5 py-2">
            {menu}
          </Link>
        );
      })}
    </menu>
  );
};
