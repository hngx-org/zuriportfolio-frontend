import React from 'react';

import Image from 'next/image';
import Button from '@ui/Button';
import Link from 'next/link';
import letter from '../../../../public/assets/auth/letter.svg';
import AuthLayout from '@modules/auth/component/AuthLayout';
const SuccessPage = () => {
  return (
    <AuthLayout isTopRightBlobShown={true} isBottomLeftPadlockShown={false}>
      <div className="font-manropeB flex-1 flex-col mt-32 flex justify-center md:py-14   max-w-[517px] mx-auto lg:mt-12">
        <figure className="w-fit mx-auto md:mb-[52px] mb-5">
          <Image src={letter} alt="Letter" />
        </figure>
        <p className="font-manropeB leading-[127.273%] md:text-[22px] text-[14px] text-custom-color20 md:mb-[34.01px] mb-5 text-center">
          A link has been sent to your mail
        </p>
        <Button
          intent={'primary'}
          className="flex justify-center items-center gap-4 whitespace-nowrap py-3 md:px-60 md:w-[100%] w-[100%] md:mb-[50px] mb-5 h-14 rounded-lg button text-white-100 text-center mt-[1rem] tracking-[ 0.024px] leading-[150%]"
        >
          Check my mail to proceed
        </Button>
        <p className="text-[14px] text-center text-custom-color20 font-medium">
          Go back to{' '}
          <Link href="/auth/login" className="text-brand-green-primary">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SuccessPage;
