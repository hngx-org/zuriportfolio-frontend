'use client';
import Image from 'next/image';
import MainLayout from '../../components/Layout/MainLayout';
import Code2FA from '../../modules/auth/Code2FA';
import UI2FA from '../../modules/auth/UI2FA';
import React from 'react';

function _2FA() {
  return (
    <MainLayout
      showDashboardSidebar={false}
      showTopbar={false}
      activePage="2fa"
      showFooter={false}
      className="relative overflow-hidden lg:overflow-visible"
    >
      <section
        className="flex flex-col md:grid lg:grid-cols-2
    max-w-[1000px] lg:mt-12 container m-auto
     gap-4 lg:px-0 overflow-hidden"
      >
        <UI2FA />
        <div className="flex items-center flex-col gap-10 py-[3rem] lg:pt-0 px-2">
          <Image
            src="/assets/auth/zuri_logo.svg"
            alt="logo"
            width={120}
            height={120}
            style={{ width: '130px', height: '40px' }}
            className="hidden lg:block h-full self-start lg:mt-2 lg:mb-12"
          />
          <Code2FA />
        </div>
      </section>
    </MainLayout>
  );
}

export default _2FA;
