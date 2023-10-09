import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import google from '../../../../public/assets/loginPageAssets/google.svg';
import github from '../../../../public/assets/loginPageAssets/github.svg';
import facebook from '../../../../public/assets/loginPageAssets/facebook.svg';
import Link from 'next/link';
import AuthLayout from '../AuthLayout';
import { Eye, EyeSlash } from 'iconsax-react';

import InputError from '../InputError';
import useInputError from '../../../../hooks/useInputError';

function LoginForm() {
  const [isPasswordShown, setIsPassowordShwon] = useState(false);
  const { handleSubmit, inputErrors } = useInputError();

  return (
    <AuthLayout isTopRightBlobShown isBottomLeftPadlockShown={false}>
      <div className="md:mx-auto h-[90%]  font-manropeL">
        <div className="md:flex sm:flex flex-col items-center justify-center lg:items-start">
          <p className=" md:text-4xl text-[1.5rem] font-bold  text-center lg:text-left ">Log In</p>
          <p className="text-custom-color30  mt-[1rem] md:text-[1.375rem]  lg:font-semibold sm:tracking-[0.00375rem] text-center md:text-left">
            Log in to continue using zuriportfolio
          </p>
        </div>

        <div className="pt-[2.25rem]">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-slate-300 font-semibold leading-7">
                Email Address
              </label>
              <Input
                placeHolder="Allusugar@gmail.com"
                id="email"
                name="email"
                className="w-full border-slate-50 mt-[0.5rem] py-[0.84rem] bg-transparent "
                type="email"
              />
              <InputError inputError={inputErrors} inputName="email" />
            </div>
            <div className="mt-[1rem]">
              <label htmlFor="password" className="text-slate-300 font-semibold leading-7 mt-4">
                Password
              </label>
              <Input
                placeHolder="Gbemi345"
                id="password"
                name="password"
                className="w-full border-slate-50 mt-[0.5rem] py-[0.84rem] bg-transparent "
                type={isPasswordShown ? 'text' : 'password'}
                rightIcon={
                  isPasswordShown ? (
                    <Eye className="cursor-pointer" onClick={() => setIsPassowordShwon(false)} />
                  ) : (
                    <EyeSlash className="cursor-pointer" onClick={() => setIsPassowordShwon(true)} />
                  )
                }
              />
              <InputError inputError={inputErrors} inputName="password" />
            </div>

            <Link href={'/auth/2fa'}>
              <p className=" font-manrope text-brand-green-primary text-right  text-[1.18313rem] mt-[0.62rem]">
                Forgot Password ?
              </p>
            </Link>

            <Button intent={'primary'} type="submit" size={'md'} className="w-full rounded-lg mt-[1rem]">
              Continue
            </Button>
          </form>
          <div>
            <p className=" text-custom-color20 text-center text-[0.875rem] font-semibold mt-[1rem] leading-5">
              Already have an account? <span className="text-brand-green-primary">Sign in</span>
            </p>
          </div>

          <div className="flex items-center justify-center mt-[2.5rem]">
            <div className="w-1/2 h-[0.0625rem] bg-white-650"></div>
            <p className="mx-4 text-white-650 font-semibold">OR</p>
            <div className="w-1/2 h-[0.0625rem] bg-white-650 "></div>
          </div>
          <div className="mt-[1.6rem] flex flex-col gap-[1rem] relative">
            <Button
              intent={'secondary'}
              className="flex justify-center items-center gap-2.5 pr-[3rem] py-2  text-custom-color20  w-full h-14 rounded-[0.3125rem] border border-custom-color21"
              leftIcon={<Image src={google} alt="Google" className="mr-[0.62rem]" />}
            >
              Contunue with Google
            </Button>
            <Button
              intent={'secondary'}
              className="flex justify-center items-center gap-2.5 pr-[3.625rem]  py-2 pl-6 text-custom-color20  w-full h-14 rounded-[0.3125rem] border  border-custom-color21"
              leftIcon={<Image src={github} alt="Google" className="mr-[0.62rem]" />}
            >
              Continue with Github
            </Button>
            <Button
              intent={'secondary'}
              className="flex justify-center items-center gap-2.5 pr-[2.625rem]  py-2 pl-6 text-custom-color20  w-full h-14 rounded-[0.3125rem] border  border-custom-color21"
              leftIcon={<Image src={facebook} alt="Google" className="mr-[0.62rem]" />}
            >
              Continue with Facebook
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginForm;
