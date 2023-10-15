// pages/shop/products.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopProductList from './component/productPage/ShopProduct/ShopProductList';
import Header from '../shop/component/productPage/Header';
import Footer from '../shop/component/productPage/Footer';
import { Products } from '../../@types';
import Pagination from '@ui/Pagination';
import { useCart } from './component/CartContext';

//const fakeStoreApiUrl = 'https://fakestoreapi.com/products';

const ZuriLandingPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopOwnerQuery, setShopOwnerQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 8;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentProducts, setCurrentProducts] = useState<Products[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const { cart } = useCart();

  const cartItemCount = cart.length;

  useEffect(() => {
    axios
      .get('https://zuriportfolio-shop-internal-api.onrender.com/api/products/marketplace')
      .then((response) => {
        console.log('Fetched product data:', response.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

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
      />{' '}
      <div className=" px-4 sm:px-6 md:px-3 py-5 container mx-auto">
        <div className="space-y-12 py-10">
          <h1 className="mb-4 md:text-3xl text-xl font-manropeEB">Hello, Welcome to TechVerse.</h1>
          <p className="md:text-base text-xs font-normal font-manropeL">
            Explore our store for courses and E-books that will elevate your skills from novice to expert.
          </p>
        </div>
        <div className="flex gap-3  text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32">
            <path
              d="M31.999 6.075c-1.177.523-2.448.875-3.999 1.033 1.439-.865 2.542-2.232 3.057-3.866-1.34.794-2.826 1.369-4.411 1.684-1.266-1.352-3.062-2.196-5.055-2.196-3.815 0-6.914 3.097-6.914 6.911 0 .543.062 1.073.18 1.587-5.748-.288-10.859-3.041-14.291-7.236-.599 1.034-.944 2.244-.944 3.535 0 2.448 1.248 4.61 3.15 5.879-1.16-.038-2.25-.354-3.216-.878-.001.032-.001.065-.001.097 0 3.415 2.434 6.265 5.667 6.921-.592.162-1.221.248-1.867.248-.455 0-.898-.043-1.331-.125.9 2.773 3.522 4.792 6.623 4.852-2.422 1.887-5.469 3.014-8.774 3.014-.571 0-1.136-.034-1.693-.1 3.144 2.019 6.871 3.204 10.887 3.204 13.063 0 20.202-10.831 20.202-20.202 0-.309-.007-.617-.018-.924 1.389-1 2.589-2.248 3.536-3.669z"
              fill="#33A467"
            />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 50 50">
            <path
              d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
              fill="#33A467"
            ></path>
          </svg>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              id="facebook"
              d="M25.0625 13C25.0625 6.36562 19.6344 0.9375 13 0.9375C6.36562 0.9375 0.9375 6.36562 0.9375 13C0.9375 19.0312 5.31016 24.007 11.0398 24.9117V16.468H8.02422V13H11.0398V10.2859C11.0398 7.27031 12.8492 5.61172 15.5633 5.61172C16.9203 5.61172 18.2773 5.91328 18.2773 5.91328V8.92891H16.7695C15.2617 8.92891 14.8094 9.83359 14.8094 10.7383V13H18.1266L17.5234 16.468H14.6586V25.0625C20.6898 24.1578 25.0625 19.0312 25.0625 13Z"
              fill="#33A467"
            />
          </svg>
        </div>
        <div className="py-10">
          {products.length > 0 && (
            <ShopProductList
              products={products}
              searchQuery={searchQuery}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
            />
          )}
        </div>
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
