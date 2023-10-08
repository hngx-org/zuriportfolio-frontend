import React from 'react';
import Image from 'next/image';
import { RatingCardProps } from '../../../../../@types';

const RatingCard = ({ rating, users }: RatingCardProps) => {
  return (
    <div className="min-w-[194px] max-w-[full] justify-center">
      <div className=" w-full justify-between flex items-center">
        <div className="flex min-w-[55px]">
          <p className="text-[16px] font-bold">{rating}</p>
          <Image src="/assets/star1.svg" alt="star" width={16.75} height={15.96} />
          <p className="text-[14px]">({users})</p>
        </div>
        <div className="flex items-center w-[77%]">
          <div className="bg-stone-300 h-3 rounded-2xl w-full">
            <div className="h-full bg-yellow-500 w-1/2 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
