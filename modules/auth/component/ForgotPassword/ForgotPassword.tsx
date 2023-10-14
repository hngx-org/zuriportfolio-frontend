import React from 'react';
import Button from '@ui/Button';
import Link from 'next/link';
import AuthLayout from '../AuthLayout';
import { Input } from '@ui/Input';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import useAuthMutation from '../../../../hooks/Auth/useAuthMutation';
import { notify } from '@ui/Toast';
import { useRouter } from 'next/router';
import { forgetPassword } from '../../../../http/auth';

const ForgotPassword = () => {
  const notifyError = (message: string) => notify({ type: 'error', message, theme: 'light' });
  const router = useRouter();

  //Error Handler
  const forgotPasswordSuccess = (data: any) => {
    console.log(data.message);
    if (data.message === 'User not found') {
      const errorMessage = 'This user does not have an account';
      notifyError(errorMessage);
      return;
    } else if (data.message === 'AxiosError: timeout of 30000ms exceeded') {
      const timeoutErrorMessage =
        'Oops! The request timed out. Please try again later. If the problem persists, please contact support.';
      notifyError(timeoutErrorMessage);
      return;
    } else if (data.message === 'AxiosError: Network Error') {
      const errorMessage = 'Server is down! Please try again later';
      notifyError(errorMessage);
      return;
    }
    const errorMessage = 'Oops! An error occurred. If the issue persists, reach out to support.';
    notifyError(errorMessage);
  };

  // Form validation
  const schema = z.object({
    email: z.string().email(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
    },
  });

  // Hook for making an API call and handling the response
  const { mutate, isLoading } = useAuthMutation(forgetPassword, {
    onSuccess: (data) => {
      forgotPasswordSuccess(data);
      router.push('/auth/reset-password');
    },
    onError: (error: any) => console.log(error),
  });

  // Handling email input
  const handleForgotPassword = (values: any) => {
    console.log('email', values.email);
    mutate({ email: values.email });
  };

  return (
    <AuthLayout isTopRightBlobShown isBottomLeftPadlockShown>
      <main className=" flex mx-auto lg:pt-16 lg:gap-[43px] ">
        <section className="flex-col flex lg:w-fit w-full lg:text-start text-center ">
          <div className="font-manropeB flex-1 flex-col  flex justify-center md:py-14  max-w-[517px] mx-auto">
            <h1 className="font-manropeEB font-bold text-black md:text-[36px] leading-[122.222%] tracking-[-0.09px] md:mb-4 mb-[10px] text-[24px] ">
              Forgot your Password ?
            </h1>
            <p className=" lg:text-[16px] md:text-[22px] text-[14px] font-semibold max-w-[296px] md:max-w-[503px] mx-auto lg:max-w-none lg:mx-0 leading-[150%] tracking-[0.024px] text-custom-color20 md:mb-[70px] mb-10 ">
              Enter your registered email below to receive reset instructions.
            </p>
            <form
              className="flex flex-col md:gap-12 gap-[30px] md:mb-12 mb-[30px]"
              onSubmit={form.onSubmit((values) => handleForgotPassword(values))}
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-slate-300 text-start font-semibold text-[16px] leading-[169.019%]"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  {...form.getInputProps('email')}
                  type="email"
                  placeholder="Aliusugar@gmail.com"
                  className={`w-full h-[44px] md:h-[60px] border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${
                    form.errors.email ? 'border-[red]' : 'border-slate-50'
                  }`}
                />
                <p className="text-[red] text-xs">{form.errors.email && form.errors.email}</p>
              </div>
              <Button
                className="flex justify-center items-center gap-4 py-3 md:w-[100%] w-[100%] h-[44px] md:h-[60px] rounded-lg button text-white-100 text-center"
                isLoading={isLoading}
              >
                Submit
              </Button>
            </form>
            <p className="text-[14px] text-center text-custom-color20 font-medium">
              Go back to{' '}
              <Link href="/auth/login" className="text-brand-green-primary">
                Login
              </Link>
            </p>
          </div>
        </section>
      </main>
    </AuthLayout>
  );
};

export default ForgotPassword;
