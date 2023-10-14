import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RatingCardProps } from '../../../../../@types';

const RatingCard = ({ rating, users }: RatingCardProps) => {
  const [volume, setVolume] = useState<number>(40);

  useEffect(() => {
    if (users >= 50) {
      setVolume(50);
    } else {
      setVolume(Math.floor((users / 4) * 50));
    }
  }, [users]);

  return (
    <div className="min-w-[194px] max-w-[full] justify-center">
      <div className="w-full justify-between flex items-center">
        <div className="flex md:pr-7 px-3 md:px-0 flex-row">
          <p className="text-[11.52px] leading-[15.36px] md:text-[11.82px] md:leading-[15.76px] lg:text-base lg:leading-6 font-ManropeB font-semibold">
            {rating}
          </p>
          <Image src="/assets/star1.svg" alt="star" width={16.75} height={15.96} className="" />
          <p className="text-[11.52px] leading-[15.36px] md:text-[11.82px] md:leading-[15.76px] lg:text-base lg:leading-6 font-ManropeB font-semibold">
            ({users})
          </p>
        </div>
        <div className="flex items-center lg:w-[212px] lg:h-3 my-2 rounded-[9.76px] md:w-[130.55px] md:h-[7.39px] w-[127px] h-[7px]">
          <input
            type="range"
            id="volumeRange"
            min="0"
            max="50"
            step="1"
            value={volume}
            className="bg-stone-300 [&::-webkit-slider-thumb]:appearance-none h-3 rounded-2xl w-full appearance-none"
            style={{
              background: `linear-gradient(to right, #E5B800 0%, #E5B800 ${(volume / 50) * 100}%, #D5DBDD ${
                (volume / 50) * 100
              }%, #D5DBDD 100%)`,
            }}
            onChange={(e) => null}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
