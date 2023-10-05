import Image from 'next/image';
import React from 'react';

function SignupLayout({ children, authLeftImage }: { children: React.ReactNode, authLeftImage?: React.ReactNode }) {
  return (
    <>
      <div className="border-b border-b-gray-100 lg:hidden">
        <div className="px-4 py-4">
          <Image width={100} height={100} src="/assets/images/logo/zuriportfolio-logo.svg" alt="Zuri portfolio logo" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-20 pt-10 md:pt-16 pb-24 px-4 overflow-y-auto text-sm lg:pr-24 lg:pl-16 w-full lg:h-screen lg:grid-cols-2">
        <div className="w-full h-full rounded-tr-[60px] rounded-bl-[60px] overflow-hidden hidden lg:block">
          {authLeftImage ?? <Image
            width={100}
            height={100}
            src="/assets/images/zuri-auth-signup-email-left-image.png"
            alt="Sign up image"
            className="w-full h-full object-cover"
          />}
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
      </div>
    </>
  );
}

export default SignupLayout;
