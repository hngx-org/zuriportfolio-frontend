import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { VendorCardProps } from '../../../@types';
import Starfill from '../../../public/assets/images/vendors/starfilled.png';
import Starempty from '../../../public/assets/images/vendors/starempty.png';
import Link from 'next/link';

function VendorCard({ vendorname, pic, name, price }: VendorCardProps): React.ReactElement {
  return (
    <div className="rounded-md p-4 border-custom-color32 border border-solid font-manropeA max-w-[250px]">
      <Image className="mb-4 rounded-lg max-h-[100%] min-w-[100%]" src={pic} alt="coursepic" />
      <div className="flex flex-col w-[230px] max-w-[100%] content-start">
        <p className="text-[0.65rem] md:text-[0.75rem] lg:text-[0.85rem] break-words w-[100%] max-w-[100%] text-green-850">
          {name}
        </p>
        <h2 className="font-bold text-green-850">{`$${price}`}</h2>
        <p className="text-custom-color15 font-semibold text-[0.65rem] md:text-[0.75rem] lg:text-[0.85rem] break-words w-[100%] max-w-[100%]">
          By:{' '}
          <Link href={'/'} className="underline">
            {vendorname}
          </Link>{' '}
        </p>
      </div>
      <div className="rating flex items-center gap-[2px] mt-6 w-[230px]">
        <Image src={Starfill} alt="star" className="w-[16px] h-[14px]" />
        <Image src={Starfill} alt="star" className="w-[16px] h-[14px]" />
        <Image src={Starfill} alt="star" className="w-[16px] h-[14px]" />
        <Image src={Starempty} alt="star" className="w-[16px] h-[14px]" />
        <Image src={Starempty} alt="star" className="w-[16px] h-[14px]" />
        <span className="font-bold text-custom-color15">(3)</span>
      </div>
    </div>
  );
}

export default VendorCard;
