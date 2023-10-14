import React, { useState, useEffect } from 'react';
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
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('');
//   const data = await res.json();

//   const paths = data.map(zuri => {
//     return {
//       params: {id: zuri.id.toString()}
//     }
//   })

//   return {
//     paths: paths,
//     fallback: false
//   }
// }

// export const getStaticProp: GetStaticProps = async (context) => {
//   const id = context?.params?.id;
//   const res = await fetch('https://i-external-view-production.up.railway.app/api/v1/products');
//   const dat = await res.json();
//   console.log(dat)

//   return {
//     props: { zuriRats: dat}
//   }
// }

interface data {
  data: [
    {
      productId: string;
      reviewId: string;
      customerName: string;
      isHelpful: number;
      title: string;
      description: string;
      rating: number;
      reply: {
        replyId: string;
        name: string;
        message: string;
        createdAt: string;
      };
      createdAt: string;
    },
  ];
}

// type Props = {
//   zuri: [
//     {
//       productId: string;
//       reviewId: string;
//       customerName: string;
//       isHelpful: number;
//       title: string;
//       description: string;
//       rating: number;
//       reply: {
//         replyId: string;
//         name: string;
//         message: string;
//         createdAt: string;
//       };
//       createdAt: string;
//     },
//   ];
// };
interface Params extends ParsedUrlQuery {
  id: string;
}
// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [
//       {
//         params: { id: '1' },
//       },
//       {
//         params: { id: '2' },
//       },
//       {
//         params: { id: '3' },
//       },
//       {
//         params: { id: '4' },
//       },
//       {
//         params: { id: '5' },
//       },
//     ],
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
//   console.log('Fetching data...');
//   const id = context.params!.id;
//   try {
//     const res = await fetch(
//       `https://team-liquid-repo.onrender.com/api/review/shop/${id}/reviews?pageNumber=0&pageSize=10`,
//       { next: { revalidate: 5 } },
//     );
//     const data = await res.json();
//     console.log(data);
//     if (!data) {
//       throw new Error('API response is empty');
//     }
//     return {
//       props: { zuri: data.data },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: { zuri: [] },
//     };
//   }
// };

const UserReview = () => {
  const [data, setData] = useState<data['data'] | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://team-liquid-repo.onrender.com/api/review/shop/1/reviews?pageNumber=0&pageSize=10`)
      .then((res) => res.json())
      .then((data) => setData(data.data));
    console.log(data);
  });

  return (
    <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
      <Container>
        <NavDashBoard active="reviews" />
        <div className="flex flex-col md:mx-24">
          <div className="flex flex-col w-full mb-10 items-center justify-center">
            <div className="flex justify-start items-center w-full mb-20">
              <div
                className="flex flex-row justify-start items-center cursor-pointer"
                onClick={() => router.push('/dashboard/reviews')}
              >
                <Image src="/assets/reviews/return-icon.svg" width={32} height={32} alt="return" />
                <p className="font-manropeB lg:text-2xl md:text-xl">The Complete Ruby on Rails Developer Course</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row lg:gap-16 md:gap-10 gap-4">
              <div className="flex flex-row md:flex-col gap-4 md:gap-8 lg:w-80 md:w-48">
                <div>
                  <RatingBar avgRating={4.2} />
                  <div className="md:hidden block">
                    <p className="pt-6">Have any thoughts?</p>
                    <Link
                      href={`../new`}
                      className="flex text-sm md:text-base font-manropeB text-brand-green-pressed h-5 w-36 self-start"
                    >
                      <button className="hover:text-green-200">Write a Review!</button>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {ratingData.map((data, index) => (
                    <RatingCard key={index} rating={data.rating} users={data.users} />
                  ))}
                  <div className="hidden md:block">
                    <p className="pt-6">Have any thoughts?</p>
                    <Link
                      href={`../new`}
                      className="flex text-sm md:text-base font-manropeB text-brand-green-pressed h-5 w-36 self-start"
                    >
                      <button className="hover:text-green-200">Write a Review!</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-full justify-start">
                  <Filter review={4} rating={4} />
                </div>
                <div className="mt-4 mx-1">
                  {data !== null &&
                    data.map((data, index) => (
                      <SellerReview
                        key={index}
                        buyerName={data.customerName}
                        mainDate={data.createdAt}
                        adminDate={data.reply?.createdAt}
                        review={data.description}
                        noOfStars={data.rating}
                        shopReply={data.reply?.message}
                        shopName={data.reply?.name}
                        reviewId={data.reviewId}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <PaginationBar pageLength={1} currentPage={0} changeCurrentPage={() => null} />
        </div>
      </Container>
    </MainLayout>
  );
};
export default UserReview;
