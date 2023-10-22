import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { cardinfo } from '../../../@types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchAnalyticsData = async (bearerToken: string) => {
  try {
    const apiUrl = 'https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/analytics/data/';

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Internal Server Error');
    }

    const result = await response.json();

    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      console.error('Data is not an array:', result.data);
      throw new Error('Data is not in the expected format');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    if (!toast.isActive('error')) {
      toast.error('Could not load card details. Try again!', { toastId: 'error' });
    }
    throw error;
  }
};

const AnalyticsAndReportingCards = () => {
  const [bearerToken, setBearerToken] = useState('');

  const { data: analyticsData, isLoading } = useQuery<cardinfo[]>(['analyticsData', bearerToken], () =>
    fetchAnalyticsData(bearerToken),
  );

  const getTokenFromLocalStorage = () => {
    const tokenFromLocalStorage = localStorage.getItem('zpt');
    if (tokenFromLocalStorage) {
      setBearerToken(tokenFromLocalStorage);
    }
  };

  useEffect(() => {
    getTokenFromLocalStorage();
  }, []);

  const formattedAmount = (amount: number | string) => {
    const amountValue = typeof amount === 'string' ? parseFloat(amount) : amount;
    const roundedValue = Math.round(amountValue);
    const formattedValue =
      roundedValue % 1 === 0 ? roundedValue.toLocaleString().replace('.00', '') : amountValue.toLocaleString();
    return formattedValue;
  };

  return (
    <div>
      <section className="max-w-[1270px] mx-auto mt-10 font-manropeL lg:max-w-[1100px] xl:max-w-[1270px] 2xl:max-w-[1520px]">
        <div className="grid gap-4 px-6 sm:grid-cols-3 md:grid-cols-3  sm:gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse px-5 border border-white-200 bg-white-100 rounded-lg py-6 min-w-[300px] sm:min-w-0"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-light text-[15px] text-custom-color30 bg-[#E6F5EA] h-5 w-1/2"></div>
                    <div className="flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]">
                      <div className="bg-white h-5 w-6"></div>
                      <div className="bg-white h-5 w-14"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="text-[30px] font-bold bg-[#E6F5EA] h-7 w-1/3"></div>
                  </div>
                </div>
              ))
            : Array.isArray(analyticsData) &&
              analyticsData.slice(0, 3).map((items, index) => (
                <div
                  key={index}
                  className={`px-5 border border-white-200 bg-white-100  rounded-lg py-6 ${
                    index === 0 ? 'lg:order-last' : ''
                  } min-w-[300px] sm:min-w-0`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-light text-[15px] text-custom-color30">{items.title}</p>
                    <div className="flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]">
                      <Image
                        src="/assets/tsImages/arrow-up.svg"
                        alt="kmenu"
                        width={17}
                        height={17}
                        className="object-contain"
                      />
                      <p className="text-[14px] text-brand-green-focused">{`${items.ratio}%`}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <h1 className="text-[30px] font-bold">{formattedAmount(items.amount)}</h1>
                  </div>
                </div>
              ))}
        </div>
      </section>

      <section className="max-w-[1270px] mx-auto mt-5 font-manropeL lg:max-w-[1100px] xl:max-w-[1270px] 2xl:max-w-[1520px]">
        <div className="flex overflow-x-auto over px-4 sm:grid gap-2 sm:grid-cols-3 md:grid-cols-3 no-scrollbar">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse px-5 border border-white-200 bg-white-100 rounded-lg py-6 mx-2 min-w-[300px] sm:min-w-0"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-light text-[15px] text-custom-color30 bg-[#E6F5EA] h-5 w-1/2"></div>
                    <div className="flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]">
                      <div className="bg-white h-5 w-6"></div>
                      <div className="bg-white h-5 w-14"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="text-[30px] font-bold bg-[#E6F5EA] h-7 w-1/3"></div>
                  </div>
                </div>
              ))
            : Array.isArray(analyticsData) &&
              analyticsData.slice(3).map((items, index) => (
                <div
                  key={index}
                  className="px-5 text= border border-white-200 bg-white-100  rounded-lg py-6 mx-2 min-w-[300px] sm:min-w-0"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-light text-[15px] text-custom-color30">{items.title}</p>
                    <div className="flex items-center gap-2 rounded-full py-0.5 px-2 bg-[#E6F5EA]">
                      <Image
                        src="/assets/tsImages/arrow-up.svg"
                        alt="kmenu"
                        width={17}
                        height={17}
                        className="object-contain"
                      />
                      <p className="text-[14px] text-brand-green-focused">{`${items.ratio}%`}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <h1 className="text-[30px] font-bold  ">
                      {index === 0 ? '\u20A6' + formattedAmount(items.amount) : formattedAmount(items.amount)}
                    </h1>
                  </div>
                </div>
              ))}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default AnalyticsAndReportingCards;
