import { FC } from 'react';
import Image from 'next/image';

export interface BannerProps {
  title: string;
  subtitle: string;
  bannerImageSrc: string;
}

export const AssessmentBanner: FC<BannerProps> = ({ title, subtitle, bannerImageSrc }) => {
  return (
    <div className="w-full bg-[#005427] py-[14px] md:py-[22px] lg:py-[32px] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 flex flex-col gap-1">
        <p className="font-manropeL text-white-100 text-[24px] md:text-[26px] lg:text-[28px]">{title}</p>

        <p className="font-manropeL text-white-100 text-[12px] lg:text-[14px]">{subtitle}</p>
      </div>

      <div className="w-[60%] md:w-[35%] lg:w-[50%] h-full absolute top-0 md:right-0 bottom-0 right-[-30%]">
        <Image alt="banner" src={bannerImageSrc} width={0} height={0} className="w-full h-full object-fill" />
      </div>
    </div>
  );
};
