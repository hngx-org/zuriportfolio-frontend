import Loader from '@ui/Loader';
import Review from '@modules/dashboard/component/reviews/review-page/Review';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { reviewProps } from '../../../@types';

export const ProductReview = ({ id }: { id: string }) => {
  const [reviews, setReviews] = useState<reviewProps[]>([]);
  const reviewsUrl = `https://team-liquid-repo.onrender.com/api/review/shop/${id}/reviews`;
  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(reviewsUrl);
        console.log(response);
        setReviews(response.data.data);
      } catch (error) {
        setReviews([]);
        console.log(error);
      }
    };
    getReviews();
  }, []);

  return (
    <div className="mt-4 mx-1">
      {!reviews ? (
        <Loader />
      ) : reviews?.length === 0 ? (
        <p className="font-manropeL text-base font-normal">
          No reviews yet. <br></br> Be the first to review this product.{' '}
          <Link href={`/dashboard/reviews/create/${id}`} className="underline">
            Write a review.
          </Link>
        </p>
      ) : (
        reviews?.map((review: any) => (
          <Review
            key={review.reviewId}
            buyerName={review.customerName}
            mainDate={review.createdAt}
            adminDate={review.reply?.createdAt}
            review={review.description}
            noOfStars={review.rating}
            shopReply={review.reply?.message}
            shopName={review.reply?.name}
            reviewId={review.reviewId}
          />
        ))
      )}
    </div>
  );
};
