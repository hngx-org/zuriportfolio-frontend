import React from 'react';
import Button from '@ui/Button';
import accessDeniedImage from '../public/assets/deniedAssets/denied-image.svg';
import logo from '../public/assets/deniedAssets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const AccessDenied = () => {
  return (
    <main className=" bg-white-100 min-h-screen">
      <header className="max-w-[1240px] py-[22px] md:py-[24px] md:px-[40px] lg:px-[100px] px-6">
        <Link href={'/'}>
          <Image src={logo} alt="logo" />
        </Link>
      </header>
      <div className=" border-b border-white-115 border-style: solid" />
      <section
        className=" flex flex-col-reverse px-[24px] lg:px-[6.25rem] md:px-[105px] gap-4 sm:gap-[72px] max-w-[] 
         items-center justify-between xl:flex-row mt-[80px]" >
        {/* mt-9 md:mt-[193px] sm:mt-[147px] */}

        <div className="flex flex-col gap-[24px] sm:items-center xl:items-start items-center">
          {/* <div className="flex flex-row space-x-2 gap-1"> */}
            <h2 className="text-2xl md:text-[32px] xl:text-[45px] md:leading-[36px] xl:leading-[52px] sm:font-bold xl:text-left max-w-[504px] text-center font-semibold font-manropeL xl:font-manropeB">
              Access Denied 🚫
            </h2>
            {/* <Image className="w-[34px]" src={deniedIcon} alt="denied-icon" /> */}
          {/* </div> */}
          <p className=" text-white-650 max-w-[517px]text-sm sm:text-2xl sm:left-8 sm:text-gray-300 text-center xl:text-left font-normal">
            Whoa there, hold on! It looks like this area is off-limits. Our virtual police officer is here to ensure
            your safety and privacy. You might need special credentials or permissions to enter this zone
          </p>
          <Button className=" w-full h-[52px] xl:w-[460px] rounded-lg text-base mt-3 sm:w-[342px]" href="/">
            Back to homepage
          </Button>

        </div>
        <Image
          src={accessDeniedImage}
          alt="Access denied"
          className="w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] xl:w-[480px] xl:h-[480px]"
        />
      </section>
    </main>
  );
};

export default AccessDenied;
