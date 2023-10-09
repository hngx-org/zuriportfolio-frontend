import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@modules/auth/component/Container/Container';
import Review from '@modules/dashboard/component/reviews/review-page/Review';
import ShopNavbar from '@modules/shop/component/header-footer/shopNavbar';
import ShopFooter from '@modules/shop/component/header-footer/shopFooter';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import { ratingData, reviewData } from '../../../db/reviews';

export default function UserReview() {
  return (
    <div className="">
      <ShopNavbar activePage="Explore" showDashBorad={true} />
      <Container>
        <div className="flex flex-col mt-10">
          <div className=" flex items-center justify-center">
            <div className="flex flex-col w-[89%] mb-10 items-center justify-center">
              <div className="flex  justify-start items-center w-full text-[24px] font-semibold">
                <p className=" m-0 ml-1">Customer Feedback</p>
              </div>
              <div className="flex  justify-start items-center w-full mt-4 text-[16px] font-normal">
                <p>VERIFIED RATINGS (173)</p>
              </div>
              <div className="flex flex-col w-[100%] mt-14 md:flex-row md:items-start items-center justify-center">
                <div className=" flex flex-col min-w-[194px] w-[28%] min-h-[210px] max-h-[474px] mr-[40px] xl p-4 ">
                  <RatingBar avgRating={4.2} />
                  <div className=" mt-7">
                    {ratingData.map((data, index) => (
                      <RatingCard key={index} rating={data.rating} users={data.users} />
                    ))}
                  </div>
                </div>
                <div className="min-w-[400px] max-w-[74%] flex flex-col">
                  <div className="mt-6 mx-1">
                    <Review
                      buyerName={reviewData[0].buyerName}
                      adminDate={reviewData[0].adminDate}
                      review={reviewData[0].review}
                      noOfStars={reviewData[0].noOfStars}
                      shopReply={reviewData[0].shopReply}
                      shopName={reviewData[0].shopName}
                      help={322}
                    />
                    <div className="flex items-center">
                      <Link href="product-details" className="flex items-center">
                        <p className="h-11 w-48 font-bold font-ManropeL text-green-600 tracking-wide cursor-pointer items-center flex p-0 justify-evenly">
                          See more reviews
                        </p>
                        <Image
                          src="/assets/reviews/arrow-right.svg"
                          width={22}
                          height={22}
                          alt="back"
                          className="p-0 "
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ShopFooter />
    </div>
  );
}
