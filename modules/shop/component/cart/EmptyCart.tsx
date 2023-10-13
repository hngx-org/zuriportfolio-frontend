import React from 'react';
import { ArrowRight } from 'iconsax-react';
import Link from 'next/link';
const EmptyCart = () => {
  return (
    <>
      <section className="flex flex-col pb-[40px]">
        <div className="lg:px-[100px] px-[50px] pt-[100px] pb-[40px] lg:pt-[211px] lg:pb-[72px] flex flex-col gap-[32px] items-center justify-center">
          <div className="heading flex flex-col items-center gap-[8px]">
            <h1 className="text-[34px] lg:text-[57px] font-bold leading-[64px] font-manropeL text-[#2E3130]">
              Your Cart is Empty
            </h1>
            <p className="text-[16px] font-[700] text-center leading-[24px] font-manropeL text-[#737876]">
              Looks like you haven’t added anything to Your Cart yet
            </p>
          </div>

          <Link
            href="/marketplace"
            className="cursor-pointer rounded-[8px] bg-brand-green-primary w-full lg:w-[345px] h-[60px] px-[20px] py-[12px] flex gap-[16px] items-center justify-center "
          >
            <p className="text-[#fff] text-[14px] font-[600] leading-[20px] font-manropeL">Start Shopping</p>
            <ArrowRight color="#fff" />
          </Link>
        </div>

        <div className="help-line border-y border-[#E1E3E2] px-[24px] lg:px-[100px] text-center lg:text-left py-[24px] w-full">
          <p className="font-manropeL text-[16px] font-[400] leading-[24px] w-full ">
            Need some help?{' '}
            <a href="#" className="text-[#009254] font-[600]">
              Chat now{' '}
            </a>
            or call +234-8zuri-store
          </p>
        </div>
      </section>
    </>
  );
};

export default EmptyCart;
