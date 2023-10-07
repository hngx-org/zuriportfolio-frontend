import { HambergerMenu, LogoutCurve } from 'iconsax-react';
import { menu } from './SuperAdminNavbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SuperAdminSidebar = () => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarTransform = showSidebar ? 'translateX(0)' : 'translateX(-100%)';

  return (
    <div className="block lg:hidden">
      <div className="" onClick={() => setShowSidebar(true)}>
        <HambergerMenu size="32" color="#464646" />
      </div>
      <div
        className={`h-[100vh] py-10 absolute top-0 inset-0 left-0 z-20 bg-white-100 w-[285px] md:w-[333px] backdrop-blur-sm rounded-tr-[8px] rounded-br-[8px] font-manropeB flex flex-col ease-in-out duration-300`}
        style={{ transform: sidebarTransform }}
      >
        <div className="px-10">
          <p className="text-xs text-gray-500 font-manropeL">Super Admin</p>
        </div>
        <div className="flex-grow px-5  text-xs md:text-sm mt-14">
          <div className="flex flex-col gap-6">
            {menu.map((item) => (
              <div
                key={item.title}
                className={`${
                  router.pathname.includes(item.to) ? 'text-brand-green-primary bg-white-210' : 'text-white-650'
                } p-4 w-full rounded-[8px] flex items-center gap-3`}
              >
                <div>{item.icon}</div>
                <Link href={item.to}>{item.title}</Link>
              </div>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-3 text-brand-red-primary border-t py-5  text-xs md:text-sm  mx-5 border-white-115">
          <LogoutCurve size="20" color="#ff2e2e" />
          Log out
        </button>
      </div>
      {showSidebar ? (
        <div
          className="h-[100vh] absolute top-0 inset-0 left-0 z-10 md:w-[100vw] bg-white-610 backdrop-blur-sm"
          onClick={() => setShowSidebar(false)}
        ></div>
      ) : null}
    </div>
  );
};

export default SuperAdminSidebar;
