import React from 'react';
import ReviewNavbar from '@modules/dashboard/component/reviews/review-page/ReviewNavbar';
import ReviewFooter from '@modules/dashboard/component/reviews/review-page/ReviewFooter';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import ReviewForm from '@modules/dashboard/component/reviews/ReviewForm';
import { ratingData } from '../../../db/reviews';

export default function UserReview() {
  return (
    <div>
      <div className="pb-8">
        <ReviewNavbar />
      </div>
      <div className="flex flex-col w-[100%] md:flex-row md:items-start items-center justify-center">
        <div className=" flex flex-col min-w-[194px] w-[28%] min-h-[210px] max-h-[474px] mr-[40px] xl p-4 ">
          <RatingBar avgRating={4.2} />
          <div className=" mt-7">
            {ratingData.map((data, index) => (
              <RatingCard key={index} rating={data.rating} users={data.users} />
            ))}
          </div>
        </div>
        <div className="w-[50vw] h-auto">
          <ReviewForm />
        </div>
      </div>
      <ReviewFooter />
    </div>
  );
}
