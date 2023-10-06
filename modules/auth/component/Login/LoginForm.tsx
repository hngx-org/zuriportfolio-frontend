import React from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import LoginImage from '../../../../public/assets/loginPageAssets/LoginImage.png';
import loginLogo from '../../../../public/assets/loginPageAssets/loginLogo.svg';
import loginEye from '../../../../public/assets/loginPageAssets/LoginEye.svg';
import google from '../../../../public/assets/loginPageAssets/google.svg';
import github from '../../../../public/assets/loginPageAssets/github.svg';
import facebook from '../../../../public/assets/loginPageAssets/facebook.svg';
import shape from '../../../../public/assets/loginPageAssets/shape.svg';
import lock from '../../../../public/assets/loginPageAssets/lock.svg';
import Header from './header';

function LoginForm() {
  return (
    <div className="relative ">
      <Header />
      <div className="pl-4 md:lg:pl-16 pr-4 md:lg:pr-16 pt-4 md:lg:pt-8 pb-4 md:lg:pb-8 ">
        <div className="absolute right-0 top-0 hidden md:hidden sm:hidden lg:block">
          <Image src={shape} alt="shape" />
        </div>
        <div className="md:flex md:gap-11 block">
          <div className=" hidden md:hidden lg:block xl:block w-82 ">
            <Image src={LoginImage} alt="image" className="h-[57.375rem] " />
          </div>

          {/************************* leftside *******************************************/}
          <div className="mt-4  md:mx-auto">
            <div className=" hidden lg:block md:hidden">
              <Image src={loginLogo} alt="logo" />
            </div>

            <div className="md:flex sm:flex flex-col items-center justify-center lg:items-start">
              <p className="md:pt-[5rem] md:text-4xl text-[1.5rem] font-bold leading-10 text-center lg:text-left ">
                Log In
              </p>
              <p className="text-[#6B797F]  pt-[0.94rem] md:text-[1.375rem]  lg:font-semibold sm:tracking-[0.00375rem] text-center md:text-left">
                Log in to continue using zuriportfolio
              </p>
            </div>

            <div className="pt-[2.25rem]">
              <form>
                <label htmlFor="" className="text-[#344054] font-semibold leading-7">
                  Email Address
                </label>
                <div className="input flex items-center   pb-[0.8125rem] pt-[0.8125rem] pl-[1.125rem] pr-[1.125rem] mt-[0.5rem]  py-3 px-4 rounded-lg border-[1.352px] border-[#d0d5dd] bg-white shadow-[0px 1.35215px 2.7043px 0px rgba(16, 24, 40, 0.05)] w-[100%]">
                  <input
                    className=" shadow-[ 0px 1.35215px 2.7043px 0px rgba(16, 24, 40, 0.05)]  "
                    placeholder="Aliusugar@gmail.com "
                  />
                </div>
                <div className="mt-[2.25rem]">
                  <label htmlFor="" className="text-[#344054] font-semibold leading-7 mt-4">
                    Password
                  </label>{' '}
                </div>
                <div className="input flex gap-[50%] items-center  w-[100%]  pb-[0.8125rem] pt-[0.8125rem] pl-[1.125rem] md:pr-[1.125rem] mt-[0.5rem]  py-3 px-4 rounded-lg border-[1.352px] border-[#d0d5dd] bg-white shadow-[0px 1.35215px 2.7043px 0px rgba(16, 24, 40, 0.05)]">
                  <input
                    className="shadow-[ 0px 1.35215px 2.7043px 0px rgba(16, 24, 40, 0.05)]"
                    placeholder="Gbemi345"
                  />
                  <Image src={loginEye} alt="visible" className="ml-[3rem]" />
                </div>
                <p className=" font-manrope text-[#009254] text-right  text-[1.18313rem] mt-[0.62rem]">
                  Forgot Password ?
                </p>
                <Button
                  intent={'primary'}
                  className="flex justify-center items-center gap-4 md:pl-[15.0625rem] md:pr-[15.0625rem] pl-[55%] pr-[40%] py-3 md:px-60 md:w-[100%] w-[100%] h-14 rounded-lg button text-white-100 text-center mt-[1rem]"
                >
                  Continue
                </Button>
              </form>
              <div>
                <p className=" text-[#536066] text-center text-[0.875rem] font-semibold mt-[1rem] leading-5">
                  Already have an account? <span className="text-[#009254] ">Sign in</span>
                </p>
              </div>

              <div className="flex items-center justify-center mt-[3.09rem]">
                <div className="w-1/2 h-[0.0925rem] bg-[#BFC8CC]"></div>
                <p className="mx-4 text-[#BFC8CC] font-semibold">OR</p>
                <div className="w-1/2 h-[0.0925rem] bg-[#BFC8CC]"></div>
              </div>
              <div className="mt-[1.5rem] flex flex-col gap-[1rem] relative">
                <Button
                  intent={'secondary'}
                  className="flex justify-center items-center gap-2.5 pr-[2.625rem] py-2 pl-6 text-[#536066]  w-full h-14 rounded-[0.3125rem] border border-[#bfc8cc]"
                  leftIcon={<Image src={google} alt="Google" />}
                >
                  Contunue with Google
                </Button>
                <Button
                  intent={'secondary'}
                  className="flex justify-center items-center gap-2.5 pr-[3.625rem]  py-2 pl-6 text-[#536066]  w-full h-14 rounded-[0.3125rem] border border-[#bfc8cc]"
                  leftIcon={<Image src={github} alt="Google" className="mr-[0.62rem]" />}
                >
                  Continue with Github
                </Button>
                <Button
                  intent={'secondary'}
                  className="flex justify-center items-center gap-2.5 pr-[2.625rem]  py-2 pl-6 text-[#536066]  w-full h-14 rounded-[0.3125rem] border border-[#bfc8cc]"
                  leftIcon={<Image src={facebook} alt="Google" className="" />}
                >
                  Continue with Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0  bottom--6 z-1000 hidden lg:hidden md:block">
        <Image src={lock} alt="Google" />
      </div>
    </div>
  );
}

export default LoginForm;
