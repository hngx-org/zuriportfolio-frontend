import Image from 'next/image';
import React from 'react';
import { DateObject } from 'react-multi-date-picker';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ImSpinner8 } from 'react-icons/im';

interface zaProps {
  dateRange: DateObject[];
  reportClicked: Boolean;
}

const PerformanceData: React.FC<zaProps> = ({ dateRange, reportClicked }) => {
  const [performanceDataArray, setPerformanceDataArray] = useState<any>([]);
  const [showItems, setShowItems] = useState<Boolean>(true);
  const [loadingState, setLoadingState] = useState<Boolean>(false);

  useEffect(() => {
    if (reportClicked && dateRange.length === 2) {
      const starttDate = dateRange[0].format('YYYY-MM-DD');
      const enddDate = dateRange[1].format('YYYY-MM-DD');
      const bearerToken = localStorage.getItem('zpt');
      setLoadingState(true);
      fetch(
        `https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/analytics/performance-data/?start_date=${starttDate}&end_date=${enddDate}`,
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
          setPerformanceDataArray(data.data);
          setLoadingState(false);
          toast.error('No performance data within that Date Range');
        })
        .catch((err) => {
          setLoadingState(false);
        });
    } else {
      const bearerToken = localStorage.getItem('zpt');
      setLoadingState(true);
      fetch('https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/analytics/performance-data/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPerformanceDataArray(data.data);
          console.log(data);
          console.log(data.total_pages);
          setLoadingState(false);
        })
        .catch((err) => {
          setLoadingState(false);
          toast.error('Internal Server Error');
        });
    }
  }, [reportClicked]);

  const toggleVisibility = () => {
    setShowItems(!showItems);
  };

  const router = useRouter();

  const redirectToAnotherPage = () => {
    router.push('/super-admin/analytics-and-reporting/reports/performance-data');
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
  return (
    <>
      <div className="max-[1310px]:px-[1rem] w-full max-[834px]:px-[2.5rem] max-[760px]:pr-0 max-[830px]:px-[2.5rem] max-[500px]:px-[1.5rem] max-[500px]:pr-0 mb-[3rem]">
        <div className="max-w-[77.5rem] w-full mt-[3rem] min-[1536px]:max-w-[1536px] flex flex-col gap-[0.9375rem] rounded-[0.5rem] border border-[#E1E3E2] bg-[#FFF] mx-auto max-[730px]:max-w-[100%] max-[760px]:rounded-tr-none max-[760px]:rounded-br-none max-[760px]:border-r-0">
          <div className="flex justify-between items-center px-[1rem] py-[0.75rem] border-b-[0.0625rem] border-[#EAECF0]">
            <p className="font-manropeL font-medium leading-[1.75rem] text-[1.25rem] text-gray-900 max-[834px]:text-[1.125rem] max-[880px]:text-[1.125rem] max-[834px]:max-w-none">
              Performance Data
            </p>
            <div
              className="flex justify-center items-center rounded-[0.5rem] bg-[rgba(210,255,231,0.15)] hover:bg-[#009444] hover:transition-all hover:ease-in-out hover:duration-500 hover:text-[#fff] text-[#009444] font-manropeL text-[1rem] tracking-[0.005rem] leading-[1.5rem] font-normal max-w-[9.25rem] w-full py-[0.75rem] cursor-pointer"
              onClick={redirectToAnotherPage}
            >
              See all
            </div>
          </div>
          <div className="w-full">
            <div className="max-[778px]:overflow-x-scroll no-scrollbar">
              <div className="flex items-center justify-between gap-[1.5rem] py-[0.75rem] pb-0 border-[#EAECF0] max-[730px]:flex max-[778px]:pr-0 max-[1110px]:gap-0">
                <div className="flex items-center gap-[0.25rem] border-b-[#EAECF0] border-b-[0.0625rem] pl-[1.5rem] py-[0.75rem] bg-[#FCFCFD] max-w-[10rem] w-full max-[778px]:min-w-[7rem] max-[834px]:text-[0.75rem]">
                  <h6 className="text-[0.875rem] font-manropeL text-[#444846] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem]">
                    Date
                  </h6>
                  <Image
                    src={`${showItems ? '/assets/images/reports/upp.svg' : '/assets/images/arrow-down.svg'}`}
                    onClick={toggleVisibility}
                    alt="Down Arrow"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                  />
                </div>
                <div className="max-w-[11.5rem] w-full py-[0.75rem] border-b-[#EAECF0] border-b-[0.0625rem] bg-[#FCFCFD] max-[778px]:min-w-[8.5rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Trasanction Value
                  </p>
                </div>
                <div className="max-w-[11.5rem] w-full py-[0.75rem] border-b-[#EAECF0] border-b-[0.0625rem] bg-[#FCFCFD] max-[778px]:min-w-[8.5rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Transaction volume
                  </p>
                </div>
                <div className="max-w-[11.63rem] w-full py-[0.75rem] border-b-[#EAECF0] border-b-[0.0625rem] bg-[#FCFCFD] max-[778px]:min-w-[8.63rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Active Users
                  </p>
                </div>
                <div className="max-w-[10.19rem] w-full py-[0.75rem] border-b-[#EAECF0] border-b-[0.0625rem] bg-[#FCFCFD] max-[778px]:min-w-[7.19rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Total Order
                  </p>
                </div>
                <div className="max-w-[10.75rem] py-[0.75rem] border-b-[#EAECF0] border-b-[0.0625rem] bg-[#FCFCFD] w-full max-[1000px]:hidden">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Best Selling
                  </p>
                </div>
              </div>
              {loadingState ? (
                <ImSpinner8 className="w-6 h-6 mx-auto my-[3rem] mb-2rem text-brand-success-primary animate-spin" />
              ) : (
                performanceDataArray?.map((performance: any) => {
                  return (
                    <div
                      key={performance.id}
                      className={`flex transition-all duration-500 items-center justify-between gap-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:pr-0 max-[1110px]:gap-0 max-[778px]:pr-0 ${
                        showItems ? 'block' : 'hidden'
                      }`}
                    >
                      <div className="max-w-[10rem] pl-[1.5rem] w-full max-[778px]:min-w-[7rem]">
                        <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                          {performance.date}
                        </h6>
                      </div>
                      <div className="max-w-[11.5rem] w-full max-[778px]:min-w-[8.5rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                          {formattedAmount(performance.transaction_value)}
                        </p>
                      </div>
                      <div className="max-w-[11.5rem] w-full max-[778px]:min-w-[8.5rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                          {formattedAmount(performance.transaction_volume)}
                        </p>
                      </div>
                      <div className="max-w-[11.63rem] w-full max-[778px]:min-w-[8.63rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                          {formattedAmount(performance.active_users)}
                        </p>
                      </div>
                      <div className="max-w-[10.19rem] w-full max-[778px]:min-w-[7.19rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                          {formattedAmount(performance.total_orders)}
                        </p>
                      </div>
                      <div className="max-w-[10.75rem] w-full max-[1000px]:hidden">
                        <p className="text-[0.75rem] text-center font-manropeL text-[#667085] font-normal leading-[1rem] tracking-[0.0025rem]">
                          {performance.best_selling_product}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div className="flex items-center justify-between gap-[1.5rem] py-[0.75rem] pb-0 max-[730px]:flex max-[778px]:pr-0 max-[1110px]:gap-0">
                <div className="border-b-[0.375rem] border-b-[#EAECF0] max-w-[10rem] pl-[1.5rem] w-full max-[778px]:min-w-[7rem]"></div>
                <div className="border-b-[0.375rem] border-b-[#EAECF0] max-w-[11.5rem] w-full max-[778px]:min-w-[8.5rem]"></div>
                <div className="border-b-[0.375rem] border-b-[#EAECF0] max-w-[11.5rem] w-full max-[778px]:min-w-[8.5rem]"></div>
                <div className="border-b-[0.375rem] border-b-[#EAECF0] max-w-[11.63rem] w-full max-[778px]:min-w-[8.63rem]"></div>
                <div className="border-b-[0.375rem] border-b-[#EAECF0] max-w-[10.19rem] w-full max-[778px]:min-w-[7.19rem]"></div>
                <div className="border-b-[0.375rem] border-b-[#EAECF0] max-w-[10.75rem] w-full max-[1000px]:hidden"></div>
              </div>
            </div>
          </div>
          <div>
            {/* <div className="max-w-77.5rem w-full h-[0.3125rem] bg-[#EAECF0]"></div> */}
            <div className="h-[0.94rem] rounded-b-[0.5rem] border-[0.001rem] border-t-0 border-[#EAECF0] max-[760px]:rounded-br-none"></div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PerformanceData;
