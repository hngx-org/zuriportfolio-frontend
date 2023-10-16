import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import Container from '@modules/auth/component/Container/Container';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import ReviewForm from '@modules/dashboard/component/reviews/ReviewForm';
import { ratingData } from '../../../db/reviews';
import CategoriesNav from '@modules/marketplace/component/CategoriesNav/CategoriesNav';

export default function UserReview() {
  return (
    <div className="">
      <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
        <div className="max-w-[1240px] hidden lg:block mx-auto my-0">
          <CategoriesNav
            navItems={[
              {
                name: 'software enginering',
                subcategories: [],
              },
              {
                name: 'enginering',
                subcategories: [
                  {
                    name: 'software girl era',
                  },
                ],
              },
              {
                name: 'computer enginering',
                subcategories: [
                  {
                    name: 'backend enginering',
                  },
                ],
              },
              {
                name: 'Joshua_Shop',
                subcategories: [
                  {
                    name: 'backend enginering',
                  },
                  {
                    name: 'health',
                  },
                  {
                    name: 'health',
                  },
                  {
                    name: 'computer enginering',
                  },
                ],
              },
              {
                name: 's enginering',
                subcategories: [],
              },
            ]}
          />
        </div>
        <Container>
          <div className="flex flex-col  md:flex-row md:items-start items-center content-center  justify-center m-0">
            <div className=" flex md:flex-col items-center flex-row md:mr-7 mr-0 p-4 ">
              <RatingBar avgRating={3.0} />
              <div className=" my-5">
                {ratingData.map((data, index) => (
                  <RatingCard key={index} rating={Number(data.rating)} users={data.users} />
                ))}
                <p className="md:hidden text-xs py-1 font-manropeL text-center tracking-tight">
                  195 total ratings, 76 with reviews
                </p>
              </div>
            </div>
            <div className="flex flex-col content-center mx-auto items-center justify-center">
              <ReviewForm />
            </div>
          </div>
        </Container>
      </MainLayout>
    </div>
  );
}
