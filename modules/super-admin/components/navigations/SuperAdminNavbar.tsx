import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/assets/404/logo-zuri-auth.svg';
import useUserSession from '../../../../hooks/Auth/useUserSession';
import {
  Book,
  Chart,
  I24Support,
  I3Dcube,
  LogoutCurve,
  Notification,
  Personalcard,
  SearchNormal1,
  SecuritySafe,
} from 'iconsax-react';
import { Input } from '@ui/Input';
import { useRouter } from 'next/router';
import Sidebar from './SuperAdminSidebar';

export const menu = [
  {
    title: 'Analytics & Reporting',
    to: '/super-admin/analytics-and-reporting',
    icon: <Chart size="20" />,
  },
  {
    title: 'Product Listing',
    to: '/super-admin/product-listing',
    icon: <I3Dcube size="20" />,
  },
  {
    title: 'Vendor Management',
    to: '/super-admin/vendor-management',
    icon: <Personalcard size="20" />,
  },
  {
    title: 'Feedback & Customer Support',
    to: '/super-admin/feedback-and-customer-support',
    icon: <I24Support size="20" />,
  },
  {
    title: 'Internal Assessment',
    to: '/super-admin/assessment',
    icon: <Book size="20" />,
  },
  {
    title: 'API Statuses',
    to: '/super-admin/api-statuses',
    icon: <SecuritySafe size="20" />,
  },
];

const SuperAdminNavbar = () => {
  const router = useRouter();
  const { logout } = useUserSession();
  const getPageTitle = (route: string) => {
    switch (true) {
      case route.includes('/super-admin/analytics-and-reporting'):
        return 'Analytics & Reporting';
      case route.includes('/super-admin/product-listing'):
        return 'Product Listing';
      case route.includes('/super-admin/vendor-management'):
        return 'Vendor Management';
      case route.includes('/super-admin/feedback-and-customer-support'):
        return 'Feedback & Customer Support';
      case route.includes('/super-admin/assessment'):
        return 'Internal Assessment';
      case route.includes('/super-admin/api-statuses'):
        return 'API Statuses';
      default:
        return '';
    }
  };

  return (
    <nav className="sticky top-0 bg-white-100 z-10">
      <div className="px-5 md:px-10 lg:px-24 py-7 border-b border-white-115">
        <div className="container flex justify-between items-center mx-auto">
          <div className="flex items-center gap-4">
            <Sidebar />
            <div className="hidden md:block">
              <Link href={'/'}>
                <Image src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <Input
              onChange={(e) => {
                console.log(e.target.value);
              }}
              type="email"
              intent={'default'}
              className="w-[28.47vw] border-white-115"
              placeHolder="Search"
              leftIcon={<SearchNormal1 color="#777" />}
            />
          </div>
          <p className="font-manropeB block md:hidden">{getPageTitle(router.pathname)}</p>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4">
              <Notification size="24" color="#5b5f5e" className="cursor-pointer" />
              <p className="text-xs text-gray-500 font-manropeL hidden md:block">Super Admin</p>
            </div>
            <button
              className="hidden lg:flex items-center gap-3 bg-pink-120 py-1 px-2 rounded-[8px] text-brand-red-primary text-xs md:text-sm"
              onClick={() => logout()}
            >
              <LogoutCurve size="20" color="#ff2e2e" />
              Log out
            </button>
          </div>
        </div>
      </div>
      <div className="py-5 mt-6 justify-between font-manropeB hidden lg:flex container mx-auto">
        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.to}
            className={`${
              router.pathname.includes(item.to)
                ? 'text-brand-green-primary border-b-brand-green-primary border-b-2 bg-white-220'
                : 'text-white-650 hover:text-brand-green-primary transition duration-75'
            } px-4 py-2 `}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;
