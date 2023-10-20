import { ArrowRight } from 'iconsax-react';
import Link from 'next/link';
import React from 'react';

const Banner = () => {
  return (
    <div className="h-[56px] bg-blue-250 w-full flex justify-center items-center">
      <div className="flex justify-center items-center p-[10px]">
        <div className=" hidden text-white-100 p-4 md:h-[30px] md:flex md:justify-center md:items-center md:bg-green-200 md:rounded-[10px] md:hover:bg-green-200 md:mr-2 font-manropeEB">
          FEATURED
        </div>
        <span className="text-[14px] font-manropeL text-center">
          Need to find a talent for your Projects? Click here!
        </span>
        <Link href="/explore">
          <ArrowRight className="ml-2 -mt-[1px]" color="#1A1C1F" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
