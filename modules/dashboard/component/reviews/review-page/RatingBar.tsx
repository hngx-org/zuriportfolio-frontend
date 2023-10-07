import React from 'react';
import Image from 'next/image';
import star1 from '../../../../../public/assets/star1.svg';
import star2 from '../../../../../public/assets/star2.svg';

interface RatingProps {
  avgRating: number;
}

const RatingBar: React.FC<RatingProps> = ({ avgRating }) => {
  function getStars(avgRating: number) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (avgRating >= 1) {
        stars.push(<Image key={i} src={star1} alt="star" width={16} height={16} />);
      } else if (avgRating > 0) {
        stars.push(<Image key={i} src={star2} alt="star" width={16} height={16} />);
      } else {
        stars.push(<Image key={i} src={star2} alt="star" width={16} height={16} />);
      }
      avgRating--;
    }
    return stars;
  }

  return (
    <div className="min-w-max max-w-full min-h-[max] max-h-[full] py-[32px] px-[24.15px] border-2 border-gray-300 rounded-3xl flex flex-col justify-center">
      <div className="text-center flex flex-col gap-y-5">
        <h1 className="text-[45.29px] font-bold">{avgRating.toFixed(1)} / 5</h1>
        <span className="flex justify-center">{getStars(avgRating)}</span>
        <p className="text-[16.1px]">12,000 verified users</p>
      </div>
    </div>
  );
};

export default RatingBar;
