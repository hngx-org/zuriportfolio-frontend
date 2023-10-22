import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { DateObject } from 'react-multi-date-picker';
import { ImSpinner8 } from 'react-icons/im';
import Data from './data';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

interface zaProps {
  dateRange: DateObject[];
  reportClicked: Boolean;
}

const PortfolioCreation: React.FC<zaProps> = ({ dateRange, reportClicked }) => {
  const [portfolioCreationArray, setPortfolioCreationArray] = useState<any>([]);
  const [loadingState, setLoadingState] = useState<Boolean>(false);
  const [showContent, setShowContent] = useState<Boolean>(false);
  const [showItems, setShowItems] = useState<Boolean>(true);

  useEffect(() => {
    if (reportClicked && dateRange.length === 2) {
      const startDate = dateRange[0].format('YYYY-MM-DD');
      const endDate = dateRange[1].format('YYYY-MM-DD');
      const bearerToken = localStorage.getItem('zpt');
      setLoadingState(true);

      const apiUrl = `https://staging.zuri.team/api/v1/super-admin/analytics/portfolio-summary/?start_date=${startDate}&end_date=${endDate}`;

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setPortfolioCreationArray(response.data.data);
          setLoadingState(false);
        })
        .catch((error) => {
          setLoadingState(false);
          toast.error('No portfolio was created');
        });
    } else {
      const bearerToken = localStorage.getItem('zpt');
      const apiUrl = 'https://staging.zuri.team/api/v1/super-admin/analytics/portfolio-summary';

      setLoadingState(true);
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const fourMonths = response.data.data.slice(0, 4);
          setPortfolioCreationArray(fourMonths);
          console.log(response);
          setLoadingState(false);
        })
        .catch((error) => {
          setLoadingState(false);
          toast.error('Internal Server Error');
        });
    }
  }, [reportClicked]);

  const toggleVisibility = () => {
    setShowItems(!showItems);
  };

  const checkContent = () => {
    setShowContent(!showContent);
  };

  const router = useRouter();

  const redirectToAnotherPage = () => {
    router.push('/super-admin/analytics-and-reporting/reports/portfolio-creation');
  };
  return (
    <>
      <div className="max-[1310px]:px-[1rem] w-full max-[834px]:px-[2.5rem] max-[760px]:pr-0 max-[830px]:px-[2.5rem] max-[500px]:px-[1.5rem] max-[500px]:pr-0">
        <div className="max-w-[77.5rem] w-full mt-[3rem] min-[1536px]:max-w-[1536px] flex flex-col gap-[0.9375rem] rounded-[0.5rem] border border-[#E1E3E2] bg-[#FFF] mx-auto max-[730px]:max-w-[100%] max-[760px]:rounded-tr-none max-[760px]:rounded-br-none max-[760px]:border-r-0">
          <div className="flex justify-between items-center px-[1rem] py-[0.75rem] border-b-[0.0625rem] border-[#EAECF0]">
            <p className="font-manropeL font-medium leading-[1.75rem] text-[1.25rem] text-gray-900 max-[834px]:text-[1.125rem] max-[880px]:text-[1.125rem] max-[834px]:max-w-none">
              PortFolio Creation
            </p>
            <div
              className="flex justify-center items-center rounded-[0.5rem] bg-[rgba(210,255,231,0.15)] hover:bg-[#009444] hover:transition-all hover:ease-in-out hover:duration-500 hover:text-[#fff] text-[#009444] font-manropeL text-[1rem] tracking-[0.005rem] leading-[1.5rem] font-normal max-w-[9.25rem] w-full py-[0.75rem] cursor-pointer"
              onClick={redirectToAnotherPage}
            >
              See all
            </div>
          </div>
          <div className="w-full">
            <div className="max-[950px]:overflow-x-scroll no-scrollbar">
              <div className="min-[1536px]:gap-[6rem] flex items-center px-[1.5rem] py-[0.75rem] max-[834px]:items-baseline bg-[#FCFCFD] border-b-[0.0625rem] border-[#EAECF0] max-[730px]:flex max-[950px]:w-[75.563rem]">
                <div className="flex items-center max-w-[9.53rem] gap-[0.25rem] w-full max-[834px]:max-w-[8rem] max-[950px]:min-w-[9.53rem]">
                  <h6 className="text-[0.875rem] font-manropeL text-[#444846] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem] ">
                    Month Created
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
                <div className="max-w-[11.25rem] w-full max-[730px]:ml-0 max-[834px]:max-w-[7.875rem] max-[950px]:min-w-[11.25rem]">
                  <p className="text-[0.875rem] font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Total Portfolios Created
                  </p>
                </div>
                <div className="max-[950px]:min-w-[9rem] pl-[1.5rem] max-[834px]:pl-0">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] max-[950px]:text-start max-[778px]:text-start font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Categories
                  </p>
                </div>
              </div>
              {loadingState ? (
                <ImSpinner8 className="w-6 h-6 mx-auto my-[3rem] mb-2rem text-brand-success-primary animate-spin" />
              ) : (
                portfolioCreationArray?.map((data: any, index: any) => {
                  return (
                    <div key={data.id}>
                      <Data data={data} showItems={showItems} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div>
            <div className="h-[0.94rem] rounded-b-[0.5rem] border-[0.001rem] border-t-0 border-[#EAECF0] max-[760px]:rounded-br-none"></div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PortfolioCreation;
