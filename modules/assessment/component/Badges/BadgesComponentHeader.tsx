import React from 'react';
import Image from 'next/image';

const BadgesComponentHeader = () => {
  return (
    <>
      <div className="w-full h-[130px] bg-[#005427] px-[15px] sm:px-[68px] xl:px-[230px] flex items-center sm:justify-start  relative ">
        <div className="gap-[8px] flex flex-col ">
          <h1 className="text-[22px] sm:text-[32px] font-[600] text-white-100 leading-[36px] md:leading-[40px] tracking-normal lg:pr-[100px]">
            Keep tabs on all yours badges
          </h1>
          <p className="text-[14px] leading-[20px] font-[500] text-white-100">
            Start your journey and earn a badge today!
          </p>
        </div>
        <div className="absolute top-0 sm:hidden sm:top-0 right-0  mix-blend-burn lg:hidden block overflow-hidden">
          <Image
            src="/assets/images/badges/bannerexpertsmallbadge.svg"
            width={145}
            height={130}
            alt="expert badge image"
            priority={true}
          />
        </div>
        <div className="absolute right-[5%] md:right-[6%] hidden lg:block mix-blend-burn  overflow-hidden">
          <Image
            src="/assets/images/badges/expertbadgebanner.svg"
            width={430}
            height={30}
            alt="expert badge image"
            priority={true}
          />
        </div>
        <div className="absolute sm:top-0 right-0 hidden sm:block  mix-blend-burn lg:hidden overflow-hidden">
          <Image src="/assets/images/badges/bannerexpertbadge.png" width={181} height={130} alt="expert badge image" />
        </div>
      </div>
      r
    </>
  );
};

export default BadgesComponentHeader;
