import React from 'react';
import Image from 'next/image';

const ReviewFooter: React.FC = () => {
  return (
    <footer className="bg-green-400 text-white-100 h-[196px] w-full flex flex-col justify-center align-center font-manropeB">
      <div className="flex justify-center">
        <div className="flex justify-between w-10/12">
          <div>
            <div className="flex p-0">
              <Image src="/assets/reviews/review-navbar-icon.svg" height={12} width={12} alt="navbar logo" />
              <span className="text-2xl">TechVerse</span>
            </div>
            <div>
              <span className="text-[14px] text-100">by Mark Essien</span>
            </div>
          </div>
          <div className="flex justify-between items-center w-[469px] h-[24px]">
            <div className="flex justify-between w-[256px]">
              <p className="text-[14px] text-100 items-center flex"> Contact Us</p>
              <a
                href="mailto:info@techverse.com"
                className="  hover:underline no-underline text-[16px]	 flex items-center"
              >
                info@techverse.com
              </a>
            </div>
            <div className="flex justify-between w-[165px]">
              <p className="text-[14px] text-100 items-center flex"> Follow Us</p>
              <div className="flex items-center justify-between w-[84px]">
                <Image
                  className="h-[20px] w-[20px]"
                  src="/assets/reviews/twitter.svg"
                  height={12}
                  width={12}
                  alt="navbar logo"
                />
                <Image
                  className="h-[20px] w-[20px]"
                  src="/assets/reviews/instagram.svg"
                  height={12}
                  width={12}
                  alt="navbar logo"
                />
                <Image
                  className="h-[20px] w-[20px]"
                  src="/assets/reviews/github.svg"
                  height={12}
                  width={12}
                  alt="navbar logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs flex justify-center ">&copy;2023 Zuri, All rights reserved</p>
    </footer>
  );
};

export default ReviewFooter;
