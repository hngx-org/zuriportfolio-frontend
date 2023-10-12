import React, { MouseEvent, useState, useEffect, ReactElement, useContext } from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import ProductCard from '../../modules/shop/component/cart/checkout/ProductCard';
import CartItem from '../../modules/shop/component/cart/checkout/CartItem';
import Summary from '@modules/shop/component/cart/checkout/Summary';
import { CartItemProps, ViewedProductCardProps } from '../../@types';
import { getUserCart } from '../../http';
import AuthContext from '../../context/AuthContext';
import EmptyCart from '@modules/shop/component/cart/EmptyCart';

export default function Cart() {


  const ViewedProducts: ViewedProductCardProps[] = [
    {
      id: '1',
      productImage: '/assets/images/image-zuri-7.png',
      productPrice: 100,
      discountPercentage: 60,
      productRating: 3,
      productSeller: 'Mark Essien',
      productTitle: 'Webinar and Course Slide Template....',
    },
    {
      id: '2',
      productImage: '/assets/images/image-zuri-8.png',
      productPrice: 100,
      productRating: 4,
      productSeller: 'Mark Essien',
      productTitle: 'Webinar and Course Slide Template....',
    },
    {
      id: '3',
      productImage: '/assets/images/image-zuri-9.png',
      productPrice: 100,
      discountPercentage: 60,
      productRating: 3,
      productSeller: 'Mark Essien',
      productTitle: 'Webinar and Course Slide Template....',
    },
    {
      id: '4',
      productImage: '/assets/images/image-zuri-10.png',
      productPrice: 100,
      productRating: 3,
      productSeller: 'Mark Essien',
      productTitle: 'Webinar and Course Slide Template....',
      tag: 'Top Picks',
      tagBackground: 'bg-[#515b63]',
    },
  ]


  const authContext = useContext(AuthContext);
  const {user} = authContext
  const [productCards,setProductCards] = useState(ViewedProducts);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);


  useEffect(() => {
      async function cartFetch() {
        const carts = await getUserCart(user?.token as string)
        console.log(carts);
        setCartItems(carts)
      }
      cartFetch()
  },[])


  const closeHandler = (event: MouseEvent<HTMLElement>) => {
    let id = event.currentTarget.id;
    let recentlyViewedProducts = productCards.filter((product) => product.id != id);
    setProductCards(recentlyViewedProducts);
  };


  function removeProductHandler(productId: string) {
    let cartProductsItems = cartItems.filter((product) => product.productId != productId);
    setCartItems(cartProductsItems)
  }


  const cartProductItems = cartItems.map((cartItem) => (
    <CartItem
      key={cartItem.productId}
      productId={cartItem.productId}
      productColor={cartItem.productColor}
      productTitle={cartItem.productTitle}
      productImage={cartItem.productImage}
      productSeller={cartItem.productSeller}
      productSize={cartItem.productSize}
      productPrice={cartItem.productPrice}
      removeHandler={removeProductHandler}
    />
  ));

  const recentlyViewed = productCards.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      productImage={product.productImage}
      productPrice={product.productPrice}
      discountPercentage={product.discountPercentage}
      productRating={product.productRating}
      productSeller={product.productSeller}
      productTitle={product.productTitle}
      tag={product.tag}
      tagBackground={product.tagBackground}
      closeHandler={closeHandler}
    />
  ));

  
  
  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar>
      <main className="max-w-[1240px] mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0">
      { cartItems.length > 0 ?
      <>
        <section className="w-full mt-[3%] flex flex-col lg:flex-row lg:gap-5 ">
          <div className="w-full flex flex-col justify-center md:w-full lg:w-4/5 ">
            <h1 className="text-2xl mb-7 font-manropeEB">Shopping Cart ({cartItems.length}) </h1>
            {cartProductItems}
          </div>
          <div className="flex md:flex-none justify-center md:mx-0">
            <Summary />
          </div>
        </section>

        <section className="w-full flex flex-col mt-[50px] mb-[10%]">
          <h1 className="text-[35px] font-bold md:ml-0 font-manropeEB">Recently Viewed</h1>
          <div
            className="w-full flex flex-row overflow-scroll gap-x-8 md:overflow-hidden items-center lg:items-start lg:justify-between md:flex-row md:justify-center md:flex-wrap 
                            md:gap-x-4 gap-y-4  lg:gap-x-2 mt-4 "
          >
            {recentlyViewed}
          </div>
        </section>
        </> :
        <>
        <EmptyCart></EmptyCart>
        </>
      }
      </main>
    </MainLayout>
  );
}
