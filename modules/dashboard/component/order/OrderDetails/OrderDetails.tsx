import React from 'react';

const OrderDetails = () => {
  return (
    <main className="max-w-[1240px] mx-auto px-10">
      <section className="font-manropeB font-semibold mt-4">
        <div className="flex flex-col gap-[60px]">
          <h1 className=" text-[2rem] leading-[125%] text-black mb-14 hidden md:block">Order Details</h1>
          <button className="text-brand-green-primary md:text-[22px] text-[14px] leading-[127.273%] text-end w-fit ml-auto self-end mb-[22px] flex items-center gap-2 cursor-pointer">
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
          </button>
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
