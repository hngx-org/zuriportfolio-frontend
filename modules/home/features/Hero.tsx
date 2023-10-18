import Button from '@ui/Button';
import Image from 'next/image';
import heroIcon from '../../../public/assets/home/heroIcon.webp';
import React from 'react';

interface Sections {
  title?: string;
  subtitle?: string;
  badge?: string;
  href?: string;
  slug?: string;
  desc?: React.ReactNode;
  bottom?: boolean;
  button?: boolean;
}

const HeroSection = ({ title, subtitle, href, slug, desc, badge, bottom = true, button = true }: Sections) => {
  return (
    <div
      className={`max-w-[1410px] ${
        (bottom && button) || (!bottom && button) ? 'mx-auto' : 'mr-auto'
      } px-10 md:px-[90px] lg:px-24 space-y-14`}
    >
      <div className="flex justify-center items-center pt-10 md:pt-[110px] w-full px-0 flex-col">
        <div className="flex justify-start items-center w-full mb-10">
          {badge && (
            <div className="w-fit p-4 h-[20px] text-[16px] flex font-manropeB justify-start items-center bg-[#EBFEF6] rounded-[20px]  mr-2 ">
              {badge}
            </div>
          )}
        </div>
        <div
          className={`flex justify-around items-start space-y-10 md:space-y-0 w-full flex-col ${
            (bottom && button) || (!bottom && button) ? 'md:flex-row' : ''
          }`}
        >
          <div className={`${bottom && button && 'md:w-[60%]'} w-full space-y-6`}>
            <p className=" text-left font-manropeL text-[40px] lg:text-[48px] -mt-3 leading-[52px]">{title}</p>
            <p className=" text-left font-manropeL text-[16px] leading-[24px] ">{subtitle}</p>
            {button && (
              <Button
                href={href}
                className={`font-manropeL text-[16px] ${bottom && 'hidden'} ${
                  !bottom && 'flex md:hidden'
                } justify-center items-center rounded-md`}
              >
                {slug}
              </Button>
            )}
          </div>
          <div className="w-[10%] hidden md:block"></div>
          <div className={`w-full md:w-[40%] ${!bottom && 'flex justify-center md:block'}`}>{desc}</div>
        </div>
      </div>

      {/* Make child elements space between in flex and max width of parent */}
      <div className="flex justify-between items-center max-w-[1410px] mx-auto px-0">
        <div className="flex justify-start items-center max-w-full">
          {button && (
            <Button
              href={href}
              className={`font-manropeL text-[16px] ${
                !bottom && 'hidden'
              } justify-center items-center rounded-md md:flex`}
            >
              {slug}
            </Button>
          )}
        </div>

        <div className="flex justify-end items-center  max-w-full">
          {bottom && (
            <Image src={heroIcon.src} alt="Hero Icon" width={40} height={60} className="md:-mt-10 md:w-[72px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
