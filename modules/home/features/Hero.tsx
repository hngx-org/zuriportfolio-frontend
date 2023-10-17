import Button from '@ui/Button';
import Image from 'next/image';
import heroIcon from '../../../public/assets/home/heroIcon.png';
import React from 'react';

interface Sections {
  title?: string;
  subtitle?: string;
  href?: string;
  slug?: string;
  desc?: React.ReactNode;
}

const HeroSection = ({ title, subtitle, href, slug, desc }: Sections) => {
  return (
    <div className="max-w-[1410px] mx-auto px-10 md:px-[90px] lg:px-24 space-y-14">
      <div className="flex justify-center items-center pt-10 md:pt-[110px] w-full px-0 flex-col">
        <div className="flex justify-around items-start space-y-10 md:space-y-0 w-full flex-col md:flex-row">
          <div className="w-full md:w-[50%] space-y-6">
            <p className="text-[#3F3F50] text-left font-manropeL text-[40px] lg:text-[48px] -mt-3 leading-[52px]">
              {title}
            </p>
          </div>
          <div className="w-[10%] hidden md:block"></div>
          <div className="w-full md:w-[40%]">{desc}</div>
        </div>
      </div>

      {/* Make child elements space between in flex and max width of parent */}
      <div className="flex justify-between items-center max-w-[1410px] mx-auto px-0">
        <div className="flex justify-start items-center max-w-full">
          <Button href={href} className="font-manropeL text-[16px] flex justify-center items-center rounded-md">
            {slug}
          </Button>
        </div>

        <div className="flex justify-end items-center  max-w-full">
          <Image src={heroIcon.src} alt="Hero Icon" width={40} height={60} className="md:-mt-10 md:w-[72px]" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
