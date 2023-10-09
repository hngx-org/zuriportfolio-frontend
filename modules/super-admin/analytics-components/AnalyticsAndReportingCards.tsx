import React from 'react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { cardinfo } from '../../../@types';



const AnalyticsAndReportingCards = () => {

  const cardDetails: cardinfo[] = [
    {
      title: "Total Products",
      kMenu: "/assets/tsImages/more 2.png",
      price: 1700,
      arUp: "/assets/tsImages/arrow-up.png",
      id: 1
    },
    {
      title: "Total Users",
      kMenu: "/assets/tsImages/more 2.png",
      price: 400,
      arUp: "/assets/tsImages/arrow-up.png",
      id: 2
    },
    {
      title: "Active Users",
      kMenu: "/assets/tsImages/more 2.png",
      price: 259,
      arUp: "/assets/tsImages/arrow-up.png",
      id: 3
    },
  ]

  return (
    <div>
      <section className='max-w-[1270px] mx-auto mt-10 font-manropeL lg:max-w-[1100px] xl:max-w-[1270px]'>
        <div className='grid gap-4 px-6 sm:grid-cols-3 md:grid-cols-3  sm:gap-6'>
          {cardDetails.map((items, index) => (
            <div
              key={items.id}
              className={`px-5 border border-white-200 bg-white-100 shadow-sm rounded-lg py-6 ${index === 0 ? 'lg:order-last' : ''}`}
            >
              <div className='flex justify-between items-center'>
                <p className='font-light text-[15px] text-custom-color30'>{items.title}</p>
                <Image src={items.kMenu} alt='kmenu' width={25} height={25} className='object-contain' />
              </div>
              <div className='flex justify-between items-center mt-1'>
                <h1 className='text-[30px] font-bold'>{items.price}</h1>
                <div className='flex items-center gap-2 rounded-full py-0.5 px-2 bg-green-300 bg-opacity-20'>
                  <Image src={items.arUp} alt='kmenu' width={17} height={17} className='object-contain' />
                  <p className='text-[14px] text-green-700'>10%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className='max-w-[1270px] mx-auto mt-5 font-manropeL lg:max-w-[1100px] xl:max-w-[1270px]'>
        <div className='flex overflow-x-auto over px-4 sm:grid gap-2 sm:grid-cols-3 md:grid-cols-3 no-scrollbar'>
          {cardDetails.map((items, index) => (
            <div key={items.id} className='px-5 border border-white-200 bg-white-100 shadow-sm rounded-lg py-6 mx-2 min-w-[300px] sm:min-w-0'>
              <div className='flex justify-between items-center'>
                <p className='font-light text-[15px] text-custom-color30'>{items.title}</p>
                <Image src={items.kMenu} alt='kmenu' width={25} height={25} className='object-contain' />
              </div>
              <div className='flex justify-between items-center mt-1'>
                <h1 className='text-[30px] font-bold'>{index === 0 ? `$${items.price}` : items.price}</h1>
                <div className='flex items-center gap-2 rounded-full py-0.5 px-2 bg-green-300 bg-opacity-20'>
                  <Image src={items.arUp} alt='kmenu' width={17} height={17} className='object-contain' />
                  <p className='text-[14px] text-green-900'>10%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnalyticsAndReportingCards