import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import VerificationLayout from './component/verificationLayout';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { resendForgetPassword } from '../../http/auth';
import { useAuth } from '../../context/AuthContext';
import { notify } from '@ui/Toast';
import { useRouter } from 'next/router';

function ForgotPasswordLinkSent() {
  const router = useRouter();
  const { email } = router.query;

  const [countdown, setCountdown] = useState(120);

  const onResetLinkSentSuccess = (data: any) => {
    if (data.status === 200) {
      notify({ message: 'Reset Link has been resent.', type: 'success', theme: 'light' });
      return;
    }

    notify({ message: data.message, type: 'error', theme: 'light' });
  };

  const onResetLinkSentError = (error: any) => {
    notify({ message: error.message, type: 'error', theme: 'light' });
  };

  const { mutate, isLoading } = useAuthMutation(resendForgetPassword, {
    onSuccess: (data) => onResetLinkSentSuccess(data),
    onError: (error: any) => onResetLinkSentError(error),
  });

  const handleResetLinkResent = () => {
    setCountdown(120);
    mutate({ email: email as string });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const isButtonDisabled = countdown > 0;

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
          disabled={isButtonDisabled}
        >
          Resend Link
        </Button>
        <div className=" flex gap-2 flex-col sm:flex-row justify-start pt-3">
          <p className=" font-manropeL text-[10px] text-[#737876] md:text-[#000]">
            Resend code{' '}
            <span className=" font-manropeB text-[#003A1B]">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>
        </div>
      </div>
    </VerificationLayout>
  );
}

export default ForgotPasswordLinkSent;
