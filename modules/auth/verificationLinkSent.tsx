import React from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import { VerificationLayoutProps } from '../../@types';
import VerificationLayout from './component/verificationLayout';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { resendVerification } from '../../http/auth';
import { useAuth } from '../../context/AuthContext';

type Props = {
  handleClick: VerificationLayoutProps['handleClick'];
};

function VerificationLinkSent({ handleClick }: Props) {
  const { email } = useAuth();

  const { mutate, isLoading } = useAuthMutation(resendVerification, {
    onSuccess: (data) => console.log(data),
    onError: (error: any) => console.log(error),
  });

  const handleVerificationLink = () => {
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
        <h1 className=" font-manropeEB text-[24px] md:text-[36px] text-center">Verification Link Sent</h1>
        <p className=" font-manropeL text-[12px] md:text-[16px] text-center md:w-[90%] mx-auto text-[#737876] md:text-[#000] py-[16px]  lg:py-[32px]">
          We&apos;ve sent an email to your{' '}
          <span className=" font-manropeEB text-[#003A1B] text-[14px] md:text-[16px]">{email}</span> with a verification
          link.
        </p>

        <Button onClick={handleVerificationLink} className=" w-full rounded-md h-[60px] text-[16px] font-manropeB">
          Resend Verification Link
        </Button>

        <div className=" flex gap-2 flex-col sm:flex-row justify-between pt-3">
          <p className=" font-manropeL text-[10px] text-[#737876] md:text-[#000]">
            Link expires in <span className=" font-manropeB text-[#003A1B]">4:23</span>
          </p>

          {/* Uncomment out when change email endpoint is working */}
          <button
            onClick={handleClick}
            className=" font-manropeL text-left sm:text-right text-[10px] md:text-brand-green-primary text-[#737876] "
          >
            Incorrect email address? Change email address
          </button>
        </div>
      </div>
    </VerificationLayout>
  );
}

export default VerificationLinkSent;
