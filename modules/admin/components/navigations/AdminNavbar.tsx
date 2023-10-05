import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/assets/404/logo-zuri-auth.svg';
import { Chart, I24Support, I3Dcube, Personalcard, SearchNormal1 } from 'iconsax-react';
import { Input } from '@ui/Input';
import { useRouter } from 'next/router';
import Sidebar from './AdminSidebar';
import UserSideProfile from './UserSideProfile';

export const menu = [
  {
    title: 'Product Listing',
    to: '/admin/product-listing',
    icon: <I3Dcube size="20" />,
  },
  {
    title: 'Vendor Management',
    to: '/admin/vendor-management',
    icon: <Personalcard size="20" />,
  },
  {
    title: 'Analytics & Reporting',
    to: '/admin/analytics-and-reporting',
    icon: <Chart size="20" />,
  },
  {
    title: 'Feedback & Customer Support',
    to: '/admin/feedback-and-customer-support',
    icon: <I24Support size="20" />,
  },
  // {
  //   title: 'Role-Based Access Control',
  //   to: '/admin/role-base-and-access-control',
  // },
];

const AdminNavbar = () => {
  const router = useRouter();
  return (
    <>
      <nav className="sticky top-0 bg-white-100">
        <div className="px-5 md:px-10 lg:px-24 py-7 flex justify-between items-center border-b border-[#EBEEEF]">
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
              className="w-[28.47vw] border-[#EBEEEF]"
              placeHolder="Search"
              leftIcon={<SearchNormal1 color="#777" />}
            />
          </div>
          <p className="font-manropeB block md:hidden">Product Listing</p>
          <UserSideProfile showNotification parentComp="navbar" />
        </div>
        <div className="px-24 py-5 mt-6 justify-between font-manropeB hidden lg:flex">
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.to}
              className={`${
                router.pathname === item.to
                  ? 'text-[#009254] border-b-[#009254] border-b-2 bg-[#FAFFFD]'
                  : 'text-[#737876] hover:text-[#009254] transition duration-75'
              } px-4  py-2 `}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
