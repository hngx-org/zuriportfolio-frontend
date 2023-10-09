import React from 'react';
import { Vendor } from '../../../../@types';
import { More } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';

const VendorLists: React.FC<Vendor> = ({
  vendorImgSrc,
  name,
  email,
  amount,
  quantity,
  date,
  statusIndicatorSrc,
  statusText,
}) => {
  // Determine the background color and text color based on the statusText
  let backgroundColorClass = '';
  let textColorClass = '';

  if (statusText === 'Active') {
    backgroundColorClass = 'bg-green-20';
    textColorClass = 'text-brand-green-primary';
  } else if (statusText === 'Deleted') {
    backgroundColorClass = 'bg-red-105';
    textColorClass = 'text-red-200';
  } else if (statusText === 'Banned') {
    backgroundColorClass = 'bg-yellow-50';
    textColorClass = 'text-yellow-600';
  }

  return (
    <div className="border-b border-white-115 border-solid py-5 px-5 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-1 items-center text-gray-500 text-center text-sm">
      <div className="flex items-center">
        <input type="checkbox" name="" id="" />

        <Link
          href={{
            pathname: '/super-admin/vendor-management/vendor-details',
            query: {
              // Vendor details as query parameters
              name,
              email,
              amount,
              quantity,
              date,
              statusIndicatorSrc,
              statusText,
            },
          }}
        >
          <div className="flex items-center">
            <Image src={vendorImgSrc} alt="" className="mx-2" width={40} height={40} />
            <div className="flex flex-col items-start text-left">
              <p className="text-base lg:text-lg font-bold text-black">{name}</p>
              <p className="text-sm md:text-xs lg:text-sm">{email}</p>
            </div>
          </div>
        </Link>
      </div>
      <p className="hidden md:block text-sm md:text-xs lg:text-sm">{amount}</p>
      <p className="hidden md:block text-sm md:text-xs lg:text-sm">{quantity}</p>
      <p className="hidden md:block text-sm md:text-xs lg:text-sm">{date}</p>
      <div
        className={`lg:flex items-center justify-center text-sm md:text-xs lg:text-sm rounded-full w-1/2 mx-auto py-1 px-2 ${backgroundColorClass} hidden`}
      >
        <Image src={statusIndicatorSrc} alt="" className="mr-2" width={5} height={5} />
        <p className={textColorClass}>{statusText}</p>
      </div>
      <div className="lg:flex items-center justify-center hidden">
        <More size="20" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default VendorLists;
