import React from 'react';
import Button from '@ui/Button';
import { Like, Like1, LikeTag } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { reviewProps } from '../../../../../@types';
import star1 from '../../../../../public/assets/star1.svg';
import star2 from '../../../../../public/assets/star2.svg';

export default function Review(props: reviewProps) {
  function getStars(rating: number) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        stars.push(<Image key={i} src={star1} alt="star" width={24} height={24} />);
      } else if (rating > 0) {
        stars.push(<Image key={i} src={star2} alt="star" width={24} height={24} />);
      } else {
        stars.push(<Image key={i} src={star2} alt="star" width={24} height={24} />);
      }
      rating--;
    }
    return stars;
  }

  return (
    <div className=" w-full m-0 font-manrope p-0">
      <div className="border-b w-full m-0 mb-6 border-white-400">
        <div className=" flex flex-col w-full mb-7">
          <div className="flex flex-row my-3 mx-0">{getStars(props.noOfStars)}</div>
          <div className=" flex text-xs text-dark-600 tracking-tight">
            <Link href="/" className="username underline font-bold text-sm">
              {props.buyerName}
            </Link>
            <Image src="/assets/reviewsAssets/ShortLine.svg" width={2} height={1} alt="Line" className=" mx-3 my-0" />
            <div className="date font-bold text-sm">{props.mainDate}</div>
          </div>
          <div className="my-3 mx-0 flex text-md font-semibold text-black">{props.review}</div>
          <p className="flex m-0 mb-2 cursor-pointer max-w-max text-dark-600 font-bold text-sm">
            {props.help} people found this helpful
          </p>
          <Button
            leftIcon={<Like1 color="#777" />}
            intent={'secondary'}
            size={'sm'}
            isLoading={false}
            spinnerColor="#06C270"
            className="text-dark-600 border-white-400 hover:border-brand-green-primary"
          >
            Helpful
          </Button>
        </div>
        {props.shopReply && (
          <div className="flex flex-col w-full p-5 mt-3 mb-7 mx-0 bg-[#D3D3D3]">
            <div className="flex text-xs w-full justify-between items-center text-dark-600">
              <div className=" text-black text-sm font-semibold">{props.shopName}</div>
              <div className="date font-bold text-sm">{props.adminDate}</div>
            </div>
            <div className="my-3 mx-0 flex text-md font-semibold text-black">{props.shopReply}</div>
          </div>
        )}
      </div>
    </div>
  );
}
