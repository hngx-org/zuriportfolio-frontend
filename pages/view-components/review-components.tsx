import React from 'react';
import ReviewDashboardCard from '@modules/dashboard/component/reviews/ReviewDashboardCard';
import Filter from '@modules/dashboard/component/reviews/review-page/ReviewFilter';
import BuyersPreview from '@modules/dashboard/component/reviews/reviewPreviews/BuyersPreview';
import SellersPreview from '@modules/dashboard/component/reviews/reviewPreviews/SellersPreview';
import ReviewForms from '@modules/dashboard/component/reviews/ReviewForm';
import EmptyReviewPage from '@modules/dashboard/component/reviews/review-page/EmptyReviewPage';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';

const ratingData = [
  { rating: 5, users: 12, total: 67 },
  { rating: 4, users: 5, total: 67 },
  { rating: 3, users: 23, total: 67 },
  { rating: 2, users: 25, total: 67 },
  { rating: 1, users: 2, total: 67 },
];

function reviewComponents() {
  return (
    <>
      <div className="py-1 px-9 pb-10">
        <h3 className="text-3xl flex justify-center py-10">Review Dashboard Card</h3>
        <ReviewDashboardCard
          imageSrc="/assets/reviews/image-9.png"
          title="The Complete Ruby on Rails Developer Course"
          author="John Doe"
          avgRating={3}
          ratingNo={3}
          price={2000}
        />
      </div>
      <div className="flex flex-col justify-center items-center py-1 px-9 pb-10">
        <h3 className="text-3xl flex justify-center py-10">Review Filter</h3>
        <Filter rating={6} review={2} filterReview={() => null} />
      </div>
      <div className="py-1 px-9 pb-10">
        <h3 className="text-3xl flex justify-center py-10">Buyers Review Component</h3>
        <BuyersPreview />
      </div>
      <div className="py-1 px-9 pb-10">
        <h3 className="text-3xl flex justify-center py-10">Sellers Review Component</h3>
        <SellersPreview />
      </div>
      <div className="py-1 px-9 pb-10">
        <h3 className="text-3xl flex justify-center py-10">Review Form</h3>
        <ReviewForms />
      </div>
      <div className="py-1 px-9 pb-10">
        <h3 className="text-3xl flex justify-center py-10">Empty Review State</h3>
        <EmptyReviewPage />
      </div>
      <div className="flex flex-col justify-center items-center py-1 px-9 pb-10">
        <h3 className="text-3xl flex justify-center py-10">Rating Card and Rating Bars</h3>
        <div className="w-[317px]">
          <RatingBar avgRating={3.5} verUser={100} />
          {ratingData.map((data, index) => (
            <RatingCard key={index} rating={data.rating} users={data.users} totalReviews={data.total} />
          ))}
        </div>
      </div>
    </>
  );
}

export default reviewComponents;
