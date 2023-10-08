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
    <div className=" w-full m-0 p-0">
      <div className="border-b w-full m-0 mb-6 border-white-400">
        <div className=" flex flex-col w-full mb-7">
          <div className="flex flex-row my-3 mx-0">{getStars(props.noOfStars)}</div>
          <div className=" flex text-xs text-dark-600">
            <Link href="/" className=" underline">
              {props.buyerName}
            </Link>
            <Image src="/assets/reviewsAssets/ShortLine.svg" width={1} height={1} alt="Line" className=" mx-3 my-0" />
            <div className="date">September 22, 2023.</div>
          </div>
          <div className=" my-3 mx-0 flex text-sm text-black">{props.review}</div>
          <p className=" flex text-xs m-0 mb-3 text-dark-600">{props.help} people found this helpful</p>
          <Button
            leftIcon={<Like1 color="#777" />}
            intent={'secondary'}
            size={'sm'}
            isLoading={false}
            spinnerColor="#06C270"
            className=" text-dark-600 border-white-400 hover:border-brand-green-primary"
          >
            Helpful
          </Button>
        </div>
        {props.shopReply && (
          <div className="flex flex-col w-full p-5 mb-7 mx-0 bg-white-200">
            <div className=" flex text-xs w-full justify-between items-center text-dark-600 ">
              <div className=" text-black text-sm font-semibold">{props.shopName}</div>
              <div className="date">{props.adminDate}</div>
            </div>
            <div className="my-3 mx-0 flex text-sm text-black">{props.shopReply}</div>
          </div>
        )}
      </div>
    </div>
  );
}
