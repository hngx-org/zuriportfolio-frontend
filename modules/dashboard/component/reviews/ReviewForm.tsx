import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import star1 from '../../../../public/assets/star1.svg';
import star2 from '../../../../public/assets/star2.svg';
import { Review, reviewProps } from '../../../../@types';
import axios from 'axios';
import { postReviewByProductId } from '../../../../http/api/controllerReview';

function ReviewForms() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
          className="object-contain lg:w-14 lg:h-14 md:w-10 md:h-10 w-6 h-6 cursor-pointer"
          onClick={() => handleStarClick(i)}
        />,
      );
    }
    return stars;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const newReview: Review = {
        id: Date.now(),
        rating,
        customerName: name,
        description,
      };

      // Make an API request to post the review
      await axios.post(`https://team-liquid-repo-production.up.railway.app/api/products/1/reviews`, newReview);

      // You can also handle success, show a message, or redirect the user
    } catch (error) {
      // Handle errors here
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div className="my-5 mx-auto flex flex-col  w-full  content-center justify-center">
        <div className="flex space-x-2 ">{renderStarImages()}</div>
        <div className="">
          <div className=" my-3">
            <h2 className="font-semibold lg:leading-8 md:leading-6  text-lg md:text-base lg:text-2xl text-[#8D9290] font-manropeEL py-3">
              Name
            </h2>
            <Input
              value={name}
              onChange={handleNameChange}
              type="email"
              intent={'default'}
              inputSize={'lg'}
              placeHolder=""
              className="lg:w-[738px] md:w-[454px]  w-[324px]"
            />
          </div>
          <div className=" my-3">
            <h2 className="font-semibold lg:leading-8 md:leading-6 text-lg md:text-base lg:text-2xl text-[#8D9290] font-manropeEL py-3">
              Describe your experience(optional)
            </h2>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="lg:w-[738px] md:w-[454px] border-2 resize-none rounded-[10px] border-[#8D9290] font-manropeL text-dark-600 hide-caret transition-all select-none focus-within:border-brand-green-primary  px-4 py-3  outline-none  h-[177px] md:h-[240px] lg:h-[400px] relative  flex items-start justify-start w-[324px]"
            ></textarea>
          </div>
          <div className="my-5 ">
            <Button
              onClick={handleSubmit}
              intent={'primary'}
              size={'lg'}
              isLoading={false}
              spinnerColor="#000"
              className="lg:w-[188px] md:w-[104px] w-[90px] "
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewForms;
