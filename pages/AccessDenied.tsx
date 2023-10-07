import React from 'react';
import deniedIcon from '../public/assets/deniedAssets/denied-icon.svg';
import accessDeniedImage from '../public/assets/deniedAssets/denied-image.svg';
import logo from '../public/assets/deniedAssets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const AccessDenied = () => {
  return (
    <div className=" bg-white-100 min-h-screen">
      <header className="max-w-[1240px] py-6 px-8 mx-6 xl:mx-auto md:py-[38px]">
        <Link href={'/'}>
          <Image src={logo} alt="logo" />
        </Link>
      </header>
      <div className=" border-b border-[#EBEEEF] border-style: solid" />
      <div
        className=" flex flex-col-reverse gap-9 sm:gap-[72px] md:gap-[96px] min-h-[calc(100vh-105px)] max-w-[1240px] 
      mx-6 sm:mx-[105] xl:mx-auto items-center justify-center xl:flex-row xl:gap-[162px]"
      >
        <div className="flex flex-col gap-[24px] sm:items-center xl:items-start max-w-[504px] items-center ">
          <div className="flex flex-row space-x-2 gap-1">
            <h2 className="text-2xl md:text-[32px] xl:text-[45px] md:leading-[36px] xl:leading-[52px] sm:font-bold xl:text-left max-w-[504px] text-center font-semibold font-manropeL xl:font-manropeB">
              Access Denied
            </h2>
            <Image className="w-[34px]" src={deniedIcon} alt="denied-icon" />
          </div>
          <p className=" text-[#737876] max-w-[623px]  text-sm sm:text-2xl sm:left-8 sm:text-[#8D9290] text-center xl:text-left ">
            Whoa there, hold on! It looks like this area is off-limits. Our virtual police officer is here to ensure
            your safety and privacy. You might need special credentials or permissions to enter this zone
          </p>
          <Link href={'/'}>
            <button className="bg-green-500 text-white w-full h-[52px] xl:w-[517px] rounded-lg text-base mt-3">
              Back to homepage
            </button>
          </Link>
        </div>
        <Image
          src={accessDeniedImage}
          alt="Access denied"
          className="w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] xl:w-[480px] xl:h-[480px] mt-[20px]"
        />
      </div>
    </div>
  );
};

export default AccessDenied;
