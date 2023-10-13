import React, { useState, useContext } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { notify } from '@ui/Toast';
import Link from 'next/link';
import AuthLayout from '../AuthLayout';
import { Eye, EyeSlash } from 'iconsax-react';
import { loginUser } from '../../../../http/auth';
import useAuthMutation from '../../../../hooks/Auth/useAuthMutation';
import SignUpWithGoogle from '@modules/auth/component/AuthSocialButtons/SignUpWithGoogle';
import SignUpWithGithub from '@modules/auth/component/AuthSocialButtons/SignUpWithGithub';
import SignUpWithFacebook from '@modules/auth/component/AuthSocialButtons/SignUpWithFacebook';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../context/AuthContext';
import isAuthenticated from '../../../../helpers/isAuthenticated';
import z from 'zod';
import { useForm, zodResolver } from '@mantine/form';

function LoginForm() {
  const { handleAuth } = useAuth();
  const router = useRouter();
  const [isPasswordShown, setIsPassowordShwon] = useState(false);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Password is required' }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginUserMutation, isLoading: isLoginUserMutationLoading } = useAuthMutation(loginUser, {
    onSuccess: async (res) => {
      console.log('responseoutside', res);

      if (res.message === 'Login successful') {
        // console.log('Login success:', res);
        handleAuth(res.data);
        localStorage.setItem('zpt', res?.data?.token);
        const value = isAuthenticated(res?.data?.token);
        // console.log(value);
        notify({
          message: 'Login successful',
          type: 'success',
        });
        router.push('/');
      } else if (res.message === 'Invalid password') {
        notify({
          message: 'Invalid password',
          type: 'error',
        });
      } else if (res.message === 'User not found') {
        notify({
          message: 'User not found',
          type: 'error',
        });
      } else if (res.message === 'Please verify your account') {
        notify({
          message: 'Please verify your account',
          type: 'error',
        });
      }
    },
    onError: (e) => {
      console.error({ e });
      notify({
        message: 'Error logging in',
        type: 'error',
      });
    },
  });

  const handleLogin = (values: any) => {
    try {
      loginUserMutation({ email: values.email, password: values.password });
    } catch (error) {}

    // No need to reset so if there is error, user can easily find it
    // form.reset();
  };

  return (
    <AuthLayout isTopRightBlobShown isBottomLeftPadlockShown={false}>
      <div className="md:mx-auto lg:mb-10 font-manropeL">
        <div className="md:flex sm:flex flex-col items-center justify-center lg:items-start">
          <p className=" md:text-4xl mt-[1.75rem] md:mt-0 text-[1.5rem] font-bold  text-center lg:text-left ">Log In</p>
          <p className="text-custom-color30  mt-[1rem] md:text-[1.375rem]  lg:font-semibold sm:tracking-[0.00375rem] text-center md:text-left">
            Log in to continue using zuriportfolio
          </p>
        </div>

        <div className="pt-[2.25rem]">
          <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
            <div>
              <label htmlFor="email" className="text-slate-300 font-semibold leading-7">
                Email Address
              </label>
              <Input
                placeHolder="Allusugar@gmail.com"
                id="email"
                {...form.getInputProps('email')}
                className={`w-full mt-[0.5rem] py-[0.84rem] bg-transparent ${
                  form.errors.email ? 'border-[red]' : 'border-slate-50'
                }`}
                type="email"
              />
              <p className="text-[red] text-xs pt-1">{form.errors.email && form.errors.email}</p>
            </div>
            <div className="mt-[1rem]">
              <label htmlFor="password" className="text-slate-300 font-semibold leading-7 mt-4">
                Password
              </label>
              <Input
                placeHolder="Gbemi345"
                id="password"
                {...form.getInputProps('password')}
                className={`w-full mt-[0.5rem] py-[0.84rem] bg-transparent ${
                  form.errors.password ? 'border-[red]' : 'border-slate-50'
                }`}
                type={isPasswordShown ? 'text' : 'password'}
                rightIcon={
                  isPasswordShown ? (
                    <Eye className="cursor-pointer" onClick={() => setIsPassowordShwon(false)} />
                  ) : (
                    <EyeSlash className="cursor-pointer" onClick={() => setIsPassowordShwon(true)} />
                  )
                }
              />
              <p className="text-[red] text-xs pt-1">{form.errors.password && form.errors.password}</p>
            </div>

            <div className='flex justify-end'>
              <Link href="/auth/forgot-password">
                <span className=" font-manrope text-brand-green-primary text-right  text-[1.18313rem] mt-[0.62rem]">
                  Forgot Password ?
                </span>
              </Link>
            </div>

            <Button
              isLoading={isLoginUserMutationLoading}
              intent={'primary'}
              type="submit"
              size={'md'}
              className="w-full rounded-lg mt-[1rem]"
            >
              Continue
            </Button>
          </form>
          <div>
            <p className=" text-custom-color20 text-center text-[0.875rem] font-semibold mt-[1rem] leading-5">
              Don&apos;t have an account?
              <Link href="/auth/signup-with-email">
                <span className="text-brand-green-primary"> Sign Up</span>
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-center mt-[2.5rem]">
            <div className="w-1/2 h-[0.0625rem] bg-white-650"></div>
            <p className="mx-4 text-white-650 font-semibold">OR</p>
            <div className="w-1/2 h-[0.0625rem] bg-white-650 "></div>
          </div>
          <div className="mt-[1.6rem] flex flex-col gap-[1rem] relative">
            <SignUpWithGoogle />
            <SignUpWithGithub />
            <SignUpWithFacebook />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginForm;
