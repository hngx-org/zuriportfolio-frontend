import React from 'react';
import { ArrowRight } from 'iconsax-react';
const EmptyCart = () => {
  return (
    <>
      <section className="flex flex-col">
        <div className="px-[100px] pt-[211px] pb-[72px] flex flex-col gap-[32px] items-center justify-center">
          <div className="heading flex flex-col items-center gap-[8px]">
            <h1 className="text-[57px] font-bold leading-[64px] font-manropeL text-[#2E3130]">Your Cart is Empty</h1>
            <p className="text-[16px] font-[700] leading-[24px] font-manropeL text-[#737876]">
              Looks like you haven’t added anything to Your Cart yet
            </p>
          </div>

          <button className="rounded-[8px] bg-brand-green-primary w-[345px] h-[60px] px-[20px] py-[12px] flex gap-[16px] items-center justify-center ">
            <p className="text-[#fff] text-[14px] font-[600] leading-[20px] font-manropeL">Start Shopping</p>
            <ArrowRight color="#fff" />
          </button>
        </div>

        <div className="help-line border-y border-[#E1E3E2] px-[100px] py-[24px] w-full">
          <p className="font-manropeL text-[16px] font-[400] leading-[24px] w-[1240px]">
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
