import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import empty from '../../../../public/assets/reviews/Table.png';
import Container from '@modules/auth/component/Container/Container';
import MainLayout from '../../../../components/Layout/MainLayout';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import SellerReview from '@modules/dashboard/component/reviews/review-page/SellersReview';
import Filter from '@modules/dashboard/component/reviews/review-page/ReviewFilter';
import PaginationBar from '../../../../modules/dashboard/component/order/PaginationBar';
import { ratingData, reviewData } from '../../../../db/reviews';
// import { useRouter } from 'next/router';

export default function UserReview() {
  // const router = Router();

  return (
    <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar={true}>
      <Container>
        <div className="flex flex-col">
          <div className=" flex items-center justify-center">
            <div className="flex flex-col w-[89%] mb-10 items-center justify-center">
              <div className="flex justify-start items-center w-full">
                <div
                  className="flex flex-row justify-start items-center cursor-pointer"
                  // onClick={() =>router.back()}
                >
                  <Image src="/assets/reviews/return-icon.svg" width={22} height={22} alt="return" />
                  <p className=" m-0 ml-1">The Complete Ruby on Rails Developer Course</p>
                </div>
              </div>
              {reviewData.length === 0 ? (
                <div className="container md:h-[60vh] lg:h-[60vh] xl:h-[70vh] h-[50vh] content-center justify-center flex flex-col mx-auto">
                  <div className="flex flex-col items-center justify-center">
                    <Image src={empty} width={157} height={157} alt="empty" />
                    <p className="lg:text-[28px] lg:leading-9 font-semibold font-manrope md:text-2xl text-base">
                      There are no reviews yet
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row lg:gap-16 md:gap-10 gap-4 mt-4">
                  <div className="flex flex-row md:flex-col gap-4 md:gap-8 lg:w-80 md:w-48">
                    <RatingBar avgRating={4.2} />
                    <div>
                      {ratingData.map((data, index) => (
                        <RatingCard key={index} rating={data.rating} users={data.users} />
                      ))}
                    </div>
                  </div>
                  <div className="= flex flex-col ml-10">
                    <div className="w-max">
                      <Filter review={76} rating={195} />
                    </div>
                    <div className="mt-6 ">
                      {reviewData.map((data, index) => (
                        <SellerReview
                          reviewId={''}
                          key={index}
                          buyerName={data.buyerName}
                          adminDate={data.adminDate}
                          mainDate={data.adminDate}
                          review={data.review}
                          noOfStars={data.noOfStars}
                          shopReply={data.shopReply}
                          shopName={data.shopName}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <PaginationBar pageLength={1} currentPage={0} changeCurrentPage={() => 1} />
        </div>
      </Container>
    </MainLayout>
  );
}
