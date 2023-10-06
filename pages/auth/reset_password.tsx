import { useState } from 'react';
import Image from 'next/image';
import AuthLayout from '../../modules/auth/component/AuthLayout';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Eye, EyeSlash } from 'iconsax-react';

function ResetPassword() {
  const [showPassword, setShowPassword] = useState([false, false]);
  const [passwordChanged, setPasswordChanged] = useState(false);
  return (
    <>
      <AuthLayout isTopRightBlobShown isBottomLeftPadlockShown={false}>
        <div className="">
          {!passwordChanged ? (
            <div className="flex flex-col gap-8 mt-10 lg:mt-0">
              <div className="flex flex-col gap-3 items-center lg:items-start text-center lg:text-left">
                <h1 className="font-manropeEB text-2xl md:text-4xl">Reset password</h1>
                <p className="font-manropeL lg:font-manropeB text-xs md:text-sm lg:text-[1.375rem] text-[#536066]">
                  Enter your new password below.
                </p>
              </div>
              <form className="flex flex-col gap-4" onSubmit={(e) => (e.preventDefault(), setPasswordChanged(true))}>
                <div className="flex flex-col gap-3">
                  <label htmlFor="reset_new_password" className="font-manropeB text-base font-semibold text-gray-700">
                    New password
                  </label>
                  <Input
                    id="reset_new_password"
                    name="reset_new_password"
                    type={showPassword[0] ? 'text' : 'password'}
                    isPasswordVisible={showPassword[0]}
                    className="h-[2.75rem] md:h-[3.75rem] w-full bg-transparent outline-none rounded-lg border border-gray-300 shadow-[0px,1px,2px,0px,rgba(16,24,40,0.05)] pl-3 text-gray-500 text-base font-manropeEL font-light"
                    placeHolder="new password"
                    rightIcon={
                      <div className="cursor-pointer" onClick={() => setShowPassword((prev) => [!prev[0], prev[1]])}>
                        {showPassword[0] ? <EyeSlash color="#464646" /> : <Eye color="#464646" />}
                      </div>
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="reset_confirm_password"
                    className="font-manropeB text-base font-semibold text-gray-700"
                  >
                    Confirm password
                  </label>
                  <Input
                    id="reset_confirm_password"
                    name="reset_confirm_password"
                    type={showPassword[1] ? 'text' : 'password'}
                    isPasswordVisible={showPassword[1]}
                    className="h-[2.75rem] md:h-[3.75rem] w-full bg-transparent outline-none rounded-lg border border-gray-300 shadow-[0px,1px,2px,0px,rgba(16,24,40,0.05)] pl-3 text-gray-500 text-base font-manropeEL font-light"
                    placeHolder="confirm password"
                    rightIcon={
                      <div className="cursor-pointer" onClick={() => setShowPassword((prev) => [prev[0], !prev[1]])}>
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
              <p className="font-manropeL lg:font-manropeB text-sm lg:text-[1.375rem] text-[#536066] w-[80%] md:w-[40%] lg:w-full">
                Your password has been successfully changed
              </p>
              <button className="w-full h-[3.25rem] md:h-[3.75rem] rounded-lg bg-brand-green-primary mt-8 font-manropeB text-base text-white-100">
                Login to account
              </button>
            </div>
          )}
        </div>
      </AuthLayout>
    </>
  );
}

export default ResetPassword;
