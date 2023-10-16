// pages/shop/products.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopProductList from './component/productPage/ShopProduct/ShopProductList';
import Header from '../shop/component/productPage/Header';
import Footer from '../shop/component/productPage/Footer';
import { Products, ShopData } from '../../@types';
import Pagination from '@ui/Pagination';
import { useCart } from './component/CartContext';
//import Loader from '@ui/Loader';
import { useRouter } from 'next/router';

const ZuriLandingPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopOwnerQuery, setShopOwnerQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const router = useRouter();
  const { cart } = useCart();

  const cartItemCount = cart.length;
  const [shop_id, setShopId] = useState('');

  const [shop, setShop] = useState<ShopData | null>(null);

  useEffect(() => {
    const fetchShopData = async () => {
      if (shop_id) {
        try {
          console.log('Fetching shop data for shop_id:', shop_id);

          const response = await axios.get(`https://zuriportfolio-shop-internal-api.onrender.com/api/shop/${shop_id}`);
          console.log('Shop data:', response.data);

          setShop(response.data);

          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      } else {
        console.error('shop_id is not provided.');
        setLoading(false);
      }
    };

    if (router.query.shop_id) {
      const newShopId = router.query.shop_id as string;
      setShopId(newShopId);
      console.log('Router shop_id:', newShopId);
    }

    fetchShopData();
  }, [router.query.shop_id, shop_id]);

  console.log('Current shop_id:', shop_id);
  console.log('Shop data:', shop);
  if (shop && shop.data) {
    const shopName = shop.data?.name;
    console.log('Shop name:', shopName);
  }

  if (shop && shop.data) {
    const shopP = shop.data?.products;
    console.log('Shop name:', shopP);
  }
  const totalPageCount = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Header
        setSearchQuery={setSearchQuery}
        setShopOwnerQuery={setShopOwnerQuery}
        setCategoryQuery={setCategoryQuery}
        cartItemCount={cartItemCount}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="px-4 sm:px-6 md:px-3 py-5 container mx-auto">
        {shop && (
          <div className="space-y-12 py-10">
            {/* ... */}
            <h1 className="mb-4 md:text-3xl text-xl font-manropeEB">Hello, Welcome to {shop.data?.name}.</h1>
            <p className="md:text-base text-xs font-normal font-manropeL">
              Explore our store for courses and E-books that will elevate your skills from novice to expert.
            </p>
          </div>
        )}
        <div className="py-10">{shop && <ShopProductList shop={shop} />}</div>
        <div className="w-full mx-auto flex justify-center">
          <Pagination
            visiblePaginatedBtn={5}
            activePage={currentPage}
            pages={totalPageCount}
            page={currentPage}
            setPage={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ZuriLandingPage;
