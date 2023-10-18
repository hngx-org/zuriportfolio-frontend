import React, { useEffect, useState } from 'react';
import MainLayout from '../../../../../components/Layout/MainLayout';
import Container from '@modules/auth/component/Container/Container';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import ReviewForm from '@modules/dashboard/component/reviews/ReviewForm';
import CategoriesNav from '@modules/marketplace/component/CategoriesNav/CategoriesNav';
import useCategoryNav from '@modules/marketplace/hooks/useCategoryNav';
import { useRouter } from 'next/router';
import { revNavProps } from '../../../../../@types';
import Breadcrumbs from '../../../../../components/Breadcrumbs';

interface RatsData {
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
  totalRating: number;
  averageRating: number;
  numberOfRating: number;
  productId: string;
  id: string;
}

interface RatsApiResponse {
  data: RatsData;
}

export default function UserReview(navProps: revNavProps) {
  const router = useRouter();
  const { id } = router.query;

  const { categories, loading } = useCategoryNav();
  const [rats, setRats] = useState<RatsData>();
  // useEffect(() => {
  //   fetch('https://team-liquid-repo.onrender.com/api/review/products/10/rating')
  //     .then((res) => res.json())
  //     .then((data) => setRats(data.data))
  //     .catch((e) => console.log(e));
  // }, []);

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
    { rating: 5, users: rats ? rats?.fiveStar! : 0, total: rats?.numberOfRating! },
    { rating: 4, users: rats ? rats?.fourStar! : 0, total: rats?.numberOfRating! },
    { rating: 3, users: rats ? rats?.threeStar! : 0, total: rats?.numberOfRating! },
    { rating: 2, users: rats ? rats?.twoStar! : 0, total: rats?.numberOfRating! },
    { rating: 1, users: rats ? rats?.oneStar! : 0, total: rats?.numberOfRating! },
  ];

  return (
    <div className="">
      <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
        <div className="max-w-[1240px] hidden lg:block mx-auto my-0">
          {/* from marketplace: this component you are using is from marketplace and it has been updated and we have updated it on your end also, this is important to allow sync without error take note  */}
          {navProps.marketPlaceNav && <CategoriesNav navItems={categories} isLoading={loading} />}
          {navProps.shopNav && <Breadcrumbs />}
        </div>
        <Container>
          <div className="flex flex-col  md:flex-row md:items-start items-center content-center  justify-center m-0">
            <div className=" flex md:flex-col items-center flex-row md:mr-7 mr-0 p-4 ">
              <RatingBar avgRating={rats?.averageRating === undefined ? 0 : rats?.averageRating!} verUser={100} />
              <div className=" my-5">
                {ratingData.map((data, index) => (
                  <RatingCard key={index} rating={data.rating} users={data.users} totalReviews={data.total} />
                ))}
                <p className="md:hidden text-xs py-1 font-manropeL text-center tracking-tight">
                  {rats?.totalRating} total ratings, {rats?.numberOfRating} with reviews
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
