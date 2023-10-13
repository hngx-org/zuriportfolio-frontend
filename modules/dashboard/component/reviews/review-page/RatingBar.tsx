import React from 'react';
import Image from 'next/image';
import { RatingBarProps } from '../../../../../@types';
import star1 from '../../../../../public/assets/star1.svg';
import star2 from '../../../../../public/assets/star2.svg';

const RatingBar = ({ avgRating }: RatingBarProps) => {
  function getStars(avgRating: number) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (avgRating >= 1) {
        stars.push(<Image key={i} src={star1} alt="star" />);
      } else if (avgRating > 0) {
        stars.push(<Image key={i} src={star2} alt="star" />);
      } else {
        stars.push(<Image key={i} src={star2} alt="star" />);
      }
      avgRating--;
    }
    return stars;
  }

  return (
    <div className="lg:w-[316px] lg:h-[290.84px] md:h-48 md:w-[194px] w-[142px] h-[131px] border-[#D5DBDD] border-2 rounded-[13.4px] flex flex-col justify-center items-center content-center">
      <div className="items-center justify-center flex-col flex">
        <h1 className="lg:font-bold lg:leading-[52.33px] lg:text-[45.29px] font-ManropeB md:font-semibold md:text-4xl md:leading-[44px] font-bold leading-8 text-2xl">
          {avgRating.toFixed(1)}/5
        </h1>
        <span className="flex justify-center items-center lg:my-5 my-2 font-ManropeB lg:w-[21.8px] lg:h-[21.8px] md:h-5 md:w-5 h-4 w-4 ">
          {getStars(avgRating)}
        </span>
        <p className="font-Manrope lg:font-[16.1px] lg:leading-[24.15px] md:leading-6 md:text-base text-sm leading-4 tracking-tight">
          12,000 verified users
        </p>
      </div>
    </div>
  );
};

export default RatingBar;
