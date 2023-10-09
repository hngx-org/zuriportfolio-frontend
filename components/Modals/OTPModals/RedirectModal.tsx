import React from 'react';
import Image from 'next/image';
import redirecting from '../../../public/assets/images/logo/modal-redirecting-logo.svg';

interface OTPModal {
  setOpenOTP: (value: boolean) => void;
}

const RedirectModal = ({ setOpenOTP }: OTPModal) => {
  return (
    <div className="flex justify-center items-center m-auto  flex-col p-[25px] rounded-[20px] bg-[#FFF]   h-full gap-[30px]">
      <div className="redirectImg">
        <Image src={redirecting} alt="redirect" />
      </div>
      <div className="inline-flex flex-col items-center gap-[8px]">
        <h3 className="text-center text-[24px] not-italic font-manropeL font-bold leading-[32px]">Redirecting</h3>
        <p
          className="text-center text-[14px] not-italic font-manropeL font-semibold leading-[20px] tracking-[0.014px] w-[324px] opacity-70 
          [@media(max-width:650px)]:w-full"
        >
          You would be redirected to continue this payment
        </p>
      </div>
      <div
        className="flex w-[449px] justify-center font-manropeL items-start gap-[48px] pt-3 
        [@media(max-width:650px)]:flex-col [@media(max-width:650px)]:w-1/2 [@media(max-width:650px)]:gap-[12px]"
      >
        <button
          className="flex w-[197px] px-[24px] py-[19px] font-manropeL justify-center items-center gap-[10px] flex-shrink-0 self-stretch
               rounded-[10px] text-center  text-[14px] font-bold tracking-[0.035px] opacity-50 
               [@media(max-width:650px)]:w-full [@media(max-width:650px)]:text-[11px]
               "
        >
          Try another method
        </button>
        <button
          id="continue"
          className="w-[204px] h-[56px] flex-shrink-0 rounded-[10px] bg-[var(--primary-color-primary-50,_#00894C)] text-[#FFF] 
               text-[14px] font-bold leading-[20px] tracking-[0.035px]
               [@media(max-width:650px)]:w-full [@media(max-width:650px)]:text-[11px]"
          onClick={() => setOpenOTP(true)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RedirectModal;
