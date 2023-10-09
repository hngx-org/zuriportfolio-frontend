import Link from 'next/link';
import React from 'react';

const OrderDetails = () => {
  return (
    <main className="max-w-[1240px] mx-auto px-10">
      <section className="font-manropeB font-semibold mt-4">
        <div className="text-gray-300 font-manropeB font-medium text-[14px] leading-[142.857%] tracking-[0.014px]  items-center gap-[2px] mb-4 hidden md:flex">
          <span>Order manegement</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4.50002 2.03996L7.76002 5.29996C8.14502 5.68496 8.14502 6.31496 7.76002 6.69996L4.50002 9.95996"
              stroke="#8D9290"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-orange-110">Order Details</span>
        </div>
        <div className="flex flex-col gap-[60px]">
          <h1 className=" text-[2rem] leading-[125%] text-black mb-14 hidden md:block">Order Details</h1>
          <Link
            href={'/dashboard/orders'}
            className="text-brand-green-primary md:text-[22px] text-[14px] leading-[127.273%] text-end w-fit ml-auto self-end mb-[22px] flex items-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.57 5.92982L3.5 11.9998L9.57 18.0698"
                stroke="#009254"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.4999 12L3.66992 12"
                stroke="#009254"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to Order History</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
