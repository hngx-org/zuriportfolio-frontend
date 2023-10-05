import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthLayout from '../../modules/auth/component/AuthLayout';

function SignUpWithEmail() {
  return (
    <AuthLayout isBottomLeftPadlockShown isTopRightBlobShown>
      <div className="text-center lg:text-left">
        <h1 className="mb-1 md:mb-6 text-2xl md:text-[36px] font-semibold text-dark-100">Sign up</h1>
        <p className="md:text-[22px] text-[#536066]">Let&apos;s get you started</p>
      </div>
      <div className="mt-6 md:mt-12">
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Address</label>
            <Input
              placeHolder="Allusugar@gmail.com"
              id="email"
              name="email"
              className="w-full border-[#D0D5DD]"
              type="email"
            />
          </div>
          <Button intent={'primary'} size={'sm'} className="w-full rounded-lg" type="submit">
            Continue
          </Button>
        </form>

        <div className="mt-8">
          <p className="text-center text-gray-200">
            Already have an account?{' '}
            <Link href={'#'} className="text-brand-green-primary hover:text-brand-green-hover">
              Sign in
            </Link>
          </p>
        </div>
        <div className="text-[#737876] flex justify-between items-center my-6 lg:my-10">
          <span className="w-[40%] lg:w-[45%] h-[1px] bg-[#737876]"></span>
          <span>OR</span>
          <span className="w-[40%] lg:w-[45%] h-[1px] bg-[#737876]"></span>
        </div>
        <div className="flex flex-col gap-y-4">
          <Button
            intent={'tertiary'}
            className="w-full bg-white-100 text-[#536066] border-[#BFC8CC] border rounded-md hover:bg-white-100 hover:border-brand-green-primary"
            leftIcon={<Image width={30} height={30} src={'/assets/images/logo/google-logo.svg'} alt="Google logo" />}
          >
            Continue with Google
          </Button>
          <Button
            intent={'tertiary'}
            className="w-full bg-white-100 text-[#536066] border-[#BFC8CC] border rounded-md hover:bg-white-100 hover:border-brand-green-primary"
            leftIcon={<Image width={20} height={20} src={'/assets/images/logo/github-logo.svg'} alt="Github logo" />}
          >
            Continue with Github
          </Button>
          <Button
            intent={'tertiary'}
            className="w-full bg-white-100 text-[#536066] border-[#BFC8CC] border rounded-md hover:bg-white-100 hover:border-brand-green-primary"
            leftIcon={
              <Image width={20} height={20} src={'/assets/images/logo/facebook-logo.svg'} alt="Facebook logo" />
            }
          >
            Continue with Facebook
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignUpWithEmail;
