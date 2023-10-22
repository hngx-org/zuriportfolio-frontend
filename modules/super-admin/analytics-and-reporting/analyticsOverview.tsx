import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { DateObject } from 'react-multi-date-picker';
import { ToastContainer, toast } from 'react-toastify';
import { ImSpinner8 } from 'react-icons/im';

interface zaProps {
  dateRange: DateObject[];
  reportClicked: Boolean;
}

const AnalyticsOverview: React.FC<zaProps> = ({ dateRange, reportClicked }) => {
  type BusinessAray = {
    title: string;
    amount: any;
    ratio: string;
  };
  const [BusinessOverviewArray, setBusinessOverview] = useState<any>([]);
  const [loadingState, setLoadingState] = useState<Boolean>(false);
  const [showItems, setShowItems] = useState<Boolean>(true);

  useEffect(() => {
    if (reportClicked && dateRange.length === 2) {
      const starttDate = dateRange[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const enddDate = dateRange[1].format('YYYY-MM-DDTHH:mm:ssZ');
      setLoadingState(true);
      const bearerToken = localStorage.getItem('zpt');
      fetch(
        `https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/analytics/data/?start_date=${starttDate}&end_date=${enddDate}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setBusinessOverview(data.data);
          console.log(data);
          setLoadingState(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingState(false);
          toast.error('No Data to display');
        });
    } else {
      const bearerToken = localStorage.getItem('zpt');
      setLoadingState(true);
      fetch('https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/analytics/data/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBusinessOverview(data.data);
          setLoadingState(false);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          setLoadingState(false);
          toast.error('Internal Server Error');
        });
    }
  }, [reportClicked]);

  const toggleVisibility = () => {
    setShowItems(!showItems);
  };

  const formattedAmount = (amount: number | string) => {
    if (amount !== undefined) {
      const amountValue = typeof amount === 'string' ? parseFloat(amount) : amount;
      const roundedValue = Math.round(amountValue);
      const formattedValue =
        roundedValue % 1 === 0 ? roundedValue.toLocaleString().replace('.00', '') : amountValue.toLocaleString();
      return formattedValue;
    } else {
      return '';
    }
  };

  const sales = formattedAmount(BusinessOverviewArray[3]?.amount);

  return (
    <>
      <div className="max-[1310px]:px-[1rem] w-full max-[760px]:pr-0 max-[834px]:px-[2.5rem] max-[800px]:pl-[2.5rem] max-[500px]:px-[1.5rem] max-[500px]:pr-0">
        <div className="max-w-[77.5rem] w-full mt-[3rem] min-[1536px]:max-w-[1536px] flex flex-col gap-[0.9375rem] rounded-[0.5rem] border border-[#E1E3E2] bg-[#FFF] mx-auto max-[730px]:max-w-[100%] max-[800px]:rounded-tr-none max-[760px]:rounded-br-none max-[760px]:border-r-0">
          <div className="px-[1rem] py-[0.75rem] max-w-[77.5rem] w-full border-b-[0.0625rem] border-[#EAECF0]">
            <p className="font-manropeL font-medium leading-[1.75rem] text-[1.25rem] text-gray-900">
              Analytics Overview
            </p>
          </div>
          <div className="w-full">
            <div className="max-[778px]:overflow-x-scroll no-scrollbar">
              <div className="flex items-center justify-between px-[1.5rem] py-[0.75rem] bg-[#FCFCFD] border-b-[0.0625rem] border-[#EAECF0] max-[730px]:flex max-[730px]:gap-[1.5rem] max-[730px]:w-fit">
                <div className="flex items-center gap-0.25rem max-w-[8.5rem] w-full max-[834px]:max-w-[6rem] max-[778px]:min-w-[6rem]">
                  <h6 className="text-[0.875rem] font-manropeL text-[#444846] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                    Total Users
                  </h6>
                  <Image
                    src={`${showItems ? '/assets/images/reports/upp.svg' : '/assets/images/arrow-down.svg'}`}
                    onClick={toggleVisibility}
                    className="cursor-pointer"
                    alt="Down Arrow"
                    width={16}
                    height={16}
                  />
                </div>
                <div className="max-w-[10.3rem] w-full max-[834px]:max-w-[5rem] max-[778px]:min-w-[5rem] max-[730px]:ml-0">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[5rem]">
                    Active users
                  </p>
                </div>
                <div className="max-w-[10rem] w-full max-[834px]:max-w-[5.44rem] max-[778px]:min-w-[5.44rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                    Total product
                  </p>
                </div>
                <div className="max-w-[8.63rem] w-full max-[834px]:max-w-[5.69rem] max-[778px]:min-w-[5.69rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                    Total Portfolio
                  </p>
                </div>
                <div className="max-w-[13.8rem] w-full max-[834px]:max-w-[5rem] max-[778px]:min-w-[5rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[5rem]">
                    Total Sales
                  </p>
                </div>
                <div className="max-w-[9.25rem] w-full max-[834px]:max-w-[4.38rem] max-[778px]:min-w-[4.38rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[5rem]">
                    Total order
                  </p>
                </div>
              </div>
              {loadingState ? (
                <ImSpinner8 className="w-6 h-6 mx-auto my-[3rem] mb-2rem text-brand-success-primary animate-spin" />
              ) : (
                <div
                  className={`"items-center transition-all duration-500 flex justify-between px-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:gap-[1.5rem] max-[730px]:w-fit max-[730px]:pr-0" ${
                    showItems ? 'block' : 'hidden'
                  }`}
                >
                  <div className="max-w-[8.5rem] w-full max-[834px]:max-w-[3.75rem] max-[778px]:min-w-[6rem]">
                    <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                      {formattedAmount(BusinessOverviewArray[0]?.amount)}
                    </h6>
                  </div>
                  <div className="max-w-[10.3rem] w-full max-[834px]:max-w-[4.5rem] max-[778px]:min-w-[5rem]">
                    <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[5rem]">
                      {formattedAmount(BusinessOverviewArray[1]?.amount)}
                    </p>
                  </div>
                  <div className="max-w-[10rem] w-full max-[834px]:max-w-[3.5rem] max-[778px]:min-w-[5.44rem]">
                    <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                      {formattedAmount(BusinessOverviewArray[2]?.amount)}
                    </p>
                  </div>
                  <div className="max-w-[8.63rem] w-full max-[834px]:max-w-[4.31rem] max-[778px]:min-w-[5.69rem]">
                    <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                      {formattedAmount(BusinessOverviewArray[5]?.amount)}
                    </p>
                  </div>
                  <div className="max-w-[13.8rem] w-full max-[834px]:max-w-[4.5rem] max-[778px]:min-w-[5rem]">
                    <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[5rem]">
                      &#8358;{sales}
                    </p>
                  </div>
                  <div className="max-w-[9.25rem] w-full max-[834px]:max-w-[4.5rem] max-[778px]:min-w-[4.38rem]">
                    <p className="text-[0.875rem] font-manropeL font-normal text-center text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[#000] max-[730px]:w-[5rem]">
                      {formattedAmount(BusinessOverviewArray[4]?.amount)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="max-w-77.5rem w-full h-[0.3125rem] bg-[#EAECF0]"></div>
            <div className="h-[0.94rem] rounded-b-[0.5rem] border-[0.001rem] border-[#EAECF0] max-[760px]:rounded-br-none"></div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AnalyticsOverview;
