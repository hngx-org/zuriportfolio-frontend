import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cardinfo } from '../../../@types';

const AnalyticsAndReportingCards = () => {
  const [analyticsData, setAnalyticsData] = useState<cardinfo[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://team-mirage-super-amind2.onrender.com/api/admin/analytics/data/');
        const result = await response.json();
    
        if (Array.isArray(result.data)) {
          setAnalyticsData(result.data );
        } else {
          console.error('Data is not an array:', result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [analyticsData]);
  

  return (
    <div>
      <section className="max-w-[1270px] mx-auto mt-10 font-manropeL lg:max-w-[1100px] xl:max-w-[1270px] 2xl:max-w-[1520px]">
        <div className="grid gap-4 px-6 sm:grid-cols-3 md:grid-cols-3  sm:gap-6">
          {analyticsData.slice(0, 3).map((items, index) => (
            <div
              key={index}
              className={`px-5 border border-white-200 bg-white-100  rounded-lg py-6 ${index === 0 ? 'lg:order-last' : ''}`}
            >
              <div className="flex justify-between items-center">
                <p className="font-light text-[15px] text-custom-color30">{items.title}</p>
                <Image src="/assets/tsImages/more 2.png" alt="kmenu" width={25} height={25} className="object-contain" />
              </div>
              <div className='flex justify-between items-center mt-1'>
                <h1 className='text-[30px] font-bold'>{items.amount}</h1>
                <div className='flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]'>
                  <Image src="/assets/tsImages/arrow-up.png" alt='kmenu' width={17} height={17} className='object-contain' />
                  <p className='text-[14px] text-brand-green-focused'>{`${items.ratio}%`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='max-w-[1270px] mx-auto mt-5 font-manropeL lg:max-w-[1100px] xl:max-w-[1270px] 2xl:max-w-[1520px]'>
        <div className='flex overflow-x-auto over px-4 sm:grid gap-2 sm:grid-cols-3 md:grid-cols-3 no-scrollbar'>
          {analyticsData.slice(3).map((items, index) => (
            <div key={index} className='px-5 border border-white-200 bg-white-100  rounded-lg py-6 mx-2 min-w-[300px] sm:min-w-0'>
              <div className='flex justify-between items-center'>
                <p className='font-light text-[15px] text-custom-color30'>{items.title}</p>
                <Image src="/assets/tsImages/more 2.png" alt='kmenu' width={25} height={25} className='object-contain' />
              </div>
              <div className='flex justify-between items-center mt-1'>
                <h1 className='text-[30px] font-bold'>{index === 0 ? `$${items.amount}` : items.amount}</h1>
                <div className='flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]'>
                  <Image src="/assets/tsImages/arrow-up.png" alt='kmenu' width={17} height={17} className='object-contain' />
                  <p className='text-[14px] text-brand-green-focused'>{`${items.ratio}%`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnalyticsAndReportingCards;
