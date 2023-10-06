import React from 'react';
import baseImgg from '../../../public/assets/images/assbase.png';
import bubble from '../../../public/assets/images/bubble.png';
import Image from 'next/image';

const FeedbackHeader = () => {
  return (
    <div className=" flex h-[92px] sm:h-[128px]  bg-brand-green-pressed justify-between relative overflow-hidden">
      <div className=" flex flex-col text-white-100 justify-center pl-6  sm:pl-[96px]">
        <h1 className=" font-manropeB text-[32px]">Wireframe Challenge</h1>
        <p className=" text-[14px] font-manropeL">Design Assessment</p>
      </div>
      <div className="absolute -bottom-8 sm:-bottom-4 right-2 sm:right-28 lg:right-72 lg:bottom-0">
        <Image src={baseImgg} alt="stampbag" width={200} height={200} />
      </div>
      <div className="absolute w-[52px] sm:w-[119px] -right-5 sm:-right-9 lg:right-0">
        <Image src={bubble} alt="bubble" width={139} height={139} />
      </div>
    </div>
  );
};

export default FeedbackHeader;
