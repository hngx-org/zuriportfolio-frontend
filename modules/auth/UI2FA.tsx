import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
function UI2FA() {
  return (
    <>
      <header
        className="py-4 md:py-8
      border border-gray-300 border-opacity-40 border-x-0
      border-t-0 px-4 lg:hidden z-2 bg-white-100"
      >
        <Link href={'/'}>
          <Image
            src="/assets/auth/zuri_logo.svg"
            alt="logo"
            width={120}
            height={120}
            style={{ width: '130px', height: '40px' }}
          />
        </Link>
      </header>
      <div className="h-full">
        <Image
          src="/assets/auth/auth_img.svg"
          alt="a person looking at a laptop"
          priority
          width={780}
          height={500}
          style={{ width: '950px', height: '100%' }}
          className="hidden lg:block"
        />
      </div>
      <Image
        src="/assets/auth/unlock.svg"
        alt=""
        width={120}
        height={100}
        priority
        style={{ width: '280px', height: '100%' }}
        className="absolute hidden md:block lg:hidden  bottom-[-42%] left-[-15.5%] opacity-70"
      />
      <Image
        src="/assets/auth/auth-shape.svg"
        alt=""
        width={120}
        height={100}
        style={{ width: '180px', height: '150px' }}
        className="absolute top-[10%] lg:top-[-6%] right-0 z-[-1] opacity-40 hidden md:block"
      />
    </>
  );
}

export default UI2FA;
