import Button from '@ui/Button';
import React from 'react';
import Image from 'next/image';
import VerificationLayout from './component/verificationLayout';
import { Input } from '@ui/Input';
import { useForm, zodResolver } from '@mantine/form';
import z from 'zod';
import { useRouter } from 'next/router';
import { notify } from '@ui/Toast';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { checkEmail } from '../../http/auth';

function ChangeEmailAddress() {
  const router = useRouter();

  const onSignUpWithEmailSuccess = (data: { message: string }) => {
    if (data.message !== 'Email is available for use') {
      const errorMessage = 'This email is already registered. Please try logging in or use a different email address.';
      notify({ message: errorMessage, type: 'error' });
      return;
    }

    router.push(`/auth/guest-signup-form?email=${form.values.email}`);
  };

  const onSignUpWithEmailError = (error: { message: string }) => {
    if (error.message === 'AxiosError: timeout of 30000ms exceeded') {
      const timeoutErrorMessage =
        'Oops! The request timed out. Please try again later. If the problem persists, please contact support.';
      notify({ message: timeoutErrorMessage });
      return;
    }

    const serverErrorMessage = 'Oops! Something went wrong. Please try again later.';
    notify({ message: serverErrorMessage });
  };

  const { mutate: signUpUser, isLoading: isUserSigningUp } = useAuthMutation(checkEmail, {
    onSuccess: (data) => onSignUpWithEmailSuccess(data),
    onError: (error: any) => onSignUpWithEmailError(error),
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
    signUpUser({ email: values.email });
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
      <div className=" sm:bg-brand-green-ttr sm:px-[40px] w-full max-w-[600px] md:px-[45px] py-8 lg:py-10 sm:border sm:border-brand-disabled rounded-[32px] z-10">
        <div className=" w-full">
          <h1 className=" font-manropeEB text-2xl md:text-4xl text-center">Change email address</h1>
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
                placeHolder="user@example.com"
                className={`w-full text-[#667085] h-[60px] border ${
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
    </VerificationLayout>
  );
}

export default ChangeEmailAddress;
