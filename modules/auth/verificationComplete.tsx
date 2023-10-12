import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import VerificationLayout from './component/verificationLayout';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { verifyUser } from '../../http';
import { useRouter } from 'next/router';

function VerificationComplete() {
  const router = useRouter();
  const { token } = router.query;

  console.log(token);

  const [message, setMessage] = useState({});

  const { mutate, isLoading } = useAuthMutation(verifyUser, {
    onSuccess: (data) => {
      console.log(data);

      setMessage(data);

      router.push('/auth/login');
    },
    onError: ({ response }: any) => {
      console.log(response.data.message);

      if (response.data.message === 'Email already verified. Please login') {
        router.push('auth/login');
      } else {
        router.push('/auth/verification');
      }
    },
  });

  console.log({ message });

  const verifyQuery = async () => {
    mutate({ token: token as any });
  };

  useEffect(() => {
    try {
      console.log(token, 'inside the try catch');
      verifyQuery();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  return (
    <VerificationLayout>
      {/* {success && (
        <>
          <Image
            className="w-[218px] h-[159px] xl:w-[218px] xl:h-[218px] mx-auto mt-16 md:mt-16 lg:"
            src="/assets/images/verification-complete.svg"
            alt=""
            width={218}
            height={218}
          />
          <div className=" sm:bg-brand-green-ttr px-4 max-w-[712px] sm:px-[40px] md:px-[58px] lg:px-[120px] py-5 sm:border sm:border-brand-disabled rounded-[32px] z-10">
            <h1 className=" font-manropeEB text-[24px] md:text-[36px] text-center">Verification Complete</h1>
            <p className=" font-manropeL text-[16px] text-center text-[#737876] md:text-[#000] py-[16px] ">
              Account verification complete. You will be redirected to a login page.
            </p>
          </div>
        </>
      )} */}

      {isLoading && (
        <div className="w-16 h-16 border-t-4 border-[#009254] border-solid rounded-full animate-spin"></div>
      )}

      {/* {!success && (
        <div className=" sm:bg-brand-green-ttr px-4 max-w-[712px] sm:px-[40px] md:px-[58px] lg:px-[120px] py-5 sm:border sm:border-brand-disabled rounded-[32px] z-10">
          <h1 className=" font-manropeEB text-[24px] md:text-[36px] text-center">Link has expired</h1>
          <p className=" font-manropeL text-[16px] text-center text-[#737876] md:text-[#000] py-[16px] ">
            Please get a new link
          </p>
        </div>
      )} */}
    </VerificationLayout>
  );
}

export default VerificationComplete;
