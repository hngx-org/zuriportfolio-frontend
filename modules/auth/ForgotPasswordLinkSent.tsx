import React from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import VerificationLayout from './component/verificationLayout';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { resendForgetPassword } from '../../http/auth';
import { useAuth } from '../../context/AuthContext';
import { notify } from '@ui/Toast';

function ForgotPasswordLinkSent() {
  const { email } = useAuth();
  const onResetLinkSentSuccess = (data: any) => {
    console.log(data);
    if (data.status === 200) {
      notify({message: "Reset Link has been resent.", type:"success"})
      return;
    }

    notify({ message: data.message, type: 'error' });
  };

  const { mutate, isLoading } = useAuthMutation(resendForgetPassword, {
    onSuccess: (data) => onResetLinkSentSuccess(data),
    onError: (error: any) => console.log(error),
  });

  const handleResetLinkResent = () => {
    mutate({ email: email });
  };

  return (
    <VerificationLayout>
      <Image
        className="w-[150px] h-[150px] xl:w-[218px] xl:h-[218px] mx-auto"
        src="/assets/images/verification-link-sent.svg"
        alt=""
        width={218}
        height={218}
      />
      <div className=" bg-brand-green-ttr px-4 sm:px-[40px] md:mx-[58px] lg:mx-[148px] py-8 border border-brand-disabled rounded-[32px] z-10">
        <h1 className=" font-manropeEB text-[24px] md:text-[36px] text-center">Reset Link Sent</h1>
        <p className=" font-manropeL text-[12px] md:text-[16px] text-center md:w-[90%] mx-auto text-[#737876] md:text-[#000] py-[16px]  lg:py-[32px]">
          We&apos;ve sent an email to you{' '}
          <span className=" font-manropeEB text-[#003A1B] text-[14px] md:text-[16px]">{email}</span> with a link to
          reset your password.
        </p>

        <Button
          isLoading={isLoading}
          onClick={handleResetLinkResent}
          className=" w-full rounded-md h-[60px] text-[16px] font-manropeB"
        >
          Resend Link
        </Button>
      </div>
    </VerificationLayout>
  );
}

export default ForgotPasswordLinkSent;
