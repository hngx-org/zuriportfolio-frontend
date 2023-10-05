import React from 'react';
import LoginImage from '../../public/LoginImage.png';
import Image from 'next/image';
import loginLogo from '../../public/loginLogo.svg';
import loginEye from '../../public/LoginEye.svg';
import Button from '@ui/Button';

function LoginForm() {
  return (
    <div className="pl-16 pr-16 pt-8 pb-8">
      <div className="flex gap-11">
        <div className="w-82 h-96 ">
          <Image src={LoginImage} alt="image" />
        </div>
        <div className="mt-4 ">
          <Image src={loginLogo} alt="logo" />
          <p className="pt-[5rem] text-4xl font-bold leading-10 ">Log In</p>
          <p className="text-[#6B797F]  pt-[0.94rem] text-[1.375rem] font-semibold">
            Log in to continue using zuriportfolio
          </p>
          <div className="pt-[2.25rem]">
            <form>
              <label htmlFor="" className="text-[#344054] font-semibold leading-7">
                Email Address
              </label>
              <div className="input flex items-center   pb-[0.8125rem] pt-[0.8125rem] pl-[1.125rem] pr-[1.125rem] mt-[0.5rem]  py-3 px-4 rounded-lg border-[1.352px] border-[#d0d5dd] bg-white shadow-[0px 1.35215px 2.7043px 0px rgba(16, 24, 40, 0.05)]">
                <input className="w-96  " placeholder="Aliusugar@gmail.com " />
              </div>
              <div className="mt-[2.25rem]">
                <label htmlFor="" className="text-[#344054] font-semibold leading-7 mt-4">
                  Password
                </label>{' '}
              </div>
              <div className="input flex items-center  pb-[0.8125rem] pt-[0.8125rem] pl-[1.125rem] pr-[1.125rem] mt-[0.5rem]  py-3 px-4 rounded-lg border-[1.352px] border-[#d0d5dd] bg-white shadow-[0px 1.35215px 2.7043px 0px rgba(16, 24, 40, 0.05)]">
                <input className="w-96" placeholder="Gbemi345" />
                <Image src={loginEye} alt="visible" />
              </div>
              <p className=" font-manrope text-[#009254] text-right  text-[1.18313rem]">Forgot Password ?</p>
              <Button intent={'tertiary'}></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
