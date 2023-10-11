import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Link from 'next/link';
import React from 'react';
import AuthLayout from '../../modules/auth/component/AuthLayout';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import SignUpWithGoogle from '@modules/auth/component/AuthSocialButtons/SignUpWithGoogle';
import SignUpWithGithub from '@modules/auth/component/AuthSocialButtons/SignUpWithGithub';
import SignUpWithFacebook from '@modules/auth/component/AuthSocialButtons/SignUpWithFacebook';

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
              type="text"
            />
            <p className="text-[red] text-xs">{form.errors.email && form.errors.email}</p>
          </div>
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
          <SignUpWithGoogle />
          <SignUpWithGithub />
          <SignUpWithFacebook />
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignUpWithEmail;
