import { Information } from 'iconsax-react';
import React from 'react';
import useUserSession from '../../../../hooks/Auth/useUserSession';

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

export default Logout;
