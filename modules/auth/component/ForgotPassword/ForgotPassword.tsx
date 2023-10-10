import React from 'react';
import Button from '@ui/Button';
import Link from 'next/link';
import AuthLayout from '../AuthLayout';
import { Input } from '@ui/Input';
const ForgotPassword = () => {
  return (
    <AuthLayout isTopRightBlobShown isBottomLeftPadlockShown={false}>
      <main className=" mx-auto lg:pt-16 ">
        {/* <section className="flex-col flex lg:text-start text-center "> */}
        <div className="font-manropeB text-center lg:text-left pt-36 md:py-14">
          <h1 className="font-manropeEB font-bold text-black md:text-[36px] leading-[122.222%] tracking-[-0.09px] md:mb-4 mb-[10px] text-[24px] ">
            Forgot your Password ?
          </h1>
          <p className=" lg:text-[16px] md:text-[22px] text-[14px] font-semibold mx-auto lg:max-w-none lg:mx-0 leading-[150%] tracking-[0.024px] text-custom-color20 md:mb-[70px] mb-10 ">
            Enter your registered email below to receive reset instructions.
          </p>
          <form className="flex flex-col md:gap-12 gap-[30px] md:mb-12 mb-[30px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-slate-300 text-start font-semibold text-[16px] leading-[169.019%]">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Aliusugar@gmail.com"
                className="w-full px-[18px] py-[13.5px] font-manropeL font-light text-custom-color2  rounded-md border-[1.35px]  border-slate-50"
              />
            </div>
            <Button
              href="/auth/success"
              intent={'primary'}
              className="py-3 w-full  h-14 rounded-lg button text-white-100"
            >
              Submit
            </Button>
          </form>
          <p className="text-[14px] text-center text-custom-color20 font-medium">
            Go back to{' '}
            <Link href="/auth/login" className="text-brand-green-primary">
              Login
            </Link>
          </p>
        </div>
        {/* </section> */}
      </main>
    </AuthLayout>
  );
};

export default ForgotPassword;
