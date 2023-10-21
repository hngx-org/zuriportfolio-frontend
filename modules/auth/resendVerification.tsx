import Button from '@ui/Button';
import React, { useState } from 'react';
import Image from 'next/image';
import VerificationLayout from './component/verificationLayout';
import { Input } from '@ui/Input';
import { useForm, zodResolver } from '@mantine/form';
import z from 'zod';
import { useRouter } from 'next/router';
import { notify } from '@ui/Toast';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { resendVerification } from '../../http/auth';

function ResendVerification() {
  const router = useRouter();

  const [email, setEmail] = useState('');

  const onresendEmailVerifySuccess = (data: any) => {
    if (data.message) {
      notify({ message: data.message, type: data.status === 200 ? 'success' : 'error' });
      if (data.status === 200) {
        router.push(`/auth/verification?email=${email}`);
      }
      return;
    }
  };

  const onresendEmailVerifyError = (error: any) => {
    if (error.response && error.response.message === 'AxiosError: timeout of 30000ms exceeded') {
      const timeoutErrorMessage =
        'Oops! The request timed out. Please try again later. If the problem persists, please contact support.';
      notify({ message: timeoutErrorMessage });
      return;
    }

    notify({ message: error.message, type: 'error' });
  };

  const { mutate: resendVerify, isLoading: isUserSigningUp } = useAuthMutation(resendVerification, {
    onSuccess: (data) => onresendEmailVerifySuccess(data),
    onError: (error: any) => onresendEmailVerifyError(error),
  });

  const schema = z.object({
    email: z.string().email(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
    },
  });

  const handleSignUpWithEmail = (values: any) => {
    setEmail(values.email);
    resendVerify({ email: values.email });
  };

  return (
    <div className=" sm:bg-brand-green-ttr sm:px-[40px] w-full max-w-[600px] md:px-[45px] py-8 lg:py-10 sm:border sm:border-brand-disabled rounded-[32px] z-10">
      <div className=" w-full">
        <h1 className=" font-manropeEB text-2xl md:text-4xl text-center">Verify email address</h1>
        <p className=" font-manropeL text-[16px] mx-auto text-center md:w-[90%] text-[#737876] md:text-[#000] pt-3 pb-8">
          Please enter your email address to get verified
        </p>

        <div className=" flex flex-col gap-3">
          <form className="flex flex-col gap-2" onSubmit={form.onSubmit((values) => handleSignUpWithEmail(values))}>
            <label htmlFor="email" className=" font-manropeB text-sm ">
              Email
            </label>

            <Input
              type="text"
              {...form.getInputProps('email')}
              placeHolder="Enter email"
              className={`w-full text-black h-[60px] border ${
                form.errors.email ? 'border-[#EF4444]' : 'border-[#D0D5DD]'
              }`}
            />
            <p className="text-[red] text-xs">{form.errors.email && form.errors.email}</p>

            <Button size="sm" className=" w-full h-[60px] rounded-md" type="submit" isLoading={isUserSigningUp}>
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResendVerification;
