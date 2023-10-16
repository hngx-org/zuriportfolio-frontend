import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { DateObject } from 'react-multi-date-picker';
import { ImSpinner8 } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';

interface zaProps {
  dateRange: DateObject[];
  reportClicked: Boolean;
}

const PortfolioCreation: React.FC<zaProps> = ({ dateRange, reportClicked }) => {
  const [portfolioCreationArray, setPortfolioCreationArray] = React.useState<any>([]);
  const [loadingState, setLoadingState] = useState<Boolean>(false);
  const [showItems, setShowItems] = useState<Boolean>(true);

  useEffect(() => {
    if (reportClicked && dateRange.length === 2) {
      const startDate = dateRange[0].format('YYYY-MM-DD');
      const endDate = dateRange[1].format('YYYY-MM-DD');
      const bearerToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5YTcwOTllLTM0ZTQtNGU0OS04ODU2LTE1YWI2ZWQxMzgwYyIsImlhdCI6MTY5NzQ2ODM0MH0.UZ0CgNydpooLXFygcTgbjE6EHEQMIcFH5rjHFXpi8_w';
      setLoadingState(true);

      const apiUrl = `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/portfolio_summary/?start_date=${startDate}&end_date=${endDate}`;

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setPortfolioCreationArray(response.data.data);
          setLoadingState(false);
        })
        .catch((error) => {
          console.error('Error fetching portfolio summary:', error);
          setLoadingState(false);
        });
    } else {
      const bearerToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5YTcwOTllLTM0ZTQtNGU0OS04ODU2LTE1YWI2ZWQxMzgwYyIsImlhdCI6MTY5NzQ2ODM0MH0.UZ0CgNydpooLXFygcTgbjE6EHEQMIcFH5rjHFXpi8_w';
      const apiUrl = 'https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/portfolio_summary';

      setLoadingState(true);
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setPortfolioCreationArray(response.data.data);
          setLoadingState(false);
        })
        .catch((error) => {
          console.error('Error fetching portfolio summary:', error);
          setLoadingState(false);
        });
    }
  }, [reportClicked]);

  const toggleVisibility = () => {
    setShowItems(!showItems);
  };

  return (
    <>
      <div className="max-[1310px]:px-[1rem] w-full max-[834px]:px-[2.5rem] max-[760px]:pr-0 max-[830px]:px-[2.5rem] max-[500px]:px-[1.5rem] max-[500px]:pr-0">
        <div className="max-w-[77.5rem] w-full mt-[3rem] min-[1536px]:max-w-[1536px] flex flex-col gap-[0.9375rem] rounded-[0.5rem] border border-[#E1E3E2] bg-[#FFF] mx-auto max-[730px]:max-w-[100%] max-[760px]:rounded-tr-none max-[760px]:rounded-br-none max-[760px]:border-r-0">
          <div className="px-[1rem] py-[0.75rem] max-w-[77.5rem] w-full border-b-[0.0625rem] border-[#EAECF0]">
            <p className="font-manropeL font-medium leading-[1.75rem] text-[1.25rem] text-gray-900 max-[834px]:text-[1.125rem] max-[880px]:text-[1.125rem] max-[834px]:max-w-none">
              PortFolio Creation
            </p>
          </div>
          <div className="w-full">
            <div className="max-[778px]:overflow-x-scroll no-scrollbar">
              <div className="flex items-center justify-between px-[1.5rem] py-[0.75rem] bg-[#FCFCFD] border-b-[0.0625rem] border-[#EAECF0] max-[730px]:w-fit max-[730px]:flex max-[768px]:w-fit">
                <div className="flex items-center max-w-[9.969rem] w-full max-[778px]:min-w-[9.13rem] max-[834px]:mx-auto">
                  <h6 className="text-[0.875rem] font-manropeL text-[#444846] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem] ">
                    Total Portfolio created
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
                <div className="max-w-[19.8rem] w-full max-[730px]:ml-0 max-[778px]:min-w-[9.8rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Categories
                  </p>
                </div>
                <div className="max-w-[11.8rem] w-full max-[778px]:min-w-[9rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Total amount
                  </p>
                </div>
                <div className="max-w-[12.4rem] w-full max-[778px]:min-w-[7.94rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Percentage
                  </p>
                </div>
                <div className="max-w-[10.8rem] w-full max-[778px]:min-w-[7.63rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Active Users
                  </p>
                </div>
              </div>
              {loadingState ? (
                <ImSpinner8 className="w-6 h-6 mx-auto my-[3rem] mb-2rem text-brand-success-primary animate-spin" />
              ) : (
                showItems &&
                portfolioCreationArray?.map((e: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between px-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:pr-0"
                    >
                      <div className="max-w-[9.969rem] w-full max-[778px]:min-w-[9.969rem]">
                        <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          {e.total_portfolios_created}
                        </h6>
                      </div>
                      <div className="max-w-[19.8rem] w-full max-[778px]:min-w-[9.8rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          {e.portfolio_category}
                        </p>
                      </div>
                      <div className="max-w-[11.8rem] w-full max-[778px]:min-w-[11.8rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          {e.total_category}
                        </p>
                      </div>
                      <div className="max-w-[12.4rem] w-full max-[778px]:min-w-[12.4rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          {e.percentage}
                        </p>
                      </div>
                      <div className="max-w-[10.8rem] w-full max-[778px]:min-w-[10.8rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          {e.active_user}
                        </p>
                      </div>
                    </div>
                  );
                })
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

export default PortfolioCreation;
