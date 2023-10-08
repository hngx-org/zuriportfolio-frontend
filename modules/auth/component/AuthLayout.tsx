import Image from 'next/image';
import React from 'react';
import { AuthLayoutProps } from '../../../@types';
import LeftImage from '../../../public/assets/images/Rectangle_2.png';
import zuriPortfolioLogo from '../../../public//assets/images/logo/zuriportfolio-logo.svg';

function AuthLayout({ children, authLeftImage, isTopRightBlobShown, isBottomLeftPadlockShown }: AuthLayoutProps) {
  return (
    <div className="relative  min-h-screen">
      {/* Header for screens less than 1024px */}
      <div className="border-b border-b-gray-100 lg:hidden bg-white-100">
        <div className="px-6 py-6 md:px-10">
          <Image src={zuriPortfolioLogo} alt="Zuri portfolio logo" className="w-[126px] h-[24px]" />
        </div>
      </div>
      <div className="py-10 px-6 md:py-12 lg:px-16 xl:w-[1280px] xl:mx-auto">
        <div className="grid grid-cols-1 gap-20 text-sm lg:flex">
          <div className="min-h-full rounded-tr-[60px] rounded-bl-[60px] overflow-hidden hidden lg:block lg:w-3/5">
            {authLeftImage ?? (
              <Image
                // width={100}
                // height={100}
                src={LeftImage}
                priority={true}
                alt="Sign up image"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-16 lg:w-2/5">
            {/* Header for screens larger than 1024px */}
            <div className="hidden lg:block">
              <Image src={zuriPortfolioLogo} alt="Zuri portfolio logo" className="w-[178px] h-[36px]" />
            </div>
            {/* give the element on the right of the container a max width of 672px, only on screen size less than 1024px */}
            <div className="max-lg:max-w-2xl mx-auto lg:mx-0 w-full lg:pb-4">{children}</div>
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
    </div>
  );
}

export default AuthLayout;
