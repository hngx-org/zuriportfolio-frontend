import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthLayout from '../../modules/auth/component/AuthLayout';
import googleLogo from '../../public/assets/images/logo/google-logo.svg';
import facebookLogo from '../../public/assets/images/logo/facebook-logo.svg';
import githubLogo from '../../public/assets/images/logo/github-logo.svg';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

function SignUpWithEmail() {
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
              type="email"
            />
            <p className="text-[red] text-xs">{form.errors.email && form.errors.email}</p>
          </div>
          {/* <Link href="/auth/signup"> */}
          <Button intent={'primary'} size={'md'} className="w-full rounded-lg" type="submit">
            Continue
          </Button>
          {/* </Link> */}
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
          <Button
            intent={'tertiary'}
            size={'sm'}
            className="w-full bg-white-100 text-custom-color20 border-custom-color21 border rounded-md hover:bg-white-100 hover:border-brand-green-primary sm:text-base"
            // the google logo has white space around it, so i am reducing the margin on the right so all the buttons look similar
            leftIcon={<Image src={googleLogo} alt="Google logo" className="w-8 h-8 -mr-1.5" />}
          >
            Continue with Google
          </Button>
          <Button
            intent={'tertiary'}
            size={'sm'}
            className="w-full bg-white-100 text-custom-color20 border-custom-color21 border rounded-md hover:bg-white-100 hover:border-brand-green-primary sm:text-base"
            leftIcon={<Image src={githubLogo} alt="Github logo" className="w-5 h-5" />}
          >
            Continue with Github
          </Button>
          <Button
            intent={'tertiary'}
            size={'sm'}
            className="w-full bg-white-100 text-custom-color20 border-custom-color21 border rounded-md hover:bg-white-100 hover:border-brand-green-primary sm:text-base"
            leftIcon={<Image src={facebookLogo} alt="Facebook logo" className="w-5 h-5" />}
          >
            Continue with Facebook
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignUpWithEmail;
