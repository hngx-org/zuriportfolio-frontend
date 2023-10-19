import { Information } from 'iconsax-react';
import React from 'react';
import useUserSession from '../../../../hooks/Auth/useUserSession';
import Link from 'next/link';

const Logout = () => {
  const { logout } = useUserSession();

  return (
    <div
      role="button"
      onClick={logout}
      className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-5 px-4 flex gap-6 text-[#FF2E2E]"
    >
      <Information size="24" color="#ff2e2e" />
      <p>Sign Out</p>
    </div>
  );
};

export const MobileLogout = () => {
  const { logout } = useUserSession();
  return (
    <Link
      className="rounded-lg relative px-4 flex items-center justify-center gap-5 h-[48px] font-manropeB focus:shadow-brand-green-shd   border-solid text-base py-3  border-0 bg-pink-50 text-[#FF2E2E] w-[100%]"
      href="/"
      onClick={logout}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24">
        <g fill="#FF2E2E">
          <path d="M11.5 7h2v7h-2V7zm0 8h2v2h-2v-2z"></path>
          <path d="M22.207 7.293l-5-5A.996.996 0 0016.5 2h-8a.996.996 0 00-.707.293l-5 5A.996.996 0 002.5 8v8c0 .266.105.52.293.707l5 5A.997.997 0 008.5 22h8c.266 0 .52-.105.707-.293l5-5A.997.997 0 0022.5 16V8a.996.996 0 00-.293-.707zM20.5 15.586L16.086 20H8.914L4.5 15.586V8.414L8.914 4h7.172L20.5 8.414v7.172z"></path>
        </g>
      </svg>
      <p className="font-manropeB">Settings</p>
    </Link>
  );
};
export default Logout;
