import React, { MouseEvent, useState, useEffect, ReactElement, useContext } from 'react';
import Head from 'next/head';
import MainLayout from '../../../components/Layout/MainLayout';
import ProductCard from '../../../modules/shop/component/cart/checkout/ProductCard';
import CartItem from '../../../modules/shop/component/cart/checkout/CartItem';
import Summary from '@modules/shop/component/cart/checkout/Summary';
import { CartItemProps, RecentlyViewedProductProp, ViewedProductCardProps } from '../../../@types';
import {
  getGuestCartSummary,
  getCartSummary,
  getRecentlyViewedProducts,
  getUserCart,
  removeFromCart,
} from '../../../http/checkout';
import { useAuth } from '../../../context/AuthContext';
import EmptyCart from '@modules/shop/component/cart/EmptyCart';
import CartPageSkeleton from '@modules/shop/component/cart/checkout/CartPageSkeleton';
import { destructureProducts, getDiscountPercentage } from '../../../helpers';
import { Metadata } from 'next';
import { useCart } from '@modules/shop/component/CartContext';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader/loader2';
import { BiTrash } from 'react-icons/bi';

export default function Cart() {
  const { auth } = useAuth();

  const defSummary = { subtotal: 1, discount: 0, VAT: 0, total: 1 };
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProductProp[]>([]);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartSummary, setCartSummary] = useState(defSummary);
  const { setCartCountNav } = useCart();

  useEffect(() => {
    async function cartFetch() {
      let carts;
      let summary;
      const token = localStorage.getItem('zpt');
      localStorage.setItem('trans_token',"")

      if (token) {
        carts = await getUserCart(token);
        summary = await getCartSummary(token);
        const recentViewedProduct = await getRecentlyViewedProducts(token);
        setRecentlyViewed(recentViewedProduct);
        summary = summary;
        setCartSummary(summary);
      } else {
        const cartItems = localStorage.getItem('products')
          ? JSON.parse(localStorage.getItem('products') as string)
          : [];

        carts = destructureProducts(cartItems);

        const productIdArray = carts.map((product) => product.productId);

        const cartSum = await getGuestCartSummary(productIdArray);
        setCartSummary(cartSum);
      }
      setCartItems(carts);
      setIsLoading(false);
    }
    cartFetch();
  }, []);

  const closeHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    let id = event.currentTarget.id;
    let recentlyViewedProducts = recentlyViewed.filter((product) => product.product.id != id);
    setRecentlyViewed(recentlyViewedProducts);
  };

  const clearCart = async() => {
    const token = localStorage.getItem('zpt');
    if (token) {
        // await clearCart(token)
    } else {
      localStorage.setItem('products',"")
      setCartItems([]);
    }
  }

  async function removeProductHandler(productId: string) {
    const items = [...cartItems];

    let cartProductsItems = cartItems.filter((product) => product.id != productId);

    if (auth?.token) {
      removeFromCart(productId, auth?.token as string);
      const summary = await getCartSummary(auth?.token as string);

      setCartCountNav(items.length - 1);
      setCartSummary(summary);
      setCartItems(cartProductsItems);
    } else {
      let cartItems = items.filter((product) => product.productId != productId);
      setCartCountNav(cartItems.length);

      localStorage.setItem('products', JSON.stringify(cartItems));
      setCartItems(cartItems);
    }
  }

  const cartProductItems =
    cartItems.length > 0
      ? cartItems.map((cartItem, index) => (
          <CartItem
            key={index}
            id={auth?.token ? cartItem.id : cartItem.productId}
            productId={cartItem.productId}
            productColor={cartItem.productColor}
            productTitle={cartItem.productTitle}
            productDescription={cartItem.productDescription}
            productImage={cartItem.productImage}
            productSeller={cartItem.productSeller}
            productSize={cartItem.productSize}
            productPrice={cartItem.productPrice}
            productDiscount={cartItem.productDiscount}
            removeHandler={removeProductHandler}
          />
        ))
      : null;

  const recentlyViewedProducts = recentlyViewed.map((product, index) => (
    <ProductCard
      key={index}
      id={product.product.id}
      productImage={product.product.image_url}
      productPrice={Number(product.product.price)}
      discountPercentage={getDiscountPercentage(product.product.price, product.product.discount_price)}
      productRating={product.product.rating ?? (index % 5) + 1}
      productSeller={product.product.shop.name}
      productTitle={product.product.name}
      closeHandler={closeHandler}
    />
  ));

  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar>
      <Head>
        <title>Marketplace | Cart</title>
        <meta property="og:title" content="Marketplace | Cart" key="title" />
        <link rel="icon" href="/assets/zuriLogo.svg" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zuri Marketplace" />

        <meta key="metaname" itemProp="name" name="title" content="Zuri Marketplace" />
        <meta key="metadescription" itemProp="description" name="description" content="View your cart Items" />
        <meta name="keywords" content="Zuri, marketplace, cart" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="language" content="English" />

        <meta key="twitter:title" name="twitter:title" content="Zuri Marketplace" />
        <meta key="twitter:description" name="twitter:description" content="Zuri marketplace cart" />

        <meta property="og:url" content="https://staging.zuri.team/marketplace/cart" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuri Marketplace" />
        <meta property="og:description" content="View your cart items" />
      </Head>

      {isLoading ? (
        // <CartPageSkeleton></CartPageSkeleton>
        <div className="h-[550px]">
          <Loader></Loader>
        </div>
      ) : (
        <main className="max-w-[1240px] mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0">
          {cartItems.length > 0 ? (
            <>
              <section className="w-full mt-[3%] flex flex-col lg:flex-row lg:gap-5 ">
                <div className="w-full flex flex-col justify-center md:w-full lg:justify-normal lg:w-4/5 ">

                  <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-manropeEB">Shopping Cart ({cartItems.length}) </h1>
                    {/* <span role='button' onClick={clearCart} className="flex items-center justify-center border border-[#d5dbdd] px-4 py-2 hover:bg-[#EF4C45] hover:text-[#fff] cursor-pointer rounded-md text-gray-300 group-hover:text-[#fff]">
                      <BiTrash />
                      <span>Clear Cart</span>
                    </span> */}
                  </div>

                  {cartProductItems}
                </div>
                <div className="flex md:flex-none justify-center lg:w-[35%] md:mx-0">
                  <Summary token={auth?.token ? (auth.token as string) : ''} summary={cartSummary} />
                </div>
              </section>

              {auth?.token && (
                <section className="w-full flex flex-col mt-[50px] mb-[10%]">
                  <h1 className="text-[35px] font-bold md:ml-0 font-manropeEB">Recently Viewed</h1>
                  <div
                    className="w-full flex flex-row overflow-scroll lg:min-h-[200px] gap-x-8 md:overflow-hidden 
                    lg:items-center lg:justify-normal 
                    md:flex-row md:justify-center md:flex-wrap md:gap-x-4 gap-y-4 lg:gap-x-4 mt-4 "
                  >
                    {recentlyViewedProducts}
                  </div>
                </section>
              )}
            </>
          ) : (
            <EmptyCart></EmptyCart>
          )}
        </main>
      )}
    </MainLayout>
  );
}
