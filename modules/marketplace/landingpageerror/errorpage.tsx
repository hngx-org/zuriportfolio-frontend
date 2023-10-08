import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import oops from '../public/assets/404/bro.png';
import Button from '@ui/Button';
import MainLayout from '../../../components/Layout/MainLayout';

const btnText = `Browse Products`;

const Error: React.FC = () => {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <main className="bg-white h-screen flex flex-col justify-center items-center">
        {/* <h2 className="text-3xl">There was a problem.</h2> */}
        <Image src={oops} alt="oops" />
        <h1 className="text-[#101928]sm:text-3xl md:text-4xl lg:text-5xl font-manrope font-medium  text-4xl xl:text-5xl xl:font-medium leading-10 xl:leading-12 text-left p-4 xl:p-6">
          There is nothing here
        </h1>
        <Button className="w-44 sm:text-xl  md:text-2xl lg:text-lg h-12 xl:w-44 rounded-lg text-lg mt-3 bg-[#009444] text-white">
          <Link href="/">{btnText}</Link>
        </Button>
      </main>
    </MainLayout>
  );
};

export default Error;
