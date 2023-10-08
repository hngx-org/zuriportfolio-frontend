import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import MainLayout from '../../../../components/Layout/MainLayout';

const btnText = `Browse Products`;

const Error: React.FC = () => {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <main className="bg-white h-screen flex flex-col justify-center items-center">
        {/* <h2 className="text-3xl">There was a problem.</h2> */}
        <Image height={600} width={600} src={'/assets/404/bro.png'} alt="oops" />
        <h1 className="text-[#101928]sm:text-3xl md:text-4xl lg:text-5xl font-manrope font-medium  text-4xl xl:text-5xl xl:font-medium leading-10 xl:leading-12 text-left p-4 xl:p-6">
          There is nothing here
        </h1>
        <button className="w-44 sm:text-xl md:text-2xl lg:text-lg h-12 xl:w-44 rounded-lg text-lg mt-3 bg-brand-green-primary text-white-100">
          <Link href="/">{btnText}</Link>
        </button>
      </main>
    </MainLayout>
  );
};

export default Error;
