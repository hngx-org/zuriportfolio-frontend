import React from 'react';
import Image from 'next/image';
import { VerificationLayoutProps } from '../../../@types';
import logo from '../../../public/assets/404/logo-zuri-auth.svg';
import Link from 'next/link';

function VerificationLayout({ children }: VerificationLayoutProps) {
  return (
    <div className=" h-[100dvh]">
      <div className="border-b border-[#EBEEEF] border-style:solid h-[10%]">
        <header className="max-w-[1440px] mx-6 xl:mx-auto h-full flex items-center ">
          <Link href={'/'}>
            <Image src={logo} alt="logo" />
          </Link>
        </header>
      </div>

      <div className=" h-[90%] px-[24px] w-full relative overflow-hidden flex flex-col items-center justify-center">
        <Image
          className="absolute top-0 right-0 hidden md:block md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
          src="/assets/images/blob-os.svg"
          alt="blob"
          width={200}
          height={200}
        />
        {children}
        <Image
          className="absolute bottom-0 left-0 w-[130px] h-[130px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] z-[2px]"
          src="/assets/images/unlock-os.svg"
          alt="an unlocked padlock"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}

export default VerificationLayout;
