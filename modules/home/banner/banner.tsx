import Button from '@ui/Button';
import { ArrowRight } from 'iconsax-react';
import Link from 'next/link';
import React from 'react';

const Banner = () => {
  return (
    <div className="h-[56px] bg-blue-250 w-full flex justify-center items-center">
      <div className="flex justify-center items-center p-[10px]">
        <Button className=" hidden md:h-[30px] md:flex md:bg-green-200 md:rounded-[10px] md:hover:bg-green-200 md:mr-2 ">
          FEATURED
        </Button>
        <span className="text-[14px] font-manropeL text-center">Create a shop for all your Digital Products!</span>
        <Link href="/marketplace">
          <ArrowRight className="ml-2 mt-[1px]" color="#1A1C1F" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
