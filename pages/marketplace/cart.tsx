import React, { MouseEvent, useState } from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import ProductCard from '../../modules/shop/component/cart/checkout/ProductCard';
import CartItem from '../../modules/shop/component/cart/checkout/CartItem';
import Summary from '@modules/shop/component/cart/checkout/Summary';
import { CartItemProps, ViewedProductCardProps } from '../../@types';

export default function Cart() {

  const ViewedProducts: ViewedProductCardProps[] = [
    {
      id: "1",
      productImage: "/assets/images/image-zuri-7.png",
      productPrice: 100,
      discountPercentage: 60,
      productRating: 3,
      productSeller: "Mark Essien",
      productTitle: "Webinar and Course Slide Template....",
    },{
      id: "2",
      productImage: "/assets/images/image-zuri-8.png",
      productPrice: 100,
      productRating: 4,
      productSeller: "Mark Essien",
      productTitle: "Webinar and Course Slide Template....",
    },{
      id: "3",
      productImage: "/assets/images/image-zuri-9.png",
      productPrice: 100,
      discountPercentage: 60,
      productRating: 3,
      productSeller: "Mark Essien",
      productTitle: "Webinar and Course Slide Template....",
    },{
      id: "4",
      productImage: "/assets/images/image-zuri-10.png",
      productPrice: 100,
      productRating: 3,
      productSeller: "Mark Essien",
      productTitle: "Webinar and Course Slide Template....",
      tag: "Top Picks",
      tagBackground: "bg-[#515b63]"
    },
  ]

  const CartProducts: CartItemProps[] = [
    {
      productId: "1",
      productImage: "/assets/images/image-zuri-1.png",
      productTitle: "Moodring: Cute Shop",
      productSize: "medium",
      productColor: "blue",
      productSeller: "Artel Market",
      productPrice: 100,
    },
    {
      productId: "2",
      productImage: "/assets/images/image-zuri-2.png",
      productTitle: "Moodring: Cute Shop",
      productSize: "medium",
      productColor: "blue",
      productSeller: "Artel Market",
      productPrice: 100,
    },
    {
      productId: "3",
      productImage: "/assets/images/image-zuri-3.png",
      productTitle: "Moodring: Cute Shop",
      productSize: "medium",
      productColor: "blue",
      productSeller: "Artel Market",
      productPrice: 100,
    },{
      productId: "4",
      productImage: "/assets/images/image-zuri-4.png",
      productTitle: "Moodring: Cute Shop",
      productSize: "medium",
      productColor: "blue",
      productSeller: "Artel Market",
      productPrice: 100,
    },
    {
      productId: "5",
      productImage: "/assets/images/image-zuri-5.png",
      productTitle: "Moodring: Cute Shop",
      productSize: "medium",
      productColor: "blue",
      productSeller: "Artel Market",
      productPrice: 100,
    },
    {
      productId: "6",
      productImage: "/assets/images/image-zuri-6.png",
      productTitle: "Moodring: Cute Shop",
      productSize: "medium",
      productColor: "blue",
      productSeller: "Artel Market",
      productPrice: 100,
    }
  ]

  const [productCards,setProductCards] = useState(ViewedProducts);
  const [cartItems,setCartItems] = useState(CartProducts);

  const closeHandler = (event: MouseEvent<HTMLElement>) => {
    
    let id = event.currentTarget.id
    let recentlyViewedProducts = productCards.filter((product) => product.id != id)
    setProductCards(recentlyViewedProducts)
  }


  function removeProductHandler(event: MouseEvent<HTMLButtonElement>) {
    let productId = event.currentTarget.id;
    console.log(productId)
    let cartProductsItems = cartItems.filter((product) => (product.productId != productId))
    setCartItems(cartProductsItems);
  }


  const cartProductItems = cartItems.map((cartItem) => (<CartItem
    key={cartItem.productId}
    productId={cartItem.productId}
    productColor={cartItem.productColor}
    productTitle={cartItem.productTitle}
    productImage={cartItem.productImage}
    productSeller={cartItem.productSeller}
    productSize={cartItem.productSize}
    productPrice={cartItem.productPrice}
    removeHandler={removeProductHandler}
  />))

  const recentlyViewed = productCards.map((product) => (<ProductCard
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
            />) )


  
  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar>
      <main className="max-w-[1240px] mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0">
        <section className="w-full mt-[3%] flex flex-col md:flex-col lg:flex-row lg:gap-5 ">
          <div className="w-full flex flex-col justify-center md:w-full lg:w-4/5 ">
            <h1 className="text-2xl mb-7 font-manropeEB">Shopping Cart ({cartItems.length})</h1>
            {cartProductItems}
           
          </div>
          <div className="flex md:flex-none justify-center md:mx-0">
            <Summary />
          </div>
        </section>

        <section className="w-full flex flex-col mt-[50px] mb-[10%]">
          <h1 className="text-[35px] font-bold md:ml-0 font-manropeEB">Recently Viewed</h1>
          <div
            className="w-full flex flex-row overflow-scroll gap-x-3 md:overflow-hidden items-center lg:items-start lg:justify-normal md:flex-row md:justify-center md:flex-wrap 
                            md:gap-x-4 gap-y-4  lg:gap-x-2 mt-4 "
          >{recentlyViewed}
          
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
