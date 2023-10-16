import loadingIllustration from '../../public/assets/wishlistAssets/loadingIllustration.svg';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { WishlistProductCard } from './component/WishlistProductCard';
import Container from '@modules/auth/component/Container/Container';
import CategoryLayout from './component/layout/category-layout';
import { isUserAuthenticated } from '@modules/marketplace/hooks/useAuthHelper';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

function Wishlist() {
  const [data, setData] = useState<ProductEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { auth } = useAuth();

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

  const moveToCart = async (id: string) => {
    const apiUrl = `https://zuri-cart-checkout.onrender.com/api/checkout/api/carts`;
    if (token?.id) {
      try {
        const response = await axios.post(
          apiUrl,
          { product_ids: [`${id}`] },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          },
        );

        if (response.status === 200) {
          toast.success('Added to Cart');
          console.log('success');
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
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
                  <WishlistProductCard key={id} product={product} moveToCart={moveToCart} />
                ))}
              </div>
            </section>
          </div>
        </Container>
      </CategoryLayout>
      <ToastContainer />
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
