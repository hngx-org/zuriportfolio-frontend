import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatToNigerianNaira } from '../../../../helpers/formatCurrency';
import { ReviewCardProps } from '../../../../@types';
import star1 from '../../../../public/assets/star1.svg';
import star2 from '../../../../public/assets/star2.svg';

function ReviewDashboardCard({ id, className, imageSrc, title, author, avgRating, ratingNo, price }: ReviewCardProps) {
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
    <div className={className}>
      <div className="flex md:flex-row gap-6 flex-col justify-between w-full font-manropeL text-dark-100 tracking-wide border-b border-brand-disabled pb-10">
        <div className="flex gap-6">
          <div>
            <Image src={imageSrc} alt={title} width={162.5} height={100} />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <h4 className="font-manropeEB text-base">{title}</h4>
            <div className="text-sm">By {author}</div>
            <span className="flex lg:flex-row flex-col lg:gap-6 gap-2 text-sm">
              <span className="flex flex-row lg:gap-6 gap-2">
                <span className="font-manropeB">{avgRating}</span>
                <span className="flex flex-row">{getStars(avgRating)}</span>
              </span>
              <span>({ratingNo}) Ratings</span>
            </span>
            <div className="font-manropeB text-brand-green-pressed text-sm">{formatToNigerianNaira(price)}</div>
          </div>
        </div>
        <Link
          href={`/dashboard/reviews/${id}`}
          className="flex justify-end text-base font-manropeB text-brand-green-pressed h-0"
        >
          View reviews
        </Link>
      </div>
    </div>
  );
}

export default ReviewDashboardCard;
