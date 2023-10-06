import React, { useState } from 'react';
import Image from 'next/image';

const PaymentRedirect = () => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    modalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000080] bg-opacity-30">
        <>
          <div className="bg-[#fff] rounded-[20px] w-full lg:w-[572px] flex flex-col gap-[24px] items-center justify-center lg:px-[73px] lg:py-[50px]">
            <Image className="animate-ping" src="/assets/payment-redirect.svg" alt="" width={44} height={44} />

            <h1 className="text-[24px] font-[700] leading-[32px] font-manropeB text-[#090e11]">Redirecting</h1>
            <p className="text-[#545658] text-center font-manropeL font-[600] text-[14px] w-[324px] leading-[20px]">
              You would be redirected to continue this <br /> payment
            </p>

            <div className="btns w-full flex gap-[78px] justify-center items-center">
              <button
                onClick={() => setModalOpen(false)}
                className=" w-[189px] h-[56px]  font-bold text-[14px] font-manropeL leading-[20px] text-[#808080]"
              >
                Try another method
              </button>

              <button className=" text-[#fff] rounded-[10px] font-manropeL font-[600] text-[14px] leading-[20px] bg-brand-green-primary w-[189px] h-[56px] px-[20px] py-[12px]">
                Continue
              </button>
            </div>
          </div>
        </>
      </div>
    )
  );
};

export default PaymentRedirect;
