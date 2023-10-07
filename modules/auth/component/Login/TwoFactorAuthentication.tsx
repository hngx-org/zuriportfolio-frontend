import React from 'react';
import Button from '@ui/Button';
import Image from 'next/image';
import LoginImage from '../../../../public/assets/loginPageAssets/LoginImage.png';
import loginLogo from '../../../../public/assets/loginPageAssets/loginLogo.svg';
import shape from '../../../../public/assets/loginPageAssets/shape.svg';
import lock from '../../../../public/assets/loginPageAssets/lock.svg';
import Header from './header';

const TwoFactorAuthentication = () => {
  return (
    <div className="relative  md:h-[60rem] lg:h-auto  font-manropeL">
      <Header />
      <div className="pl-4 md:lg:pl-16 pr-4 md:lg:pr-16 pt-4 md:lg:pt-8 pb-4 lg:pb-8 ">
        <div className="absolute right-0 top-0 hidden md:hidden sm:hidden lg:block ">
          <Image src={shape} alt="shape" />
        </div>
        <div className="md:flex md:gap-11 block">
          <div className=" hidden md:hidden lg:block xl:block w-[40rem] ">
            <Image src={LoginImage} alt="image" className="h-[53rem]" />
          </div>

          {/************************* leftside *******************************************/}
          <div className="mt-4  md:mx-auto">
            <div className=" hidden lg:block md:hidden">
              <Image src={loginLogo} alt="logo" />
            </div>
            <div>
              <p className="md:text-[2.25rem] text-[1.8rem] font-bold md:w-[29.0625rem]  md:ml-[3.5rem] lg:ml-0 w=[50%] leading-[2.75rem] text-center mt-[5.71rem] lg:text-left">
                A code has been sent to your mail
              </p>
            </div>

            <div>
              <p className="text-[1rem] font-semibold mt-[3rem] text-center text-slate-300 lg:text-left">
                Enter 6 digit code
              </p>
            </div>

            <div className="flex items-center justify-center lg:justify-start mt-[0.75rem] space-x-2 ">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="w-[2.47156rem] h-[2.55681rem] md:w-[3.625rem] md:h-[3.625rem] p-2 text-4xl border border-slate-50 rounded-md text-center outline-none"
                  placeholder=""
                />
                <input
                  type="text"
                  className="w-[2.47156rem] h-[2.55681rem] md:w-[3.625rem] md:h-[3.625rem]  p-2 text-4xl border border-slate-50 rounded-md text-center outline-none"
                  placeholder=""
                />
                <input
                  type="text"
                  className="w-[2.47156rem] h-[2.55681rem] md:w-[3.625rem] md:h-[3.625rem]  p-2 text-4xl border border-slate-50 rounded-md text-center outline-none"
                  placeholder=""
                />
              </div>

              <div className="w-[0.75rem] h-[0.0625rem] bg-gray-300"></div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  className="w-[2.47156rem] h-[2.55681rem] md:w-[3.625rem] md:h-[3.625rem]  p-2 text-4xl border border-slate-50 rounded-md text-center outline-none"
                  placeholder=""
                />
                <input
                  type="text"
                  className="w-[2.47156rem] h-[2.55681rem] md:w-[3.625rem] md:h-[3.625rem]  p-2 text-4xl border border-slate-50 rounded-md text-center outline-none"
                  placeholder=""
                />
                <input
                  type="text"
                  className="w-[2.47156rem] h-[2.55681rem] md:w-[3.625rem] md:h-[3.625rem]  p-2 text-4xl border border-slate-50 rounded-md text-center outline-none"
                  placeholder=""
                />
              </div>
            </div>
            <Button
              intent={'tertiary'}
              className="bg-brand-disabled mt-[3.06rem] md:pl-[15.0625rem]  md:pr-[15.0625rem]   w-[100%] py-3   h-14 rounded-lg  button text-[#6c6c6c] font-semibold"
            >
              Continue
            </Button>
            <div>
              <p className=" text-[#536066] text-center text-[1rem] font-semibold mt-[3.06rem] leading-5">
                Didn’t receive code? <span className="text-green-400 "> Resend</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-0  -z-[1] hidden lg:hidden md:block">
        <Image src={lock} alt="Google" />
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
