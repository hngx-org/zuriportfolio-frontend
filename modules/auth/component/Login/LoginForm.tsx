import React, { FormEvent, useState, useContext } from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import google from '../../../../public/assets/loginPageAssets/google.svg';
import github from '../../../../public/assets/loginPageAssets/github.svg';
import facebook from '../../../../public/assets/loginPageAssets/facebook.svg';
import Link from 'next/link';
import AuthLayout from '../AuthLayout';
import { Eye, EyeSlash } from 'iconsax-react';

import InputError from '../InputError';
import useInputError from '../../../../hooks/useInputError';
import { loginUser } from '../../../../http';
import useAuthMutation from '../../../../hooks/Auth/useAuthMutation';
import SignUpWithGoogle from '@modules/auth/component/AuthSocialButtons/SignUpWithGoogle';
import SignUpWithGithub from '@modules/auth/component/AuthSocialButtons/SignUpWithGithub';
import SignUpWithFacebook from '@modules/auth/component/AuthSocialButtons/SignUpWithFacebook';
import { useRouter } from 'next/router';
import AuthContext from '../../../../context/AuthContext';
import isAuthenticated from '../../../../helpers/isAuthenticated';
import { notify } from '@ui/Toast';

function LoginForm() {
  const { handleAuth } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPassowordShwon] = useState(false);
  const { handleSubmit, inputErrors } = useInputError();

  const { mutate: loginUserMutation, isLoading: isLoginUserMutationLoading } = useAuthMutation(loginUser, {
    // onSuccess: async (res) => {
    //    console.log("responseoutside", res);
    //   if (res.statusCode === 200 && res.token) {
    //     console.log('response', res);
    //     router.push('/dashboard/orders');
    //   }

    //   // router.push('/dashboard/orders');
    // },

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
      router.push('/access-denied');
    },
  });

  //  const { mutate: loginUserMutation, isLoading } = useMutation(loginUser, {
  //   onSuccess: async res => {
  //     handleAuthState(res.data)
  //     navigate('/dashboard')
  //   },
  //   onError: e => {
  //     console.error({ e })
  //     toast.error('Incorrect login credentials')
  //   },
  // })

  // const handleSubmit = (values: any) => {
  //   loginUserMutation(values)
  // }

  // const loginFn = useAuthMutation(loginUser, {
  //   onSuccess: (data) => {
  //     if (data === 'User not found ') {

  //       // router.push('/access-denied');
  //     }else {
  //            router.push('/dashboard/orders');
  //     }
  //     // console.log(data);

  //   },
  //   // onError: (err: any) => {
  //   // //  router.push('/access-denied');
  //   // },
  // });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('heloooooooooo');

    if (email.length !== 0 && password.length !== 0) {
      loginUserMutation({ email: email, password: password });
    }
    // To clear the input filed after submission
    setEmail('');
    setPassword('');
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
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="text-slate-300 font-semibold leading-7">
                Email Address
              </label>
              <Input
                placeHolder="Allusugar@gmail.com"
                id="email"
                name="email"
                className="w-full border-slate-50 mt-[0.5rem] py-[0.84rem] bg-transparent "
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputError inputError={inputErrors} inputName="email" />
            </div>
            <div className="mt-[1rem]">
              <label htmlFor="password" className="text-slate-300 font-semibold leading-7 mt-4">
                Password
              </label>
              <Input
                placeHolder="Gbemi345"
                id="password"
                name="password"
                className="w-full border-slate-50 mt-[0.5rem] py-[0.84rem] bg-transparent "
                type={isPasswordShown ? 'text' : 'password'}
                rightIcon={
                  isPasswordShown ? (
                    <Eye className="cursor-pointer" onClick={() => setIsPassowordShwon(false)} />
                  ) : (
                    <EyeSlash className="cursor-pointer" onClick={() => setIsPassowordShwon(true)} />
                  )
                }
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputError inputError={inputErrors} inputName="password" />
            </div>

            <Link href="/auth/forgot-password">
              <p className=" font-manrope text-brand-green-primary text-right  text-[1.18313rem] mt-[0.62rem]">
                Forgot Password ?
              </p>
            </Link>

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
