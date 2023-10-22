import React, { useEffect, useState } from 'react';
import ReviewDashboardCard from '@modules/dashboard/component/reviews/ReviewDashboardCard';
import NavDashBoard from '@modules/dashboard/component/Navbar';
import PaginationBar from '@modules/dashboard/component/order/PaginationBar';
import MainLayout from '../../../components/Layout/MainLayout';
import Container from '@modules/auth/component/Container/Container';
import { cardData } from '../../../db/reviews';
import Loader from '@ui/Loader';
import Button from '@ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function ReviewDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    // Fetch the product data from the server
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await fetch(`https://zuriportfolio-shop-internal-api.onrender.com/api/products?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
      });
      const data = await res.json();

      const transformedProduct = data.data.products.map((product: any) => ({
        id: product.id,
        title: product.name,
        ratingNo: 5,
        imageSrc: product.image[0].url,
        price: product.price,
        avgRating: 2,
        author: '',
      }));

      setProducts(transformedProduct);
      setTotalPage(data.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
      <Head>
        <title>Reviews - Zuri Portfolio</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Reviews - Zuri Portfolio" />
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
        <meta key="metadescription" itemProp="description" name="description" content="Reviews - Zuri Portfolio" />
        <meta name="keywords" content="Zuri, portfolio, add, product, dashboard, reviews" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <Container>
        <NavDashBoard active="reviews" />
        <div className="flex flex-col w-full">
          <div className="flex flex-col justify-center items-center">
            <div className="w-11/12 relative min-h-[400px]">
              <h2 className="lg:hidden self-stretch font-manropeB text-2xl pb-8">Reviews</h2>
              {isLoading ? (
                <div className="absolute z-50 inset-0 min-h-[300px] bg-white-100">
                  <Loader />
                </div>
              ) : // Conditional rendering based on the products array
              products.length === 0 ? (
                <main className="max-w-[1240px] p-10 mx-auto flex m-[100px] mt-[-10px] md:mt-[-10px] md:m-[100px] flex-col items-center justify-center">
                  <Image src="/assets/images/review.png" alt="discount" width={100} height={100} />
                  <h2 className="text-[28px] font-bold text-center font-manropeB mt-4">No product to review</h2>
                  <Link href="/dashboard/products/add-product">
                    <Button className="flex mt-4 py-3 px-5 gap-4 rounded-2xl text-white-100 items-center bg-brand-green-primary transition after:transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path
                          d="M6.5 12H18.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5 18V6"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Add New Product</span>
                    </Button>
                  </Link>
                </main>
              ) : (
                products.map((card: any) => (
                  <ReviewDashboardCard
                    key={card.id}
                    id={card.id}
                    className="mb-6"
                    imageSrc={card.imageSrc}
                    title={card.title}
                    author={card.author}
                    avgRating={card.avgRating}
                    ratingNo={card.ratingNo}
                    price={card.price}
                  />
                ))
              )}
            </div>
            {!isLoading && totalPage > 1 && (
              <PaginationBar pageLength={totalPage} currentPage={currentPage} changeCurrentPage={setCurrentPage} />
            )}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
