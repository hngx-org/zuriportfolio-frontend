import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@modules/auth/component/Container/Container';
import Review from '@modules/dashboard/component/reviews/review-page/Review';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import { ratingData, reviewData } from '../../../../db/reviews';
import CategoriesNav from '@modules/marketplace/component/CategoriesNav/CategoriesNav';
import MainLayout from '../../../../components/Layout/MainLayout';

export default function UserReview() {
  return (
    <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar={true}>
      <div className="max-w-[1240px] hidden md:block mx-auto my-0">
        <CategoriesNav
          navItems={[
            ' Design & Graphics',
            ' Development & Programming',
            ' Content Creation',
            ' Digital Arts & Media',
            ' Audio & Sound',
            ' Photography',
            'Writing & Copywriting',
            'Video & motion',
            'Data & Analytics',
            'Marketing & Advertising',
            'eCommerce & Business',
            'Gaming & Entertainment',
            'Virtual Reality & Augmented Reality',
            'e-Books',
          ]}
        />
      </div>
      <Container>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <div className="mb-10 items-center justify-center">
              <div className="lg:text-2xl lg:leading-8 text-custom-color31 font-manropeB lg:font-semibold text-[22px] leading-7 ">
                <p>Customer Feedback</p>
              </div>
              <div className="lg:text-base text-sm lg:tracking-tight  py-5 lg:leading-6 leading-5">
                <p>VERIFIED RATINGS (173)</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-start items-center justify-center">
                <div className="md:flex flex-col items-center hidden  py-4 ">
                  <RatingBar avgRating={3.0} />
                  <div className=" my-5">
                    {ratingData.map((data, index) => (
                      <RatingCard key={index} rating={data.rating} users={data.users} />
                    ))}
                  </div>
                </div>
                <div className="md:mx-16 mx-0 flex flex-col">
                  <div className="">
                    <Review
                      buyerName={reviewData[0].buyerName}
                      adminDate={reviewData[0].adminDate}
                      mainDate={reviewData[0].adminDate}
                      review={reviewData[0].review}
                      noOfStars={reviewData[0].noOfStars}
                      shopReply={reviewData[2].shopReply}
                      shopName={reviewData[0].shopName}
                      help={322}
                    />
                    <div className="flex items-center w-48">
                      <Link href="product-details" className="flex items-center">
                        <p className=" font-bold font-manropeL lg:text-base lg:leading-6 text-green-600 tracking-wide cursor-pointer items-center flex p-0 text-xs leading-6">
                          See more reviews
                        </p>
                        <div className="lg:w-6 w-4 mx-0 lg:h-6 h-4">
                          <Image
                            src="/assets/reviews/arrow-right.svg"
                            width={24}
                            height={24}
                            alt="back"
                            className="p-0  "
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
