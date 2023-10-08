import Image from 'next/image';
import React from 'react';
import { AuthLayoutProps } from '../../../@types';
import LeftImage from '../../../public/assets/images/Rectangle_2.png';

function AuthLayout({ children, authLeftImage, isTopRightBlobShown, isBottomLeftPadlockShown }: AuthLayoutProps) {
  return (
    <div className="relative  min-h-screen ">
      {/* Header for screens less than 1024px */}
      <div className="border-b border-b-gray-100 lg:hidden bg-white-100">
        <div className="px-4 py-4">
          <Image width={150} height={150} src="/assets/images/logo/zuriportfolio-logo.svg" alt="Zuri portfolio logo" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-20 xl:gap-20 pt-10 md:pt-12 md:py-12 pb-10 px-8 overflow-y-auto text-sm xl:flex xl:flex-row xl:justify-center lg:r-24 lg:pl-16 lg:h-screen lg:grid-cols-2">
        <div className="h-full rounded-tr-[60px] rounded-bl-[60px] overflow-hidden hidden lg:flex ">
          {authLeftImage ?? (
            <Image
              // width={100}
              // height={100}
              src={LeftImage}
              priority={true}
              alt="Sign up image"
              className="w-full xl:w-[680px] h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-16 lg:max-w-lg xl:w-2/4 md:pr-5">
          {/* header for screens larger than 1024px */}
          <div className="hidden lg:block">
            <Image
              width={200}
              height={200}
              src="/assets/images/logo/zuriportfolio-logo.svg"
              alt="Zuri portfolio logo"
            />
          </div>
          {/* give the element on the right of the container a max width of 672px, only on screen size less than 1024px */}
          <div className="max-lg:max-w-2xl mx-auto lg:mx-0 w-full">{children}</div>
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
