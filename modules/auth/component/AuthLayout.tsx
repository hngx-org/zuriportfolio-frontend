import Image from 'next/image';
import React from 'react';
import { AuthLayoutProps } from '../../../@types';

function AuthLayout({ children, authLeftImage, isTopRightBlobShown, isBottomLeftPadlockShown }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <div className="border-b border-b-gray-100 lg:hidden bg-[#fff]">
        <div className="px-4 py-4">
          <Image width={100} height={100} src="/assets/images/logo/zuriportfolio-logo.svg" alt="Zuri portfolio logo" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-20 pt-10 md:pt-16 pb-24 px-4 overflow-y-auto text-sm lg:pr-24 lg:pl-16 w-full lg:h-screen lg:grid-cols-2">
        <div className="w-full h-full rounded-tr-[60px] rounded-bl-[60px] overflow-hidden hidden lg:block">
          {authLeftImage ?? (
            <Image
              width={100}
              height={100}
              src="/assets/images/zuri-auth-signup-email-left-image.png"
              alt="Sign up image"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-16">
          <div className="hidden lg:block">
            <Image
              width={200}
              height={200}
              src="/assets/images/logo/zuriportfolio-logo.svg"
              alt="Zuri portfolio logo"
            />
          </div>
          <div className="max-w-xl mx-auto w-full">{children}</div>
        </div>

        {/* the blob and padlock images */}
        {/* blob image */}
        {isTopRightBlobShown && (
          <Image
            width={200}
            height={200}
            className=" absolute top-0 right-0 hidden md:block md:w-[200px] md:h-[200px] -z-[1]"
            src="/assets/images/blob-os.svg"
            alt=""
          />
        )}

        {/* padlock image */}
        {isBottomLeftPadlockShown && (
          <Image
            width={200}
            height={200}
            className="absolute bottom-0 left-0 w-[170px] h-[170px] md:w-[200px] md:h-[200px] -z-[1]"
            src="/assets/images/unlock-os.svg"
            alt=""
          />
        )}
      </div>
    </div>
  );
}

export default AuthLayout;
