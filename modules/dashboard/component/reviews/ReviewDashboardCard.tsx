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
      <div className="flex font-manropeL text-dark-100 tracking-wide border-b border-brand-disabled pb-6">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <Link href="#" className="flex justify-center h-auto w-full md:w-[162.5px]">
            <Image src={imageSrc} alt={title} width={327} height={180} objectFit="contain" />
          </Link>
          <div className="w-full">
            <div className="flex flex-row md:justify-between">
              <div className="flex flex-col gap-1">
                <Link href="#">
                  <h4 className="font-manropeEB text-xs font-bold md:text-base hover:underline">{title}</h4>
                </Link>
                <div className="flex">
                  <Link href="#" className="text-xs hover:underline">
                    By {author}
                  </Link>
                </div>
                <span className="flex flex-row md:gap-6 gap-1 text-[10px] md:text-xs">
                  <span className="font-manropeB">{avgRating}</span>
                  <span className="flex flex-row align-middle h-[12px] md:h-4">{getStars(avgRating)}</span>
                  <span>({ratingNo}) Ratings</span>
                </span>
                <div className="hidden md:block font-manropeB font-bold text-brand-green-pressed text-sm">
                  {formatToNigerianNaira(price)}
                </div>
              </div>
              <Link
                href={`/dashboard/reviews/${id}`}
                className="flex justify-end text-sm md:text-base font-manropeB text-brand-green-pressed h-5 w-36"
              >
                <p className="hover:text-green-200">View reviews</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewDashboardCard;
