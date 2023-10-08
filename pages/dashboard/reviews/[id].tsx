import React from 'react';
import NavDashBoard from '../../../modules/dashboard/component/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import SellerReview from '@modules/dashboard/component/reviews/review-page/SellersReview';
import Filter from '@modules/dashboard/component/reviews/review-page/ReviewFilter';
import PaginationBar from '../../../modules/dashboard/component/order/PaginationBar';
import MainLayout from '../../../components/Layout/MainLayout';
import { ratingData, reviewData } from '../../../db/reviews';

export default function UserReview() {
  return (
    <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
      <NavDashBoard active="reviews" />
      <div className="flex flex-col">
        <div className=" flex items-center justify-center">
          <div className="flex flex-col w-[89%] mb-10 items-center justify-center">
            <div className="flex justify-start items-center w-full">
              <Link href="/dashboard/reviews" className="flex flex-row justify-start items-center">
                <Image src="/assets/reviews/return-icon.svg" width={22} height={22} alt="return" />
                <p className=" m-0 ml-1">The Complete Ruby on Rails Developer Course</p>
              </Link>
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
                <div className="w-max">
                  <Filter review={76} rating={195} />
                </div>
                <div className="mt-6 mx-1">
                  {reviewData.map((data, index) => (
                    <SellerReview
                      key={index}
                      buyerName={data.buyerName}
                      adminDate={data.adminDate}
                      review={data.review}
                      noOfStars={data.noOfStars}
                      shopReply={data.shopReply}
                      shopName={data.shopName}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaginationBar pageLength={5} currentPage={0} changeCurrentPage={() => 1} />
      </div>
    </MainLayout>
  );
}
