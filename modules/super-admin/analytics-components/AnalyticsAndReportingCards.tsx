import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cardinfo } from '../../../@types';

const AnalyticsAndReportingCards = () => {
  const [analyticsData, setAnalyticsData] = useState<cardinfo[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5YTcwOTllLTM0ZTQtNGU0OS04ODU2LTE1YWI2ZWQxMzgwYyIsImlhdCI6MTY5NzQ2ODM0MH0.UZ0CgNydpooLXFygcTgbjE6EHEQMIcFH5rjHFXpi8_w';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/data/';

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const result = await response.json();

        if (Array.isArray(result.data)) {
          setAnalyticsData(result.data);
        } else {
          console.error('Data is not an array:', result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingState(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="max-w-[1270px] mx-auto mt-10 font-manropeL lg:max-w-[1100px] xl:max-w-[1270px] 2xl:max-w-[1520px]">
        <div className="grid gap-4 px-6 sm:grid-cols-3 md:grid-cols-3  sm:gap-6">
          {loadingState ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse px-5 border border-white-200 bg-white-100 rounded-lg py-6 min-w-[300px] sm:min-w-0">
                <div className="flex justify-between items-center">
                  <div className="font-light text-[15px] text-custom-color30 bg-[#E6F5EA] h-5 w-1/2"></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-[30px] font-bold bg-[#E6F5EA] h-7 w-1/3"></div>
                  <div className="flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]">
                    <div className="bg-white h-5 w-6"></div>
                    <div className="bg-white h-5 w-14"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            analyticsData.slice(0, 3).map((items, index) => (
              <div
                key={index}
                className={`px-5 border border-white-200 bg-white-100  rounded-lg py-6 ${
                  index === 0 ? 'lg:order-last' : ''
                } min-w-[300px] sm:min-w-0`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-light text-[15px] text-custom-color30">{items.title}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <h1 className="text-[30px] font-bold">{items.amount}</h1>
                  <div className="flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]">
                    <Image src="/assets/tsImages/arrow-up.svg" alt="kmenu" width={17} height={17} className="object-contain" />
                    <p className="text-[14px] text-brand-green-focused">{`${items.ratio}%`}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="max-w-[1270px] mx-auto mt-5 font-manropeL lg:max-w-[1100px] xl:max-w-[1270px] 2xl:max-w-[1520px]">
        <div className="flex overflow-x-auto over px-4 sm:grid gap-2 sm:grid-cols-3 md:grid-cols-3 no-scrollbar">
          {loadingState ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse px-5 border border-white-200 bg-white-100 rounded-lg py-6 mx-2 min-w-[300px] sm:min-w-0">
                <div className="flex justify-between items-center">
                  <div className="font-light text-[15px] text-custom-color30 bg-[#E6F5EA] h-5 w-1/2"></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-[30px] font-bold bg-[#E6F5EA] h-7 w-1/3"></div>
                  <div className="flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]">
                    <div className="bg-white h-5 w-6"></div>
                    <div className="bg-white h-5 w-14"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            analyticsData.slice(3).map((items, index) => (
              <div
                key={index}
                className="px-5 border border-white-200 bg-white-100  rounded-lg py-6 mx-2 min-w-[300px] sm:min-w-0"
              >
                <div className="flex justify-between items-center">
                  <p className="font-light text-[15px] text-custom-color30">{items.title}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <h1 className="text-[30px] font-bold">{index === 0 ? '\u20A6' + items.amount : items.amount}</h1>
                  <div className="flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]">
                    <Image src="/assets/tsImages/arrow-up.svg" alt="kmenu" width={17} height={17} className="object-contain" />
                    <p className="text-[14px] text-brand-green-focused">{`${items.ratio}%`}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AnalyticsAndReportingCards;
