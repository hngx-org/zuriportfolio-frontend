import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import ProductCard from '../../modules/shop/component/cart/checkout/ProductCard';
import CartItem from '../../modules/shop/component/cart/checkout/CartItem';
import Summary from '@modules/shop/component/cart/checkout/Summary';

export default function cart() {
  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar>
      <main className="flex w-full flex-col justify-between mb-8">
        <section className="mx-[13%] mt-[3%] flex flex-col md:flex-col lg:flex-row gap-4">
          <div className="w-full flex flex-col md:w-full lg:w-4/5 ">
            <h1 className="text-2xl mb-7 font-manropeEB">Shopping Cart (6)</h1>

            <CartItem
              productColor="blue"
              productTitle="Moodring: Cute Shop"
              productImage="/assets/images/image-zuri-1.png"
              productSeller="Artel Market"
              productSize="medium"
              productPrice={100}
            />
            <CartItem
              productColor="blue"
              productTitle="Jelly Bean: Fun Shop"
              productImage="/assets/images/image-zuri-2.png"
              productSeller="Artel Market"
              productSize="medium"
              productPrice={100}
            />
            <CartItem
              productColor="blue"
              productTitle="Webinar and Course"
              productImage="/assets/images/image-zuri-3.png"
              productSeller="Artel Market"
              productSize="medium"
              productPrice={100}
            />
            <CartItem
              productColor="blue"
              productTitle="4in1 Big Bundle"
              productImage="/assets/images/image-zuri-4.png"
              productSeller="Artel Market"
              productSize="medium"
              productPrice={100}
            />
            <CartItem
              productColor="blue"
              productTitle="Square Space 7.1"
              productImage="/assets/images/image-zuri-5.png"
              productSeller="Artel Market"
              productSize="medium"
              productPrice={100}
            />
            <CartItem
              productColor="blue"
              productTitle="Digital illustration"
              productImage="/assets/images/image-zuri-6.png"
              productSeller="Artel Market"
              productSize="medium"
              productPrice={100}
            />
          </div>
          <div className="flex md:flex-none justify-center md:mx-0">
            <Summary />
          </div>
        </section>

        <section className="flex flex-col md:mx-[10%] mt-[50px]">
          <h1 className="text-[35px] font-bold ml-5 md:ml-0 font-manropeEB">Recently Viewed</h1>

          <div className="flex flex-col md:flex-row items-center gap-x-8 gap-y-4 md:gap-x-4 md:flex-wrap mt-4 lg:justify-between">
            <ProductCard
              productImage="/assets/images/image-zuri-7.png"
              productPrice={100}
              discountPercentage={60}
              productRating={3}
              productSeller="Mark Essien"
              productTitle="Webinar and Course Slide Template"
              cardStyle="border border-[#d5dbdd] rounded-md lg:max-w-[340px] md:w-1/2 md:max-w-[290px] flex flex-col p-3 "
            />

            <ProductCard
              productImage="/assets/images/image-zuri-8.png"
              productPrice={100}
              productRating={3}
              productSeller="Mark Essien"
              productTitle="Webinar and Course Slide Template"
              cardStyle="border border-[#d5dbdd] rounded-md lg:max-w-[340px] md:w-1/2 md:max-w-[290px] flex flex-col p-3 "
            />

            <ProductCard
              productImage="/assets/images/image-zuri-9.png"
              productPrice={100}
              discountPercentage={60}
              productRating={3}
              productSeller="Mark Essien"
              productTitle="Webinar and Course Slide Template"
              cardStyle="border border-[#d5dbdd] rounded-md lg:max-w-[340px] md:w-1/2 md:max-w-[290px] flex flex-col p-3 "
            />

            <ProductCard
              productImage="/assets/images/image-zuri-10.png"
              productPrice={100}
              tag="Top Picks"
              productRating={3}
              productSeller="Mark Essien"
              productTitle="Webinar and Course Slide Template"
              cardStyle="border border-[#d5dbdd] rounded-md lg:max-w-[340px] md:w-1/2 md:max-w-[290px] flex flex-col p-3 "
              tagBackground="bg-[#515b63]"
            />
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
