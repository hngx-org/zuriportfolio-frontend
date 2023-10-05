import { HambergerMenu, LogoutCurve } from 'iconsax-react';
import UserSideProfile from './UserSideProfile';
import { menu } from './AdminNavbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AdminSidebar = () => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  // Calculate the translateX value based on whether the sidebar is open or closed
  const sidebarTransform = showSidebar ? 'translateX(0)' : 'translateX(-100%)';

  return (
    <>
      <div className="block lg:hidden">
        <div className="w-fit" onClick={() => setShowSidebar(true)}>
          <HambergerMenu size="32" color="#464646" />
        </div>
        <div
          className={`h-[100vh] py-10 absolute top-0 inset-0 left-0 z-20 bg-white-100 w-[285px] md:w-[333px] backdrop-blur-sm rounded-tr-[8px] rounded-br-[8px] font-manropeB flex flex-col ease-in-out duration-300`}
          style={{ transform: sidebarTransform }}
        >
          <div className="px-10">
            <UserSideProfile parentComp="sidebar" />
          </div>
          <div className="flex-grow px-5  text-xs md:text-sm ">
            <div className="flex flex-col gap-6">
              {menu.map((item) => (
                <div
                  key={item.title}
                  className={`${
                    router.pathname !== item.to ? 'text-[#009254] bg-[#F5FBF6]' : 'text-[#737876]'
                  } p-4 w-full rounded-[8px] flex items-center gap-3`}
                >
                  <div>{item.icon}</div>
                  <Link href={item.to}>{item.title}</Link>
                </div>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-3 text-[#ff2e2e] border-t py-5  text-xs md:text-sm  mx-5 border-[#EBEEEF]">
            <LogoutCurve size="20" color="#ff2e2e" />
            Log out
          </button>
        </div>
        {showSidebar ? (
          <div
            className="h-[100vh] absolute top-0 inset-0 left-0 z-10 md:w-[100vw] bg-[rgba(118,118,118,.25)] backdrop-blur-sm"
            onClick={() => setShowSidebar(false)}
          ></div>
        ) : null}
      </div>
    </>
  );
};

export default AdminSidebar;
