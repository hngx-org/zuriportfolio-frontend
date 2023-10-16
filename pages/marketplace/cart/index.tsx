import React, { MouseEvent, useState, useEffect, ReactElement, useContext } from 'react';
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
import { getDiscountPercentage } from '../../../helpers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart Summary',
  description: 'A page showing the cart summary of user',
};

export default function Cart() {
  const { auth } = useAuth();

  const defSummary = { subtotal: 1, discount: 0, VAT: 0, total: 1 };
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProductProp[]>([]);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartSummary, setCartSummary] = useState(defSummary);

  useEffect(() => {
    async function cartFetch() {
      let carts;
      let summary;

      if (auth?.token) {
        carts = await getUserCart(auth?.token as string);
        summary = await getCartSummary(auth?.token as string);
        summary = summary;
        setCartSummary(summary);
      } else {
        carts = JSON.parse(localStorage.getItem('products') as string);
        const cart_items: CartItemProps[] = carts;
        const productIdArray = cart_items.map((product) => product.productId);
        const cartSum = await getGuestCartSummary(productIdArray);
        setCartSummary(cartSum);
      }
      setCartItems(carts);
      setIsLoading(false);
    }
    cartFetch();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const closeHandler = (event: MouseEvent<HTMLElement>) => {
    let id = event.currentTarget.id;
    let recentlyViewedProducts = recentlyViewed.filter((product) => product.product.id != id);
    setRecentlyViewed(recentlyViewedProducts);
  };

  async function removeProductHandler(productId: string) {
    const items = [...cartItems];

    let cartProductsItems = cartItems.filter((product) => product.id != productId);

    if (auth?.token) {
      removeFromCart(productId, auth?.token as string);
      const summary = await getCartSummary(auth?.token as string);
      setCartSummary(summary);
      setCartItems(cartProductsItems);
    } else {
      let cartItems = items.filter((product) => product.productId != productId);
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
      {isLoading ? (
        <CartPageSkeleton></CartPageSkeleton>
      ) : (
        <main className="max-w-[1240px] mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0">
          {cartItems.length > 0 ? (
            <>
              <section className="w-full mt-[3%] flex flex-col lg:flex-row lg:gap-5 ">
                <div className="w-full flex flex-col justify-center md:w-full lg:justify-normal lg:w-4/5 ">
                  <h1 className="text-2xl mb-7 font-manropeEB">Shopping Cart ({cartItems.length}) </h1>
                  {cartProductItems}
                </div>
                <div className="flex md:flex-none justify-center md:mx-0">
                  <Summary token={auth?.token ? (auth.token as string) : ''} summary={cartSummary} />
                </div>
              </section>

              <section className="w-full flex flex-col mt-[50px] mb-[10%]">
                <h1 className="text-[35px] font-bold md:ml-0 font-manropeEB">Recently Viewed</h1>
                <div
                  className="w-full flex flex-row overflow-scroll lg:min-h-[200px] gap-x-8 md:overflow-hidden items-center lg:items-stretch lg:justify-normal 
                md:flex-row md:justify-center md:flex-wrap md:gap-x-4 gap-y-4 lg:gap-x-4 mt-4 "
                >
                  {recentlyViewedProducts}
                </div>
              </section>
            </>
          ) : (
            <EmptyCart></EmptyCart>
          )}
        </main>
      )}
    </MainLayout>
  );
}
