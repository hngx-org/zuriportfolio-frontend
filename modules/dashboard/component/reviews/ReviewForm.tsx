import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import star1 from '../../../../public/assets/star1.svg';
import star2 from '../../../../public/assets/star2.svg';

function ReviewForms() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex: any) => {
    setRating(starIndex + 1);
  };
  const renderStarImages = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starImage = i < rating ? star1 : star2;
      stars.push(
        <Image
          key={i}
          src={starImage}
          alt="Star"
          width={56}
          height={56}
          className="object-contain cursor-pointer"
          onClick={() => handleStarClick(i)}
        />,
      );
    }
    return stars;
  };

  return (
    <div className=" flex flex-col h-full w-full justify-center items-center">
      <div className="m-5 flex flex-col w-full justify-center ">
        <div className="flex space-x-2">{renderStarImages()}</div>
        <div></div>
        <div className="mx-2">
          <h2 className="font-semibold text-2xl text-[#8D9290] font-manropeEL py-3">Name</h2>
          <Input
            onChange={(e) => {
              console.log(e.target.value);
            }}
            type="email"
            intent={'default'}
            inputSize={'lg'}
            placeHolder=""
            className="w-full"
          />
        </div>
        <div className="m-2">
          <h2 className="font-semibold text-2xl text-[#8D9290] font-manropeEL py-3">
            Describe your experience(optional)
          </h2>
          <Input
            onChange={(e) => {
              console.log(e.target.value);
            }}
            type="text"
            intent={'default'}
            inputSize={'lg'}
            placeHolder=""
            className="w-full h-96 flex"
            style={{ verticalAlign: 'top' }}
          />
        </div>
        <div className="my-5 mx-2">
          <Button intent={'primary'} size={'lg'} isLoading={false} spinnerColor="#000" className="w-44">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForms;

<div className=" flex flex-col h-full w-full justify-center items-center">
  <div className=" flex flex-col w-full justify-center items-center">
    <div className="image">
      <Image src="/assets/reviewsAssets/EmptyTable.svg" alt="Empty Icon" width={157} height={157} />
    </div>
    <p className=" font-semibold text-[28px]">There are no reviews yet</p>
  </div>
</div>;
