import Image from 'next/image';
import React from 'react';
import { AuthLayoutProps } from '../../../@types';
import LeftImage from '../../../public/assets/images/Rectangle_2.png';
import zuriPortfolioLogo from '../../../public//assets/images/logo/zuriportfolio-logo.svg';
import Link from 'next/link';

function AuthLayout({ children, authLeftImage, isTopRightBlobShown, isBottomLeftPadlockShown }: AuthLayoutProps) {
  return (
    <div className="relative  h-screen">
      {/* Header for screens less than 1024px */}
      <div className="border-b border-b-white-115 lg:hidden bg-white-100">
        <Link href="/" className="px-6 py-6 md:px-10">
          <Image src={zuriPortfolioLogo} alt="Zuri portfolio logo" className="w-[126px] h-[24px]" />
        </Link>
      </div>
      <div className=" px-6  lg:px-16 2xl:w-[1440px] xl:mx-auto">
        <div className=" h-screen grid grid-cols-1 gap-20 text-sm lg:flex">
          <div className=" py-12 hidden lg:block lg:w-3/5">
            <div className="h-full rounded-tr-[60px] rounded-bl-[60px] overflow-hidden ">
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
          </div>
          <div className="flex flex-col gap-16 lg:w-2/5 ">
            {/* Header for screens larger than 1024px */}
            <Link href="/" className="hidden pt-10 lg:block">
              <Image src={zuriPortfolioLogo} alt="Zuri portfolio logo" className="w-[178px] h-[36px]" />
            </Link>
            {/* give the element on the right of the container a max width of 672px, only on screen size less than 1024px */}
            {/* <div className="max-lg:max-w-2xl mx-auto lg:mx-0 w-full lg:pb-4">{children}</div> */}
            <div className=" mx-auto lg:mx-0 w-full mt-8 md:mt-20 lg:mt-0 lg:pb-4 lg:overflow-y-scroll scrollbar scrollbar-thumb-white scrollbar-track-white">
              {children}
            </div>
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
              className="absolute bottom-0 left-0 hidden md:block lg:hidden w-[170px] h-[170px] md:w-[200px] md:h-[200px] -z-[1]"
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
