import Button from '@ui/Button';
import React from 'react';
import Image from 'next/image';
import VerificationLayout from './component/verificationLayout';
import { Input } from '@ui/Input';
import Link from 'next/link';

function ChangeEmailAddress() {
  return (
    <VerificationLayout>
      <Image
        className="w-[150px] h-[150px] xl:w-[218px] xl:h-[218px] mx-auto"
        src="/assets/images/verification-link-sent.svg"
        alt=""
        width={218}
        height={218}
      />
      <div className=" sm:bg-brand-green-ttr sm:px-[40px] w-full max-w-[600px] md:px-[45px] py-8 lg:py-10 sm:border sm:border-brand-disabled rounded-[32px] z-10">
        <div className=" w-full">
          <h1 className=" font-manropeEB text-2xl md:text-4xl text-center">Change email address</h1>
          <p className=" font-manropeL text-xs text-center md:w-[90%] text-[#737876] md:text-[#000] pt-3 pb-8">
            Please enter your email address to get verified
          </p>

          <div className=" flex flex-col gap-3">
            <form className="flex flex-col gap-2">
              <label htmlFor="email" className=" font-manropeB text-sm ">
                Email
              </label>

              <Input
                type="email"
                name="email"
                placeHolder="user@example.com"
                className=" w-full border-[#D0D5DD] text-[#667085] h-[60px] border bg-white-100"
              />
            </form>

            <Link href="/auth/login">
              <Button size="sm" className=" w-full h-[60px] rounded-md ">
                Confirm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </VerificationLayout>
  );
}

export default ChangeEmailAddress;
