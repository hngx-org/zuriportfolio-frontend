'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import Link from 'next/link';
import AuthLayout from './AuthLayout';
import { Eye, EyeSlash } from 'iconsax-react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import PasswordPopover from '@modules/auth/component/PasswordPopover';
import useAuthMutation from '../../../hooks/Auth/useAuthMutation';
import { guestSignup } from '../../../http/auth';
import { useRouter } from 'next/router';
import { notify } from '@ui/Toast';

const Guestsignupform: React.FC = () => {
  const router = useRouter();

  const { email } = router.query;

  const { mutate: guestSignupFn, isLoading: isLoginUserMutationLoading } = useAuthMutation(guestSignup, {
    onSuccess: (data) => {
      console.log(data?.status);
      // if (data?.status === 200) {
      //   router.push('/auth/verification');
      // }
    },
    onError: (res) => console.log({ res }),
    // notify({
    //   message: `${res}`,
    //   type: 'error',
    // }),
  });
  const [passwordVisible, togglePasswordVisibility] = usePasswordVisibility();
  const [confirmPasswordVisible, toggleConfirmPasswordVisibility] = usePasswordVisibility();

  const schema = z
    .object({
      firstname: z.string().min(1, { message: 'First name is required' }),
      lastname: z.string().min(1, { message: 'Last name is required' }),
      password: z.string().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/, { message: 'Please match requirements' }),
      confirmPassword: z.string().min(2, { message: 'Confirm password is required' }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          path: ['confirmPassword'],
          code: 'custom',
          message: 'The passwords did not match',
        });
      }
    });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
  });

  const handleGuestSignUp = async (values: any) => {
    try {
      const userData = {
        email: email as string,
        firstName: values.firstname,
        lastName: values.lastname,
        password: values.password,
      };
      guestSignupFn(userData);
    } catch (error) {
      console.log(`Error during guest signup: ${error}`);
    }
  };

  return (
    <AuthLayout isBottomLeftPadlockShown isTopRightBlobShown>
      <div className="text-center lg:text-left">
        <h1 className="mb-1 md:mb-6 text-2xl md:text-[36px] leading-[44px] font-semibold text-dark-100">
          Finish setting up your account
        </h1>
        <p className="md:text-[22px] text-[#6b797f] leading-7">{`${email}`}</p>
      </div>
      <div className="mt-6 md:mt-12">
        <form className="flex flex-col" onSubmit={form.onSubmit((values) => handleGuestSignUp(values))}>
          {/* First Name */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="firstname" className="leading-[27.04px] font-medium text-gray-600 text-base">
              First name
            </label>
            <Input
              placeHolder="Enter first name"
              id="firstname"
              name="firstname"
              {...form.getInputProps('firstname')}
              className={`w-full h-[44px] md:h-[60px] ${form.errors.firstname ? 'border-[red]' : 'border-[#D0D5DD]'}`}
              type="text"
              style={{ fontSize: '16px' }}
            />
            <p className="text-[red] text-xs">{form.errors.firstname && form.errors.firstname}</p>
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="lastname" className="leading-[27.04px] font-medium text-gray-600 text-base">
              Last name
            </label>
            <Input
              placeHolder="Enter last name"
              id="lastname"
              name="lastname"
              {...form.getInputProps('lastname')}
              className={`w-full h-[44px] md:h-[60px] ${form.errors.lastname ? 'border-[red]' : 'border-[#D0D5DD]'}`}
              type="text"
              style={{ fontSize: '16px' }}
            />
            <p className="text-[red] text-xs">{form.errors.lastname && form.errors.lastname}</p>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password" className="leading-[27.04px] font-medium text-gray-600 text-base">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <PasswordPopover password={form.values.password}>
                <Input
                  placeHolder="Enter password"
                  id="password"
                  {...form.getInputProps('password')}
                  className={`w-full h-[44px] md:h-[60px] ${
                    form.errors.password ? 'border-[red]' : 'border-[#D0D5DD]'
                  }`}
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  rightIcon={
                    passwordVisible ? (
                      <EyeSlash onClick={togglePasswordVisibility} className="cursor-pointer" />
                    ) : (
                      <Eye onClick={togglePasswordVisibility} className="cursor-pointer" />
                    )
                  }
                  style={{ fontSize: '16px' }}
                />
              </PasswordPopover>
              <p className="text-[red] text-xs">{form.errors.password && form.errors.password}</p>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="confirmPassword" className="leading-[27.04px] font-medium text-gray-600 text-base">
              Confirm password
            </label>
            <div style={{ position: 'relative' }}>
              <Input
                placeHolder="Enter confirm password"
                id="confirmPassword"
                {...form.getInputProps('confirmPassword')}
                className={`w-full h-[44px] md:h-[60px] ${
                  form.errors.confirmPassword ? 'border-[red]' : 'border-[#D0D5DD]'
                }`}
                name="confirmPassword"
                type={confirmPasswordVisible ? 'text' : 'password'}
                rightIcon={
                  confirmPasswordVisible ? (
                    <EyeSlash onClick={toggleConfirmPasswordVisibility} className="cursor-pointer" />
                  ) : (
                    <Eye onClick={toggleConfirmPasswordVisibility} className="cursor-pointer" />
                  )
                }
                style={{ fontSize: '16px' }}
              />

              <p className="text-[red] text-xs">{form.errors.confirmPassword && form.errors.confirmPassword}</p>
            </div>
          </div>

          {/* Checkbox and Submit Button (unchanged) */}

          <div className="flex items-start leading-[27.04px] my-4 mb-8 h-5">
            <label className="flex items-start my-auto">
              <span className="flex mr-2 mt-2 md:mt-1.5">
                <input
                  type="checkbox"
                  name="checkbox"
                  {...form.getInputProps('agree')}
                  className="custom-checkbox cursor-pointer"
                />
              </span>
              <span className="text-gray-200 text-base">
                I agree with Zuri stores <Link href="/">Terms of Service</Link> & <Link href="/">Privacy Policy</Link>.
              </span>
            </label>
            <style jsx>{`
              .custom-checkbox {
                appearance: none;
                background-color: #fff;
                margin: 0;
                font: inherit;
                color: currentColor;
                width: 16px;
                height: 16px;
                border: 1px solid #009254;
                border-radius: 4px;
                transform: translateY(-0.075em);
                display: grid;
                place-content: center;
              }
              .custom-checkbox::before {
                content: '';
                width: 6.67px;
                height: 7.67px;
                border-radius: 2px;
                transform: scale(0);
                transition: 120ms transform ease-in-out;
                box-shadow: inset 1em 1em #009254;
              }
              .custom-checkbox:checked::before {
                transform: scale(1);
              }
            `}</style>
          </div>

          <Button
            intent="primary"
            size="sm"
            className="w-full h-14 text-lg rounded-lg mt-1"
            type="submit"
            disabled={form.values.agree === true ? false : true}
          >
            Continue
          </Button>
        </form>
        <div className="mt-6">
          <p className="text-center text-gray-200 text-base">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-green-primary hover:text-brand-green-hover">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

const usePasswordVisibility = (): [boolean, () => void] => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = (): void => {
    setIsVisible((prevVisible) => !prevVisible);
  };

  return [isVisible, toggleVisibility];
};

export default Guestsignupform;
