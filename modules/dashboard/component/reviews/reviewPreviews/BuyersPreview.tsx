//* Removed some unnecessary imports

import React, { useState, useEffect } from 'react';
import NavDashBoard from '@modules/dashboard/component/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import Review from '../review-page/Review';
import Filter from '@modules/dashboard/component/reviews/review-page/ReviewFilter';
import Pagination from '@ui/Pagination';
import MainLayout from '../../../../../components/Layout/MainLayout';
import EmptyReviewPage from '@modules/dashboard/component/reviews/review-page/EmptyReviewPage';
import Container from '@modules/auth/component/Container/Container';
import Loader from '@ui/Loader';
import { ReviewData, ReviewApiResponse, RatsData } from '../../../../../@types';
import { set } from 'nprogress';

//* Moved type definitions to @types/index.d.ts
const BuyersPreview = () => {
  //* Added a function to set the page number in the url
  const setPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: pageNumber },
    });
  };

  const router = useRouter();
  const { id, title } = router.query;

  //* Added page variable and current page state also added isLoading state to hide page change
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [data, setData] = useState<ReviewData[] | null>(null);
  const [rats, setRats] = useState<RatsData>();
  const [mountUI, setMountUI] = useState<boolean>(false);

  // ToDo: Remove all commented out code
  // const [total5Star, setTotal5Star] = useState<number>(0);
  // const [total4Star, setTotal4Star] = useState<number>(0);
  // const [total3Star, setTotal3Star] = useState<number>(0);
  // const [total2Star, setTotal2Star] = useState<number>(0);
  // const [total1Star, setTotal1Star] = useState<number>(0);

  // useEffect(() => {
  //   fetch(`https://team-liquid-repo.onrender.com/api/review/shop/10/reviews?pageNumber=0&pageSize=10`)
  //     .then((res) => res.json())
  //     .then((data: ReviewApiResponse) => setData(data.data))
  //     .catch((e) => console.log(e));
  // }, []);
  // useEffect(() => {
  //   fetch('https://team-liquid-repo.onrender.com/api/review/products/10/rating')
  //     .then((res) => res.json())
  //     .then((data) => setRats(data.data))
  //     .catch((e) => console.log(e));
  // }, []);

  // ToDo: Move all fetch requests to a separate file
  useEffect(() => {
    if (id) {
      const url: string = `https://team-liquid-repo.onrender.com/api/review/shop/${id}/reviews?pageNumber=${
        currentPage - 1
      }&pageSize=1`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data.items);
        })
        .catch((e) => console.log(e));
    }
  }, [mountUI, currentPage, id]);
  useEffect(() => {
    if (id) {
      const apiUrl: string = `https://team-liquid-repo.onrender.com/api/review/products/${id}/rating`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setRats(data.data))
        .catch((e) => console.log(e));
    }
  }, [id]);

  const ratingData = [
    { rating: 5, users: rats?.fiveStar! || 0, total: rats?.numberOfRating! },
    { rating: 4, users: rats?.fourStar! || 0, total: rats?.numberOfRating! },
    { rating: 3, users: rats?.threeStar! || 0, total: rats?.numberOfRating! },
    { rating: 2, users: rats?.twoStar! || 0, total: rats?.numberOfRating! },
    { rating: 1, users: rats?.oneStar! || 0, total: rats?.numberOfRating! },
  ];

  // ToDo: Remove all commented out code
  // useEffect(() => {
  //   if (data) {
  //     const total5 = data.filter((review) => review.rating === 5).length;
  //     const total4 = data.filter((review) => review.rating === 4).length;
  //     const total3 = data.filter((review) => review.rating === 3).length;
  //     const total2 = data.filter((review) => review.rating === 2).length;
  //     const total1 = data.filter((review) => review.rating === 1).length;
  //     setTotal5Star(total5);
  //     setTotal4Star(total4);
  //     setTotal3Star(total3);
  //     setTotal2Star(total2);
  //     setTotal1Star(total1);
  //   }
  // }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMountUI(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      {!data ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : data?.length === 0 ? (
        <EmptyReviewPage />
      ) : (
        <div className="w-full flex flex-col justify-center items-center md:mb-16">
          <div className="flex flex-col w-full mb-10  justify-center">
            <div className="flex flex-col md:flex-row lg:gap-24 md:gap-10 gap-4 mx-5">
              <div className="flex flex-row md:flex-col gap-4 md:gap-8 lg:w-80 md:w-48">
                <div>
                  <RatingBar avgRating={rats?.averageRating! || 0} verUser={rats?.numberOfRating || 0} />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <div className="w-full mt-0 mx-1">
                  {!data ? (
                    <Loader />
                  ) : (
                    data?.map((review) => (
                      <Review
                        key={review.reviewId}
                        buyerName={review.customerName}
                        mainDate={review.createdAtDate + ' ' + review.createdAtTime}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyersPreview;
