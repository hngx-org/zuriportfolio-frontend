// pages/shop/products.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopProductList from './component/productPage/ShopProduct/ShopProductList';
import Header from '../shop/component/productPage/Header';
import Footer from '../shop/component/productPage/Footer';
import { Products, ShopData } from '../../@types';
import Pagination from '@ui/Pagination';
import { useCart } from './component/CartContext';
import Loader from '@ui/Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Error from '../shop/component/error/Error';

const ZuriLandingPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopOwnerQuery, setShopOwnerQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
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
      setLoading(true);
      setShowLoader(true);
      if (shop_id) {
        try {
          const response = await axios.get(`https://zuriportfolio-shop-internal-api.onrender.com/api/shop/${shop_id}`);
          setShop(response.data);
          setTimeout(() => {
            setShowLoader(false);
            setLoading(false);
          }, 2000);
        } catch (error) {
          setLoading(false);
          setShowLoader(false);
        }
      } else {
        setLoading(false);
        setShowLoader(false);
      }
    };

    if (router.query.shop_id) {
      const newShopId = router.query.shop_id as string;
      setShopId(newShopId);
    }

    fetchShopData();
  }, [router.query.shop_id, shop_id]);

  if (shop && shop.data) {
    const shopName = shop.data?.name;
  }

  if (shop && shop.data) {
    const shopP = shop.data?.products;
  }

  useEffect(() => {
    if (shop) {
      const shopProducts = shop.data?.products || [];
      setProducts(shopProducts);
    }
  }, [shop]);
  const totalPageCount = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <title>{shop ? `${shop.data?.name} Shop - Discover, Buy, and Sell` : ''}</title>
        <meta
          name="description"
          content="Discover a versatile online marketplace where sellers can showcase their products, and buyers can find a wide range of goods. Shop for unique handcrafted items, everyday essentials, and more."
        />
        <meta property="og:title" content={shop ? `${shop.data?.name} Shop - Discover, Buy, and Sell` : ''} />
        <meta
          property="og:description"
          content={`Experience the magic of ${
            shop ? shop.data?.name : 'Shop'
          } Shop, a place where you can discover, shop, and thrive. Our exceptional products cater to all your needs. Join us today!`}
        />

        <meta
          property="og:url"
          content="https://zuriportfolio-frontend-pw1h.vercel.app/shop?shop_id=3a9a50be-990d-492b-bcfa-0936d6d8d82b"
        />
      </Head>
      <Header
        setSearchQuery={setSearchQuery}
        setShopOwnerQuery={setShopOwnerQuery}
        cartItemCount={cartItemCount}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      <div className=" flex-grow px-4 sm:px-6 md:px-6 lg:px-10 py-5 container mx-auto">
        {shop ? (
          <div className="space-y-12 py-10">
            <h1 className="mb-4 md:text-3xl text-xl font-manropeEB">Hello, Welcome to {shop.data?.name}.</h1>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-screen py-10">
            <Loader />
          </div>
        ) : (
          <div className="text-center py-10">
            <Error />
          </div>
        )}
        <div className="py-10">
          {shop ? (
            <ShopProductList
              shop={shop}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              searchQuery={searchQuery}
            />
          ) : null}
        </div>

        <a href="#top" className="w-fit mx-auto flex justify-center">
          {totalPageCount > 1 && (
            <Pagination
              visiblePaginatedBtn={5}
              activePage={currentPage}
              pages={totalPageCount}
              page={currentPage}
              setPage={handlePageChange}
            />
          )}
        </a>
      </div>
      <Footer shopName={shop ? shop.data?.name : ''} />
    </div>
  );
};

export default ZuriLandingPage;
