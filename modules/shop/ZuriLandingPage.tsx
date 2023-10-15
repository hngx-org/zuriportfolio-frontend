// pages/shop/products.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopProductList from './component/productPage/ShopProduct/ShopProductList';
import Header from '../shop/component/productPage/Header';
import Footer from '../shop/component/productPage/Footer';
import { Products } from '../../@types';
import Pagination from '@ui/Pagination';
import { useCart } from './component/CartContext';
import Loader from '@ui/Loader';

const ZuriLandingPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopOwnerQuery, setShopOwnerQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 8;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const { cart } = useCart();

  const cartItemCount = cart.length;

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      axios
        .get('https://zuriportfolio-shop-internal-api.onrender.com/api/products/marketplace')
        .then((response) => {
          console.log('Fetched product data:', response.data);
          setProducts(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
          setLoading(false);
        });
    };

    fetchDataWithDelay();
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
      {loading ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className=" px-4 sm:px-6 md:px-3 py-5 container mx-auto">
          <div className="space-y-12 py-10">
            <h1 className="mb-4 md:text-3xl text-xl font-manropeEB">Hello, Welcome to TechVerse.</h1> {/*Name of Shop*/}
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
              <path
                d="M13.0281 2.00098C14.1535 2.00284 14.7238 2.00879 15.2166 2.02346L15.4107 2.02981C15.6349 2.03778 15.8561 2.04778 16.1228 2.06028C17.1869 2.10944 17.9128 2.27778 18.5503 2.52528C19.2094 2.77944 19.7661 3.12278 20.3219 3.67861C20.8769 4.23444 21.2203 4.79278 21.4753 5.45028C21.7219 6.08694 21.8903 6.81361 21.9403 7.87778C21.9522 8.14444 21.9618 8.36564 21.9697 8.58989L21.976 8.78397C21.9906 9.27672 21.9973 9.8471 21.9994 10.9725L22.0002 11.7182C22.0003 11.8093 22.0003 11.9033 22.0003 12.0003L22.0002 12.2824L21.9996 13.0281C21.9977 14.1535 21.9918 14.7238 21.9771 15.2166L21.9707 15.4107C21.9628 15.6349 21.9528 15.8561 21.9403 16.1228C21.8911 17.1869 21.7219 17.9128 21.4753 18.5503C21.2211 19.2094 20.8769 19.7661 20.3219 20.3219C19.7661 20.8769 19.2069 21.2203 18.5503 21.4753C17.9128 21.7219 17.1869 21.8903 16.1228 21.9403C15.8561 21.9522 15.6349 21.9618 15.4107 21.9697L15.2166 21.976C14.7238 21.9906 14.1535 21.9973 13.0281 21.9994L12.2824 22.0002C12.1913 22.0003 12.0973 22.0003 12.0003 22.0003L11.7182 22.0002L10.9725 21.9996C9.8471 21.9977 9.27672 21.9918 8.78397 21.9771L8.58989 21.9707C8.36564 21.9628 8.14444 21.9528 7.87778 21.9403C6.81361 21.8911 6.08861 21.7219 5.45028 21.4753C4.79194 21.2211 4.23444 20.8769 3.67861 20.3219C3.12278 19.7661 2.78028 19.2069 2.52528 18.5503C2.27778 17.9128 2.11028 17.1869 2.06028 16.1228C2.0484 15.8561 2.03871 15.6349 2.03086 15.4107L2.02457 15.2166C2.00994 14.7238 2.00327 14.1535 2.00111 13.0281L2.00098 10.9725C2.00284 9.8471 2.00879 9.27672 2.02346 8.78397L2.02981 8.58989C2.03778 8.36564 2.04778 8.14444 2.06028 7.87778C2.10944 6.81278 2.27778 6.08778 2.52528 5.45028C2.77944 4.79194 3.12278 4.23444 3.67861 3.67861C4.23444 3.12278 4.79278 2.78028 5.45028 2.52528C6.08778 2.27778 6.81278 2.11028 7.87778 2.06028C8.14444 2.0484 8.36564 2.03871 8.58989 2.03086L8.78397 2.02457C9.27672 2.00994 9.8471 2.00327 10.9725 2.00111L13.0281 2.00098ZM12.0003 7.00028C9.23738 7.00028 7.00028 9.23981 7.00028 12.0003C7.00028 14.7632 9.23981 17.0003 12.0003 17.0003C14.7632 17.0003 17.0003 14.7607 17.0003 12.0003C17.0003 9.23738 14.7607 7.00028 12.0003 7.00028ZM12.0003 9.00028C13.6572 9.00028 15.0003 10.3429 15.0003 12.0003C15.0003 13.6572 13.6576 15.0003 12.0003 15.0003C10.3434 15.0003 9.00028 13.6576 9.00028 12.0003C9.00028 10.3434 10.3429 9.00028 12.0003 9.00028ZM17.2503 5.50028C16.561 5.50028 16.0003 6.06018 16.0003 6.74943C16.0003 7.43867 16.5602 7.99944 17.2503 7.99944C17.9395 7.99944 18.5003 7.43954 18.5003 6.74943C18.5003 6.06018 17.9386 5.49941 17.2503 5.50028Z"
                fill="rgba(51,164,103,1)"
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
      )}
      <Footer />
    </div>
  );
};

export default ZuriLandingPage;
