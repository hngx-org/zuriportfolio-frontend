import React, { useState } from 'react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { filterProps } from '../../../../../@types';
import star1 from '../../../../../public/assets/star1.svg';
import star2 from '../../../../../public/assets/star2.svg';
import { SelectItemIndicator } from '@radix-ui/react-select';

export default function Filter(props: filterProps) {
  const [viewValue, setViewValue] = useState('topReviews');
  const [starValue, setStarValue] = useState('all');

  function getStars(rating: number) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        stars.push(<Image key={i} src={star1} alt="star" width={22} height={22} />);
      } else if (rating > 0) {
        stars.push(<Image key={i} src={star2} alt="star" width={22} height={22} />);
      } else {
        stars.push(<Image key={i} src={star2} alt="star" width={22} height={22} />);
      }
      rating--;
    }
    return stars;
  }

  props.filterReview(viewValue, starValue);

  return (
    <div className="hidden md:block w-max">
      <p className="text-sm font-semibold mb-2">SORT BY</p>
      <div className="flex flex-row gap-5">
        <div className="">
          <Select
            onValueChange={(value) => {
              setViewValue(value);
            }}
          >
            <SelectTrigger className="custom-select-trigger font-manropeB text-bold text-[#747171] outline-none focus:border-2 focus:border-green-300 focus:text-green-300 h-[44px] w-[200px] px-6">
              <SelectValue placeholder="Top reviews" className="text-[#747171]" />
            </SelectTrigger>

            <SelectContent className="text-sm font-manropeL">
              <SelectItem
                className={viewValue === 'topReviews' ? 'text-green-300' : 'text-[#747171]'}
                value="topReviews"
              >
                Top reviews
              </SelectItem>
              <SelectItem className={viewValue === 'newest' ? 'text-green-300' : 'text-[#747171]'} value="newest">
                Newest
              </SelectItem>
              <SelectItem className={viewValue === 'oldest' ? 'text-green-300' : 'text-[#747171]'} value="oldest">
                Oldest
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            onValueChange={(value) => {
              setStarValue(value);
            }}
          >
            <SelectTrigger className="custom-select-trigger font-manropeB text-bold text-[#747171] outline-none focus:border-2 focus:border-green-300 focus:text-green-300 h-[44px] w-[250px] px-6">
              <SelectValue placeholder="All Stars" className="text-[#747171]" />
            </SelectTrigger>

            <SelectContent className="text-sm font-manropeL flex flex-col items-center justify-center tracking-tight">
              <SelectItem className={starValue === 'all' ? 'text-green-300' : 'text-[#747171]'} value="all">
                All Stars
              </SelectItem>
              <SelectItem className={starValue === '5' ? 'text-green-300' : 'text-[#747171]'} value="5">
                <div className="flex">
                  <span className="pr-3 ">5 stars </span>
                  <span className="flex"> {getStars(5)}</span>
                </div>
              </SelectItem>
              <SelectItem className={starValue === '4' ? 'text-green-300' : 'text-[#747171]'} value="4">
                <div className="flex">
                  <span className="pr-3 ">4 stars </span>
                  <span className="flex"> {getStars(4)}</span>
                </div>
              </SelectItem>
              <SelectItem className={starValue === '3' ? 'text-green-300' : 'text-[#747171]'} value="3">
                <div className="flex">
                  <span className="pr-3 ">3 stars </span>
                  <span className="flex"> {getStars(3)}</span>
                </div>
              </SelectItem>
              <SelectItem className={starValue === '2' ? 'text-green-300' : 'text-[#747171]'} value="2">
                <div className="flex">
                  <span className="pr-3 ">2 stars </span>
                  <span className="flex"> {getStars(2)}</span>
                </div>
              </SelectItem>
              <SelectItem className={starValue === '1' ? 'text-green-300' : 'text-[#747171]'} value="1">
                <div className="flex">
                  <span className="pr-3 ">1 stars </span>
                  <span className="flex"> {getStars(1)}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className=" text-base mt-3 mb-5 font-manropeL">
        {props.rating} total ratings, {props.review} with reviews
      </div>
    </div>
  );
}
