import Button from '@ui/Button';
import React from 'react';
import Image from 'next/image';
import VerificationLayout from './component/verificationLayout';
import { VerificationProps } from '../../@types';

function VerificationLinkSent({ handleClick }: VerificationProps) {
  return (
    <VerificationLayout>
      <Image
        className="w-[150px] h-[150px] xl:w-[218px] xl:h-[218px] mx-auto"
        src="/assets/images/verification-link-sent.svg"
        alt=""
        width={218}
        height={218}
      />
      <div className=" bg-brand-green-ttr px-4 max-w-[814px] sm:px-[40px] md:px-[58px] lg:px-[148px] py-8 border border-brand-disabled rounded-[32px] z-10">
        <h1 className=" font-manropeEB text-2xl md:text-4xl text-center">Verification Link Sent</h1>
        <p className=" font-manropeL text-xs text-center md:w-[90%] text-[#737876] md:text-[#000] py-[16px]  lg:py-[32px]">
          We&apos;ve sent an email to your{' '}
          <span className=" font-manropeEB text-[#003A1B]">www.sunmicah01@gmail.com</span> with a verification link.
        </p>

        <Button size="sm" className=" w-full rounded-md h-[60px]">
          Resend Verification Link
        </Button>

        <div className=" flex gap-2 flex-col sm:flex-row justify-between pt-3">
          <p className=" font-manropeL text-[10px] text-[#737876] md:text-[#000]">
            Link expires in <span className=" font-manropeB text-[#003A1B]">4:23</span>
          </p>

          <button
            onClick={handleClick}
            className=" font-manropeL text-left sm:text-right text-[10px] md:text-brand-green-primary text-[#737876] "
          >
            Incorrect email address? Change email address
          </button>
        </div>
      </div>
    </VerificationLayout>
  );
}

export default VerificationLinkSent;
