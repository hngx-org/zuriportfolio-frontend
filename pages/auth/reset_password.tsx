import { useState } from 'react';
import Image from 'next/image';

function ResetPassword() {
  const [passwordChanged, setPasswordChanged] = useState(false);
  return (
    <div className="py-8 h-screen">
      <div className="border-b border-b-gray-94 pb-8 w-full lg:hidden">
        <div className="container">
          <Image src={'/logo.svg'} alt="logo" width={11.125 * 16} height={2.25 * 16} className="" />
        </div>
      </div>
      <div className="container flex gap-12 justify-center">
        <div className="flex-1 hidden lg:flex">
          <Image
            src={'/authBanner.png'}
            alt=""
            width={42.5 * 16}
            height={56.25 * 16}
            className="object-cover h-full w-full rounded-tr-[3.75rem] rounded-bl-[3.75rem]"
          />
        </div>
        <div className="flex-1 mt-4 flex flex-col gap-14">
          {/* Logo */}
          <div className="hidden lg:flex">
            <Image src={'/logo.svg'} alt="logo" width={11.125 * 16} height={2.25 * 16} />
          </div>
          {!passwordChanged ? (
            <div className="flex flex-col gap-10 mt-20 lg:mt-0">
              <div className="flex flex-col gap-3 items-center lg:items-start text-center lg:text-start">
                <h1 className="font-manropeEB text-2xl md:text-4xl">Reset password</h1>
                <p className="font-manropeL lg:font-manropeB text-xs md:text-sm lg:text-[1.375rem] text-gray-50">
                  Enter your new password below.
                </p>
              </div>
              <form className="flex flex-col gap-5" onClick={(e) => (e.preventDefault(), setPasswordChanged(true))}>
                <div className="flex flex-col gap-3">
                  <label htmlFor="reset_new_password" className="font-manropeB text-base font-semibold text-gray-700">
                    New password
                  </label>
                  <input
                    id="reset_new_password"
                    type="password"
                    className="w-full h-[2.75rem] md:h-[3.75rem] rounded-lg border border-gray-300 shadow-[0px,1px,2px,0px,rgba(16,24,40,0.05)] outline-none pl-3 text-gray-500 text-base font-manropeEL font-light"
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
                  <input
                    id="reset_confirm_password"
                    type="password"
                    className="w-full h-[2.75rem] md:h-[3.75rem] rounded-lg border border-gray-300 shadow-[0px,1px,2px,0px,rgba(16,24,40,0.05)] outline-none pl-3 text-gray-500 text-base font-manropeEL font-light"
                    required
                  />
                </div>
                <button className="w-full h-[3.25rem] md:h-[3.75rem] rounded-lg bg-brand-green-primary mt-8 font-manropeB text-base text-white-100">
                  Change password
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center lg:items-start text-center lg:text-start gap-3">
              <div className="lg:hidden">
                <Image src={'/resetMask.png'} alt="reset_password_success" width={16.125 * 16} height={16.125 * 16} />
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
      </div>
    </div>
  );
}

export default ResetPassword;
