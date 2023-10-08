import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ReviewCardProps } from '../../../../@types';
import star1 from '../../../../public/assets/star1.svg';
import star2 from '../../../../public/assets/star2.svg';

function ReviewDashboardCard({ id, className, imageSrc, title, author, avgRating, ratingNo, price }: ReviewCardProps) {
  function formatPrice(price: number) {
    let strPrice = price.toString().split('');
    let formattedPrice = '';
    for (let i = 0; i < strPrice.length; i++) {
      if ((strPrice.length - i) % 3 === 0 && i !== 0) {
        formattedPrice += ',';
      }
      formattedPrice += strPrice[i];
    }
    return formattedPrice;
  }

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
      <div className="flex flex-row justify-between w-full font-manropeL text-dark-100 tracking-wide border-b border-brand-disabled pb-10">
        <div className="flex gap-6">
          <div>
            <Image src={imageSrc} alt={title} width={162.5} height={100} />
          </div>
          <div className="flex flex-col justify-between">
            <h4 className="font-manropeEB text-base">{title}</h4>
            <div className="text-sm">By {author}</div>
            <span className="flex flex-row gap-6 text-sm">
              <span className="font-manropeB">{avgRating}</span>
              <span className="flex flex-row">{getStars(avgRating)}</span>
              <span>({ratingNo}) Ratings</span>
            </span>
            <div className="font-manropeB text-brand-green-pressed text-sm">&#8358;{formatPrice(price)}</div>
          </div>
        </div>
        <Link href={`/dashboard/reviews/${id}`} className="flex text-base font-manropeB text-brand-green-pressed h-0">
          View reviews
        </Link>
      </div>
    </div>
  );
}

export default ReviewDashboardCard;
