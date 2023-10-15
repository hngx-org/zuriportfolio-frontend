import loadingIllustration from '../../public/assets/wishlistAssets/loadingIllustration.svg';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { WishlistProductCard } from './component/WishlistProductCard';
import Container from '@modules/auth/component/Container/Container';
import CategoryLayout from './component/layout/category-layout';
import { isUserAuthenticated } from '@modules/marketplace/hooks/useAuthHelper';

function Wishlist() {
  const [data, setData] = useState<ProductEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token: any = isUserAuthenticated();

  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://coral-app-8bk8j.ondigitalocean.app/api/user-wishlist/${token?.id}`);

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <ToastContainer />
      {showEmptyWishlistModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h- bg-black bg-opacity-50 backdrop-blur-5 z-[9999] flex justify-center items-center ">
          <div className="absolute top-0 right-0 mr-5 mt-5">
            <Button
              leftIcon={<CloseCircle color="#06C270" />}
              intent={'secondary'}
              size={'sm'}
              onClick={() => removeEmptyWishlistModal()}
            >
              Close
            </Button>
          </div>
          <div className="bg-white-100 py-3 md:py-4 flex flex-col justify-center items-center gap-5 rounded-md w-9/12 md:w-[485px]">
            <Image src={loadingIllustration} alt="loading" width={100} height={100} />

            <div className="flex flex-col gap-2 items-center">
              <h3 className="text-custom-color10 text-sm font-bold md:text-xl">Your wishlist is Empty</h3>
              <p className="text-custom-color14 text-xs md:text-sm">Looks like you have no items in your wishlist.</p>
            </div>
            <Button intent={'primary'} size={'sm'} className="h-[44px] rounded-md mb-4">
              Start Shopping
            </Button>
          </div>
        </div>
      )}
      {/* <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}> */}
       <CategoryLayout>
        <Container>
          <div className="font-manropeL max-w-[1240px] mx-auto my-8">
            <section className="flex flex-col gap-10 mb-20">
              <div className="flex justify-between items-center">
                <h2 className="sm:text-[28px] text-[16px] font-semibold text-brand-green-shade10">
                  My Wishlist (<span>{data.length || 'no wishlist'}</span> items)
                </h2>
              </div>
              <div className="flex flex-col gap-6  lg:px-[100px]">
                {loading && (
                  <div className="flex justify-center items-center">
                    <Image src={loadingIllustration} alt="loading" width={100} height={100} />
                  </div>
                )}
                {error && (
                  <div className="flex justify-center items-center">
                    <p className="text-red-500">{error}</p>
                  </div>
                )}
                {data.length === 0 && (
                  <div className="flex justify-center items-center">
                    <p className="text-red-500">No wishlist yet</p>
                  </div>
                )}

                {data.map(({ id, product }) => (
                  <WishlistProductCard key={id} product={product} />
                ))}
              </div>
            </section>
          </div>
        </Container>
        </CategoryLayout>
      {/* </MainLayout> */}
    </>
  );
}

export default Wishlist;

interface User {
  id: string;
  username: string;
  email: string;
}

interface Shop {
  id: string;
  name: string;
}

interface Category {
  id: number;
  name: string;
  createdat: string;
  user: string;
}

interface Image {
  url: string;
}

export interface Product {
  id: string;
  shop: Shop;
  name: string;
  description: string;
  quantity: number;
  category: Category;
  price: string;
  images: Image[];
  discount_price: string;
  tax: string;
  admin_status: string;
  is_deleted: string;
  rating: null;
  is_published: boolean;
  currency: string;
  createdat: string;
  updatedat: string;
  inCart?: boolean;
  inStock?: boolean;
  numReviews?: number;
  productRating?: number;
}

interface ProductEntry {
  id: number;
  user: User;
  product: Product;
  createdat: string;
  updatedat: string;
}
