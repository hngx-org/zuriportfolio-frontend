import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import ProductCard from '../../modules/shop/component/cart/checkout/ProductCard';
import CartItem from '../../modules/shop/component/cart/checkout/CartItem';
import Summary from '@modules/shop/component/cart/checkout/Summary';

export default function cart() {
  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar>
    
      <main className='max-w-[1240px] mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0'>
          <section className="w-full mt-[3%] flex flex-col md:flex-col lg:flex-row lg:gap-5 ">
                <div className='w-full flex flex-col justify-center md:w-full lg:w-4/5 '>
                    <h1 className='text-2xl mb-7 font-manropeEB'>Shopping Cart (6)</h1>
       
                    <CartItem productColor='blue' productTitle='Moodring: Cute Shop' productImage='/assets/images/image-zuri-1.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='Jelly Bean: Fun Shop' productImage='/assets/images/image-zuri-2.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='Webinar and Course' productImage='/assets/images/image-zuri-3.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='4in1 Big Bundle' productImage='/assets/images/image-zuri-4.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='Square Space 7.1' productImage='/assets/images/image-zuri-5.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='Digital illustration' productImage='/assets/images/image-zuri-6.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
       
                </div>
                <div className="flex md:flex-none justify-center md:mx-0">
                <Summary />
                </div>
                
          </section>

          <section className='w-full flex flex-col mt-[50px] mb-[10%]'>
            <h1 className='text-[35px] font-bold md:ml-0 font-manropeEB'>Recently Viewed</h1>

            <div className="w-full flex flex-row overflow-scroll gap-x-3 md:overflow-hidden items-center md:flex-row md:justify-center md:flex-wrap 
                            md:gap-x-4 gap-y-4 lg:justify-between lg:gap-x-2 mt-4 ">
                <ProductCard productImage='/assets/images/image-zuri-7.png' productPrice={100} discountPercentage={60}
                        productRating={3} productSeller='Mark Essien' productTitle='Webinar and Course Slide Template....'
                        cardStyle='border border-[#d5dbdd] rounded-md lg:w-1/4 md:w-1/2 md:max-w-[290px] flex flex-col p-3 ' />

                <ProductCard productImage='/assets/images/image-zuri-8.png' productPrice={100} 
                        productRating={3} productSeller='Mark Essien' productTitle='Webinar and Course Slide Template....'
                        cardStyle='border border-[#d5dbdd] rounded-md lg:w-1/4 md:w-1/2 md:max-w-[290px] flex flex-col p-3 ' />

                <ProductCard productImage='/assets/images/image-zuri-9.png' productPrice={100} discountPercentage={60}
                        productRating={3} productSeller='Mark Essien' productTitle='Webinar and Course Slide Template....'
                        cardStyle='border border-[#d5dbdd] rounded-md lg:w-1/4 md:w-1/2 md:max-w-[290px] flex flex-col p-3 ' />

                <ProductCard productImage='/assets/images/image-zuri-10.png' productPrice={100} tag='Top Picks'
                        productRating={3} productSeller='Mark Essien' productTitle='Webinar and Course Slide Template....'
                        cardStyle='border border-[#d5dbdd] rounded-md lg:w-1/4 md:w-1/2 md:max-w-[290px] flex flex-col p-3 ' tagBackground="bg-[#515b63]" />
            </div>
          </section>
      </main>
    </MainLayout>
  );
}
