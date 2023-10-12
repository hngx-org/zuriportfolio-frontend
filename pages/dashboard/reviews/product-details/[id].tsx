import React from 'react';
import NavDashBoard from '../../../../modules/dashboard/component/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import SellerReview from '@modules/dashboard/component/reviews/review-page/SellersReview';
import Filter from '@modules/dashboard/component/reviews/review-page/ReviewFilter';
import PaginationBar from '../../../../modules/dashboard/component/order/PaginationBar';
import MainLayout from '../../../../components/Layout/MainLayout';
import { ratingData, reviewData } from '../../../../db/reviews';
import Container from '@modules/auth/component/Container/Container';

export default function UserReview() {
  const router = useRouter();

  return (
    <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
      <Container>
        <NavDashBoard active="reviews" />
        <div className="flex flex-col md:mx-24">
          <div className="flex flex-col w-full mb-10 items-center justify-center">
            <div className="flex justify-start items-center w-full mb-20">
              <div className="flex flex-row justify-start items-center cursor-pointer" onClick={() => router.back()}>
                <Image src="/assets/reviews/return-icon.svg" width={32} height={32} alt="return" />
                <p className="font-manropeB lg:text-2xl md:text-xl">The Complete Ruby on Rails Developer Course</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row lg:gap-16 md:gap-10 gap-4">
              <div className="flex flex-row md:flex-col gap-4 md:gap-8 lg:w-80 md:w-48">
                <RatingBar avgRating={4.2} />
                <div className="flex flex-col gap-2">
                  {ratingData.map((data, index) => (
                    <RatingCard key={index} rating={data.rating} users={data.users} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-full justify-start">
                  <Filter review={76} rating={195} />
                </div>
                <div className="mt-4 mx-1">
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
          <PaginationBar pageLength={1} currentPage={0} changeCurrentPage={() => 1} />
        </div>
      </Container>
    </MainLayout>
  );
}
