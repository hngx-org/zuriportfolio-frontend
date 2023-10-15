import { notify } from '@ui/Toast';
import { Information } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Logout = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('zpt');
    notify({
      message: 'Logged out',
      type: 'success',
      theme: 'dark',
    });
    router.push('/');
  };

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
