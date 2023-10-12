import React from 'react';
import Button from '@ui/Button';
import accessDeniedImage from '../public/assets/deniedAssets/denied-image.svg';
import Container from '@modules/auth/component/Container/Container';
import PlainHeader from '../modules/auth/component/PlainHeader/PlainHeader';
import Image from 'next/image';

const title = `  Access Denied 🚫`;
const text = ` Whoa there, hold on! It looks like this area is off-limits. Our virtual police officer is here to ensure your safety and privacy. You might need special credentials or permissions to enter this zone`;
const btnText = `Back to homepage`;

const AccessDenied = () => {
  return (
    <main className=" bg-white-100 min-h-screen">
      <PlainHeader />
      <div className=" border-b border-white-115 border-style: solid" />
      <Container>
        <section
          className=" flex flex-col gap-9 sm:gap-[72px] min-h-[calc(100vh-105px)]  
          sm:mx-[105] items-center justify-center xl:flex-row-reverse xl:gap-[162px] mt-[80px]"
        >
          <Image
            src={accessDeniedImage}
            alt="Access denied"
            className="w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] xl:w-[480px] xl:h-[480px]"
          />

          <div className="flex flex-col gap-[24px] sm:items-center xl:items-start items-center">
            <h2 className="text-2xl md:text-[32px] xl:text-[45px] md:leading-[36px] xl:leading-[52px] sm:font-bold xl:text-left max-w-[598px] text-center font-semibold font-manropeL xl:font-manropeB">
              {title}
            </h2>
            <p className=" text-gray-300 max-w-[590px] sm:text-2xl text-center xl:text-left">{text}</p>
            <Button className="w-full h-[52px] xl:w-[460px] rounded-lg text-base mt-3 sm:w-[517px]" href="/">
              {btnText}
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default AccessDenied;
