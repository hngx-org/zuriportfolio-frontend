import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { VendorCardProps } from '../../../@types';
import Starfill from '../../../public/assets/images/vendors/starfilled.png';
import Starempty from '../../../public/assets/images/vendors/starempty.png';
import Link from 'next/link';

function VendorCard({ vendorname, pic, name, price }: VendorCardProps): React.ReactElement {
  return (
    <div className="rounded-md p-2 md:p-4 lg:p-4 border-custom-color32 border border-solid font-manropeEL max-w-[280px]">
      <Image className="mb-4 rounded-lg max-h-[100%] min-w-[100%]" src={pic} alt="coursepic" />
      <div className="flex flex-col w-[230px] max-w-[100%] content-start">
        <p className="text-[0.65rem] md:text-[0.75rem] lg:text-[0.85rem] truncate w-[100%] max-w-[100%] text-green-850">
          {name}
        </p>
        <h2 className="font-bold text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] text-green-850">{`$${price}`}</h2>
        <p className="text-custom-color15 font-semibold text-[0.65rem] md:text-[0.75rem] lg:text-[0.85rem] break-words w-[100%] max-w-[100%]">
          By:{' '}
          <Link href={'/'} className="underline">
            {vendorname}
          </Link>{' '}
        </p>
      </div>
      <div className="flex items-center gap-[1px] w-[100px] md:gap-[2px] lg:gap-[2px] mt-6 lg:w-[230px]">
        <Image
          src={Starfill}
          alt="star"
          className="md:w-[16px] w-[12px] lg:w-[16px] md:h-[14px] h-[10px] lg:h-[14px]"
        />
        <Image
          src={Starfill}
          alt="star"
          className="md:w-[16px] w-[12px] lg:w-[16px] md:h-[14px] h-[10px] lg:h-[14px]"
        />
        <Image
          src={Starfill}
          alt="star"
          className="md:w-[16px] w-[12px] lg:w-[16px] md:h-[14px] h-[10px] lg:h-[14px]"
        />
        <Image
          src={Starempty}
          alt="star"
          className="md:w-[16px] w-[12px] lg:w-[16px] md:h-[14px] h-[10px] lg:h-[14px]"
        />
        <Image
          src={Starempty}
          alt="star"
          className="md:w-[16px] w-[12px] lg:w-[16px] md:h-[14px] h-[10px] lg:h-[14px]"
        />
        <span className="font-bold text-[0.65rem] md:text-[0.75rem] lg:text-[0.85rem] text-custom-color15">(3)</span>
      </div>
    </div>
  );
}

export default VendorCard;
