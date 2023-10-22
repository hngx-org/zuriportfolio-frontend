import React from 'react';
import Image from 'next/image';

const BadgesComponentHeader = () => {
  return (
    <>
      <div className="w-full h-[130px] bg-[#005427] px-[15px] sm:px-[68px] xl:px-[100px] flex items-center sm:justify-start md:justify-between relative ">
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
        <div className="absolute block sm:hidden top-0 left-0 overflow-hidden">
          <Image
            src="/assets/images/badges/smallscreenexpertfloatingbadge.png"
            width={35}
            height={44}
            alt="expert badge image"
          />
        </div>
        <div className="absolute bottom-0 hidden sm:block sm:right-[20%] md:right-[10%] lg:right-[30%] mix-blend-hard-light ">
          <Image
            src="/assets/images/badges/bannerintermediatebadge.svg"
            width={290}
            height={30}
            alt="expert badge image"
          />
        </div>
        <div className="absolute top-[-20px] sm:top-0 right-0 hidden lg:block">
          <Image
            src="/assets/images/badges/bannerbeginnerbadge.png"
            width={160}
            height={128}
            alt="expert badge image"
          />
        </div>
        <div className="absolute bottom-0 hidden sm:block sm:right-[20%] md:right-[10%] lg:right-[30%] mix-blend-hard-light ">
          <Image
            src="/assets/images/badges/bannerintermediatebadge.svg"
            width={290}
            height={30}
            alt="expert badge image"
          />
        </div>
        <div className="absolute top-[-20px] sm:top-0 right-0 hidden lg:block">
          <Image
            src="/assets/images/badges/bannerbeginnerbadge.png"
            width={160}
            height={128}
            alt="expert badge image"
          />
        </div>
        <div className="absolute bottom-0 right-0 block sm:hidden mix-blend-hard-light ">
          <Image
            src="/assets/images/badges/bannerintermediatesmallbadge.svg"
            width={100}
            height={30}
            alt="expert badge image"
            priority={true}
          />
        </div>
        <div className="absolute top-[-20px] sm:top-0 right-0 hidden lg:block">
          <Image
            src="/assets/images/badges/bannerbeginnerbadge.png"
            width={160}
            height={128}
            alt="expert badge image"
          />
        </div>
        <div className="absolute bottom-0 right-0 block sm:hidden mix-blend-hard-light ">
          <Image
            src="/assets/images/badges/bannerintermediatesmallbadge.svg"
            width={100}
            height={30}
            alt="expert badge image"
            priority={true}
          />
        </div>
      </div>
    </>
  );
};

export default BadgesComponentHeader;
