import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import Container from '@modules/auth/component/Container/Container';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import ReviewForm from '@modules/dashboard/component/reviews/ReviewForm';
import { ratingData } from '../../../db/reviews';

export default function UserReview() {
  return (
    <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
      <Container>
        <div className="pb-8"></div>
        <div className="flex flex-col w-[100%] md:flex-row md:items-start items-center justify-center">
          <div className=" flex flex-col min-w-[194px] w-2/3 md:w-[28%] min-h-[210px] max-h-[474px] md:mr-[40px] py-4 ">
            <RatingBar avgRating={4.2} />
            <div className=" mt-7">
              {ratingData.map((data, index) => (
                <RatingCard key={index} rating={data.rating} users={data.users} />
              ))}
            </div>
          </div>
          <div className="flex flex-col w-[100%] items-center justify-center">
            <ReviewForm />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
