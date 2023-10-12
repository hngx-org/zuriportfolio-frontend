import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Link from 'next/link';
import React, { useState } from 'react';
import AuthLayout from '../../modules/auth/component/AuthLayout';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import SignUpWithGoogle from '@modules/auth/component/AuthSocialButtons/SignUpWithGoogle';
import SignUpWithGithub from '@modules/auth/component/AuthSocialButtons/SignUpWithGithub';
import SignUpWithFacebook from '@modules/auth/component/AuthSocialButtons/SignUpWithFacebook';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { signUpUserWithEmail } from '../../http';
import { useRouter } from 'next/router';

function SignUpWithEmail() {
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  const onSignUpWithEmailSuccess = (data: any) => {
    console.log(data);
    if (data.message !== 'Email does not exist.') {
      /**
       * Display an error message to the user when they try to sign up with an email that already exists.
       * @type {string}
       */
      const errorMessage = 'This email is already registered. Please try logging in or use a different email address.';
      // TOAST-TODO: display the error message to the user

      return;
    }

    // user does not exists, continue to signup page
    router.push(`/auth/signup?email=${userEmail}`);
  };

  const onSignUpWithEmailError = (error: any) => {
    console.error('onError', error.message);
    if (error.message === 'AxiosError: timeout of 30000ms exceeded') {
      console.log('Message here');
      /**
       * Display an error message to the user when there's a timeout error and the API call did not go through.
       * @type {string}
       */
      const timeoutErrorMessage =
        'Oops! The request timed out. Please try again later. If the problem persists, please contact support.';
      // TOAST-TODO: display the error message to the user
    }

    /**
     * Display an error message to the user when there's internal server error and the API call did not go through.
     * @type {string}
     */
    const serverErrorMessage = 'Oops! Something went wrong. Please try again later.';
    // TOAST-TODO: display the error message to the user
  };

  const { mutate: signUpUser, isLoading: isUserSigningUp } = useAuthMutation(signUpUserWithEmail, {
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
    console.log('email', values.email);
    setUserEmail(values.email as string);
    signUpUser({ email: values.email });
  };

  return (
    <AuthLayout isBottomLeftPadlockShown isTopRightBlobShown>
      <div className="text-center lg:text-left">
        <h1 className="mb-1 md:mb-6 text-2xl md:text-[36px] font-semibold text-dark-100 font-manropeEB">Sign up</h1>
        <p className="md:text-[22px] text-custom-color20 font-manropeB">Let&apos;s get you started</p>
      </div>
      <div className="mt-6 md:my-12">
        <form className="flex flex-col gap-8" onSubmit={form.onSubmit((values) => handleSignUpWithEmail(values))}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-manropeB">
              Email Address
            </label>
            <Input
              placeHolder="Allusugar@gmail.com"
              id="email"
              {...form.getInputProps('email')}
              className={`w-full border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${
                form.errors.email ? 'border-red-200' : 'border-slate-50'
              }`}
              type="text"
            />
            <p className="text-[red] text-xs">{form.errors.email && form.errors.email}</p>
          </div>
          <Button
            isLoading={isUserSigningUp}
            intent={'primary'}
            size={'md'}
            className="w-full rounded-lg"
            type="submit"
          >
            Continue
          </Button>
        </form>

        <div className="mt-8">
          <p className="text-center text-gray-200 font-manropeL">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-green-primary hover:text-brand-green-hover">
              Sign in
            </Link>
          </p>
        </div>
        <div className="text-white-650 flex justify-between items-center my-6 lg:my-10">
          <span className="w-[40%] lg:w-[45%] h-[1px] bg-white-650"></span>
          <span>OR</span>
          <span className="w-[40%] lg:w-[45%] h-[1px] bg-white-650"></span>
        </div>
        <div className="flex flex-col gap-y-4">
          <SignUpWithGoogle />
          <SignUpWithGithub />
          <SignUpWithFacebook />
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignUpWithEmail;
