import React from 'react'
import MainLayout from '../components/Layout/MainLayout'
import ProductCard from '../components/Layout/ProductCard'
import CartItem from '../components/Layout/CartItem'

type Props = {}

export default function cart({}: Props) {
  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar>
    
      <main className='flex w-full flex-col mb-8'>
          <section className="mx-[13%] mt-[3%] flex gap-4">
                <div className='w-3/4 flex flex-col'>
                    <h1 className='text-2xl mb-7'>Shopping Cart (6)</h1>

                    <CartItem productColor='blue' productTitle='Moodring: Cute Shop' productImage='./assets/images/image-zuri-1.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='Jelly Bean: Fun Shop' productImage='./assets/images/image-zuri-2.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='Webinar and Course' productImage='./assets/images/image-zuri-3.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='4in1 Big Bundle' productImage='./assets/images/image-zuri-4.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='Square Space 7.1' productImage='./assets/images/image-zuri-5.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    <CartItem productColor='blue' productTitle='Digital illustration' productImage='./assets/images/image-zuri-6.png' 
                                productSeller='Artel Market' productSize='medium' productPrice={100} />
                    
                    
                </div>
                <div className='h-[300px] w-1/4 border shadow-lg border'>
                </div>
          </section>

          <section className='flex flex-col mx-[12%] mt-[50px]'>
            <h1 className='text-[35px] font-bold'>Recently Viewed</h1>

            <div className="flex justify-between gap-x-8 mt-4">
                <ProductCard productImage='/assets/images/image-zuri-7.png' productPrice={100} discountPercentage={60}
                        productRating={3} productSeller='Mark Essien' productTitle='Webinar and Course Slide Template'
                        cardStyle='border border-[#d5dbdd] w-1/4 rounded-md flex flex-col p-3 items-center' />

                <ProductCard productImage='/assets/images/image-zuri-8.png' productPrice={100} 
                        productRating={3} productSeller='Mark Essien' productTitle='Webinar and Course Slide Template'
                        cardStyle='border border-[#d5dbdd] w-1/4 rounded-md flex flex-col p-3 items-center' />

                <ProductCard productImage='/assets/images/image-zuri-9.png' productPrice={100} discountPercentage={60}
                        productRating={3} productSeller='Mark Essien' productTitle='Webinar and Course Slide Template'
                        cardStyle='border border-[#d5dbdd] w-1/4 rounded-md flex flex-col p-3 items-center' />

                <ProductCard productImage='/assets/images/image-zuri-10.png' productPrice={100} tag='Top Picks'
                        productRating={3} productSeller='Mark Essien' productTitle='Webinar and Course Slide Template'
                        cardStyle='border border-[#d5dbdd] w-1/4 rounded-md flex flex-col p-3 items-center' tagBackground="bg-[#515b63]" />
            </div>
          </section>
      </main>
    </MainLayout>
  )
}