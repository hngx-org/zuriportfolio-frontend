import React from 'react';
import Image from 'next/image';
function UI2FA() {
  return (
    <>
      <Image
        src="/assets/auth/auth-bg-unlock.svg"
        alt=""
        width={120}
        height={100}
        priority
        style={{ width: '200px', height: 'auto' }}
        className="absolute hidden md:block lg:hidden  bottom-0 left-0"
      />
    </>
  );
}

export default UI2FA;
