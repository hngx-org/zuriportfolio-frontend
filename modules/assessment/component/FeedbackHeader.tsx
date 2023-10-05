import React from 'react';
import baseImgg from '../../../public/assets/images/assbase.png';
import bubble from '../../../public/assets/images/bubble.png';
import Image from 'next/image';

const FeedbackHeader = () => {
  return (
    <div className=" flex h-[140px]  bg-brand-green-pressed justify-between">
      <div className=" flex flex-col text-white-100 justify-center pl-[96px]">
        <h1 className=" font-manropeB text-[32px]">Wireframe Challenge</h1>
        <p className=" text-[14px] font-manropeL">Design Assessment</p>
      </div>
      <div className="flex">
        <Image src={baseImgg} alt="stampbag" className=" mr-[137px]" />
        <Image src={bubble} alt="" width={139} className="pb-2" height={139} />
      </div>
    </div>
  );
};

export default FeedbackHeader;
