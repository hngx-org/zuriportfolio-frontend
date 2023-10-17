import React, { useEffect, useState } from 'react';
import ReviewDashboardCard from '@modules/dashboard/component/reviews/ReviewDashboardCard';
import NavDashBoard from '@modules/dashboard/component/Navbar';
import PaginationBar from '@modules/dashboard/component/order/PaginationBar';
import MainLayout from '../../../components/Layout/MainLayout';
import Container from '@modules/auth/component/Container/Container';
import { cardData } from '../../../db/reviews';
import Loader from '@ui/Loader';

export default function ReviewDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    // Fetch the product data from the server
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await fetch('https://zuriportfolio-shop-internal-api.onrender.com/api/products/marketplace');
      const data = await res.json();
      if (Array.isArray(data.data)) {
        console.log(data.data);
        const tranformedProduct = data.data.map((product: any) => ({
          id: product.id,
          title: product.name,
          ratingNo: 5,
          imageSrc: product.image[0].url,
          price: product.price,
          avgRating: 2,
          author: '',
        }));
        console.log(tranformedProduct);
        setProducts(tranformedProduct);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <MainLayout activePage="Explore" showDashboardSidebar={false} showTopbar>
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
            {!isLoading && <PaginationBar pageLength={1} currentPage={0} changeCurrentPage={() => 1} />}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
