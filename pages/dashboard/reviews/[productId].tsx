import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@modules/auth/component/Container/Container';
import MainLayout from '../../../components/Layout/MainLayout';
import RatingCard from '@modules/dashboard/component/reviews/review-page/RatingCard';
import RatingBar from '@modules/dashboard/component/reviews/review-page/RatingBar';
import Review from '@modules/dashboard/component/reviews/review-page/Review';
import Filter from '@modules/dashboard/component/reviews/review-page/ReviewFilter';
import PaginationBar from '../../../modules/dashboard/component/order/PaginationBar';
import { ratingData, reviewData } from '../../../db/reviews';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
// import { useRouter } from 'next/router';

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

type Props = {
  zuri: [
    {
      productId: string;
      reviewId: string;
      customerName: string;
      isHelpful: number;
      title: string;
      description: string;
      rating: number;
      replies: {
        replyId: string;
        name: string;
        message: string;
        createAt: string;
      };
      createdAt: string;
    },
  ];
};
interface Params extends ParsedUrlQuery {
  id: string;
}
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: { productId: '1' },
      },
      {
        params: { productId: '2' },
      },
      {
        params: { productId: '3' },
      },
      {
        params: { productId: '4' },
      },
      {
        params: { productId: '5' },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const productId = context.params!.id;
  const res = await fetch(
    `https://team-liquid-repo.onrender.com/api/shop/${productId}/reviews?pageNumber=1&pageSize=10`,
  );
  const data = await res.json();
  console.log(data.data);

  return {
    props: { zuri: data.data },
  };
};
// export const getStaticProp: GetStaticProps = async (context) => {
//   const id = context?.params?.id;
//   const res = await fetch('https://i-external-view-production.up.railway.app/api/v1/products');
//   const dat = await res.json();
//   console.log(dat)

//   return {
//     props: { zuriRats: dat}
//   }
// }

const ProductDetails: NextPage<Props> = (props: any) => {
  // const router = useRouter();

  function calculateTotalRatings() {
    let total = 0;
    ratingData.forEach((data) => {
      let rating = Number(data.rating);
      total += rating;
    });
    return total;
  }
  function getPercentage(number: string) {
    let totalRatings = calculateTotalRatings();
    let percentage = (Number(number) / totalRatings) * 100;
    return Math.floor(percentage);
  }

  return (
    <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
      <Container>
        <div className="flex flex-col">
          <div className=" flex items-center justify-center">
            <div className="flex flex-col w-[89%] mb-10 items-center justify-center">
              <div className="flex justify-start items-center w-full">
                <Link href="/dashboard/reviews" className="flex flex-row justify-start items-center">
                  <Image src="/assets/reviews/return-icon.svg" width={22} height={22} alt="return" />
                  <p className=" m-0 ml-1">Customer Feedback</p>
                </Link>
              </div>
              <div className="flex flex-col  mt-14 md:flex-row md:items-start items-center justify-center">
                <div className=" flex md:flex-col flex-row  p-4 ">
                  <RatingBar avgRating={4.2} />
                  <div className=" mt-7">
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
                    {props.zuri.map((data: any, index: any) => (
                      <Review
                        reviewId={data.reviewId}
                        key={index}
                        buyerName={data.customerName}
                        mainDate={data.createdAt}
                        adminDate={data.replies.createAt}
                        review={data.description}
                        noOfStars={data.rating}
                        shopReply={data.replies.message}
                        shopName={data.replies.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PaginationBar pageLength={1} currentPage={0} changeCurrentPage={() => 1} />
        </div>
      </Container>
    </MainLayout>
  );
};
export default ProductDetails;
