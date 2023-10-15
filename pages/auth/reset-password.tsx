import { useState } from 'react';
import Image from 'next/image';
import AuthLayout from '../../modules/auth/component/AuthLayout';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Eye, EyeSlash } from 'iconsax-react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import PasswordPopover from '@modules/auth/component/PasswordPopover';
import { resetPassword } from '../../http/auth';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { notify } from '@ui/Toast';
import { useRouter } from 'next/router';

const notifyError = (message: string) => notify({ type: 'error', message, theme: 'light' });

function ResetPassword() {
  const [showPassword, setShowPassword] = useState([false, false]); // an array of states to manage the visibility of each password (new password, confirm password).
  const [passwordChanged, setPasswordChanged] = useState(false); // state to manage the success of passsword reset

  const router = useRouter();
  const { token } = router.query; // Get the token after the user is redirected.

  const onResetPasswordError = (error: any) => {
    // Handle different error scenarios and display relevant error messages for each situation.
    console.log(error.message);
    if (error.message === 'AxiosError: timeout of 30000ms exceeded') {
      const timeoutErrorMessage =
        'Oops! The request timed out. Please try again later. If the problem persists, please contact support.';
      notifyError(timeoutErrorMessage);
      return;
    } else if (error.message === 'AxiosError: Network Error') {
      const networkErrorMessage = 'Oops! Looks like there was a network error. Please give it another try later.';
      notifyError(networkErrorMessage);
      return;
    }
    const errorMessage =
      'Oops! An error occurred. Please request another forgot password email or click the mail button again to redirect you to this page. If the issue persists, reach out to support.';
    notifyError(errorMessage);
  };

  // Hook for making an API call and handling the response
  const { mutate, isLoading } = useAuthMutation(resetPassword, {
    onSuccess: (data) => {
      if (data.status === 200) {
        setPasswordChanged(true);
        return;
      }

      notify({
        message: data?.message,
        type: 'error',
      });
    },
    onError: (error: any) => onResetPasswordError(error),
  });

  // inputs validation
  const schema = z
    .object({
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
      password: '',
      confirmPassword: '',
    },
  });

  // handle form submission
  const handleResetPassword = (values: any) => {
    console.log('password', values.password);
    console.log('confirmPassword', values.confirmPassword);
    mutate({ token: token, password: values.password });
  };

  return (
    <AuthLayout isTopRightBlobShown isBottomLeftPadlockShown={false}>
      <div className="">
        {/* Show the password reset form initially, and update the view after successful password reset */}
        {!passwordChanged ? (
          <div className="flex flex-col gap-8 lg:gap-12 mt-10 lg:mt-0">
            <div className="flex flex-col gap-2 md:gap-4 items-center lg:items-start text-center lg:text-left">
              <h1 className="font-manropeEB text-2xl md:text-4xl">Reset password</h1>
              <p className="font-manropeL font-semibold text-xs md:text-sm lg:text-[1.375rem] text-custom-color20  leading-[28px]">
                Enter your new password below.
              </p>
            </div>
            <form className="flex flex-col gap-4" onSubmit={form.onSubmit((values) => handleResetPassword(values))}>
              {/* Password */}
              <div className="space-y-3">
                <label htmlFor="password" className="font-manropeB text-base font-semibold text-slate-300">
                  New password
                </label>
                <PasswordPopover password={form.values.password}>
                  <Input
                    id="password"
                    {...form.getInputProps('password')}
                    type={showPassword[0] ? 'text' : 'password'} // Change the input type dynamically based on the visibility state.
                    // isPasswordVisible={showPassword[0]} // Pass the visibility state as a prop
                    className={`w-full h-[44px] md:h-[60px] border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${
                      form.errors.password ? 'border-red-200' : ''
                    }`}
                    placeHolder="enter password"
                    rightIcon={
                      <div className="cursor-pointer" onClick={() => setShowPassword((prev) => [!prev[0], prev[1]])}>
                        {/* Update the icon based on the visibility state of the password. */}
                        {showPassword[0] ? <EyeSlash color="#464646" /> : <Eye color="#464646" />}
                      </div>
                    }
                  />
                </PasswordPopover>
                <p className="text-[red] text-xs">{form.errors.password && form.errors.password}</p>
              </div>
              {/* Confirm Password */}
              <div className="space-y-3">
                <label htmlFor="confirmPassword" className="font-manropeB text-base font-semibold text-slate-300">
                  Confirm password
                </label>
                <Input
                  id="confirmPassword"
                  {...form.getInputProps('confirmPassword')}
                  type={showPassword[1] ? 'text' : 'password'} // Change the input type dynamically based on the visibility state.
                  // isPasswordVisible={showPassword[1]} // Pass the visibility state as a prop
                  className={`w-full h-[44px] md:h-[60px] border shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${
                    form.errors.confirmPassword ? 'border-red-200' : ''
                  }`}
                  placeHolder="enter confirm password"
                  rightIcon={
                    <div className="cursor-pointer" onClick={() => setShowPassword((prev) => [prev[0], !prev[1]])}>
                      {/* Update the icon based on the visibility state of the password. */}
                      {showPassword[1] ? <EyeSlash color="#464646" /> : <Eye color="#464646" />}
                    </div>
                  }
                />
                <p className="text-[red] text-xs">{form.errors.confirmPassword && form.errors.confirmPassword}</p>
              </div>
              <Button
                intent={'primary'}
                isLoading={isLoading}
                className="w-full h-[3.25rem] md:h-[3.75rem] mt-5 rounded-lg"
                type="submit"
              >
                Change password
              </Button>
            </form>
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center lg:items-start text-center lg:text-start gap-3">
            <div className="lg:hidden">
              <Image
                src={'/assets/images/reset-mask.png'}
                alt="reset_password_success"
                width={16.125 * 16}
                height={16.125 * 16}
              />
            </div>
            <h2 className="font-manropeEB text-2xl md:text-4xl">Password changed</h2>
            <p className="font-manropeL lg:font-manropeB text-sm lg:text-[1.375rem] text-custom-color20 w-[80%] md:w-[40%] lg:w-full mt-2 leading-7">
              Your password has been successfully changed
            </p>
            <Button
              href="/auth/login" // redirect the user to the login page after successful password reset
              intent={'primary'}
              className="w-full h-[3.25rem] md:h-[3.75rem] rounded-lg mt-8"
            >
              Login to account
            </Button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

export default ResetPassword;
