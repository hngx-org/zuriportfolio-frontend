import React from 'react';
import ReviewDashboardCard from '@modules/dashboard/component/reviews/ReviewDashboardCard';
import Filter from '@modules/dashboard/component/reviews/review-page/ReviewFilter';
import Review from '@modules/dashboard/component/reviews/review-page/Review';
import SellerReview from '@modules/dashboard/component/reviews/review-page/SellersReview';
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
        <Review
          reviewId="1"
          buyerName="John Doe"
          adminDate="2021-09-01"
          mainDate="2021-09-01"
          review="I recently purchased this digital product and I'm thrilled with it! It's been a game-changer for me. The user interface is incredibly intuitive, making it easy for even a tech novice like me to navigate. The product's functionality is top-notch, and it has exceeded my expectations. It's incredibly fast and efficient, saving me both time and frustration. Customer support has been exceptional."
          noOfStars={3}
        />
      </div>
      <div className="py-1 px-9 pb-10">
        <h3 className="text-3xl flex justify-center py-10">Sellers Review Component</h3>
        <SellerReview
          reviewId="1"
          buyerName="John Doe"
          adminDate="2021-09-01"
          mainDate="2021-09-01"
          review="I recently purchased this digital product and I'm thrilled with it! It's been a game-changer for me. The user interface is incredibly intuitive, making it easy for even a tech novice like me to navigate. The product's functionality is top-notch, and it has exceeded my expectations. It's incredibly fast and efficient, saving me both time and frustration. Customer support has been exceptional."
          shopName={'Zuri Marketplace'}
          shopReply={
            'Having this product is the best thing that has happened to me in a very long time. Thank you so much for this product. The shipping and delivery was also very good. But there a few tweaks that this can actually have though. Having this product is the best thing that has happened to me in a very long time. Thank you so much for this product.'
          }
          noOfStars={3}
        />
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
