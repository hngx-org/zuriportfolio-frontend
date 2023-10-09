import { useState } from 'react';
import Image from 'next/image';
import AuthLayout from '../../modules/auth/component/AuthLayout';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Eye, EyeSlash } from 'iconsax-react';

function ResetPassword() {
  const [showPassword, setShowPassword] = useState([false, false]); // an array of states to manage the visibility of each password (new password, confirm password).
  const [passwordChanged, setPasswordChanged] = useState(false); // state to manage the success of passsword reset
  return (
    <AuthLayout isTopRightBlobShown isBottomLeftPadlockShown={false}>
      <div className="">
        {/* Show the password reset form initially, and update the view after successful password reset */}
        {!passwordChanged ? (
          <div className="flex flex-col gap-8 lg:gap-12 mt-10 lg:mt-0">
            <div className="flex flex-col gap-2 md:gap-4 items-center lg:items-start text-center lg:text-left">
              <h1 className="font-manropeEB text-2xl md:text-4xl">Reset password</h1>
              <p className="font-manropeL lg:font-manropeB text-xs md:text-sm lg:text-[1.375rem] text-custom-color20">
                Enter your new password below.
              </p>
            </div>
            <form
              className="flex flex-col gap-4 lg:mb-16 2xl:mb-0"
              onSubmit={(e) => (e.preventDefault(), setPasswordChanged(true))}
            >
              <div className="flex flex-col gap-3">
                <label htmlFor="reset_new_password" className="font-manropeB text-base font-semibold text-slate-300">
                  New password
                </label>
                <Input
                  id="reset_new_password"
                  name="reset_new_password"
                  type={showPassword[0] ? 'text' : 'password'} // Change the input type dynamically based on the visibility state.
                  // isPasswordVisible={showPassword[0]} // Pass the visibility state as a prop
                  className="h-[2.75rem] md:h-[3.75rem] w-full bg-transparent outline-none rounded-lg border border-gray-300 shadow-[0px,1px,2px,0px,rgba(16,24,40,0.05)] pl-3 text-custom-color2 text-base font-manropeEL font-light"
                  placeHolder="new password"
                  rightIcon={
                    <div className="cursor-pointer" onClick={() => setShowPassword((prev) => [!prev[0], prev[1]])}>
                      {/* Update the icon based on the visibility state of the password. */}
                      {showPassword[0] ? <EyeSlash color="#464646" /> : <Eye color="#464646" />}
                    </div>
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="reset_confirm_password"
                  className="font-manropeB text-base font-semibold text-slate-300"
                >
                  Confirm password
                </label>
                <Input
                  id="reset_confirm_password"
                  name="reset_confirm_password"
                  type={showPassword[1] ? 'text' : 'password'} // Change the input type dynamically based on the visibility state.
                  // isPasswordVisible={showPassword[1]} // Pass the visibility state as a prop
                  className="h-[2.75rem] md:h-[3.75rem] w-full bg-transparent outline-none rounded-lg border border-gray-300 shadow-[0px,1px,2px,0px,rgba(16,24,40,0.05)] pl-3 text-custom-color2 text-base font-manropeEL font-light"
                  placeHolder="confirm password"
                  rightIcon={
                    <div className="cursor-pointer" onClick={() => setShowPassword((prev) => [prev[0], !prev[1]])}>
                      {/* Update the icon based on the visibility state of the password. */}
                      {showPassword[1] ? <EyeSlash color="#464646" /> : <Eye color="#464646" />}
                    </div>
                  }
                  required
                />
              </div>
              <Button className="w-full h-[3.25rem] md:h-[3.75rem] rounded-lg bg-brand-green-primary mt-5 font-manropeB text-base text-white-100">
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
            <p className="font-manropeL lg:font-manropeB text-sm lg:text-[1.375rem] text-custom-color20 w-[80%] md:w-[40%] lg:w-full">
              Your password has been successfully changed
            </p>
            <Button
              href="/auth/login"
              className="w-full h-[3.25rem] md:h-[3.75rem] rounded-lg bg-brand-green-primary mt-8 font-manropeB text-base text-white-100"
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
