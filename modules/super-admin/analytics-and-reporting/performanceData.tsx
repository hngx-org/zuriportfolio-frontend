import Image from 'next/image';
import React from 'react';
import { DateObject } from 'react-multi-date-picker';

interface zaProps {
  dateRange: DateObject[];
  reportClicked: boolean;
}

const PerformanceData: React.FC<zaProps> = ({ dateRange, reportClicked }) => {
  const [performanceDataArray, setPerformanceDataArray] = React.useState<any>([]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  React.useEffect(() => {
    if (reportClicked && dateRange.length === 2) {
      const starttDate = dateRange[0].format('YYYY-MM-DD');
      const enddDate = dateRange[1].format('YYYY-MM-DD');
      fetch(
        `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/performance-data/?start_date=${starttDate}&end_date=${enddDate}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setPerformanceDataArray(data.data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch('https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/performance-data/')
        .then((res) => res.json())
        .then((data) => {
          setPerformanceDataArray(data.data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reportClicked]);
  return (
    <>
      <div className="max-[1310px]:px-[1rem] w-full max-[834px]:px-[2.5rem] max-[760px]:pr-0 max-[830px]:px-[2.5rem] max-[500px]:px-[1.5rem] max-[500px]:pr-0">
        <div className="max-w-[77.5rem] w-full mt-[3rem] min-[1536px]:max-w-[1536px] flex flex-col gap-[0.9375rem] rounded-[0.5rem] border border-[#E1E3E2] bg-[#FFF] mx-auto max-[730px]:max-w-[100%] max-[760px]:rounded-tr-none max-[760px]:rounded-br-none max-[760px]:border-r-0">
          <div className="px-[1rem] py-[0.75rem] max-w-[77.5rem] w-full border-b-[0.0625rem] border-[#EAECF0]">
            <p className="font-manropeL font-medium leading-[1.75rem] text-[1.25rem] text-gray-900 max-[834px]:text-[1.125rem] max-[880px]:text-[1.125rem] max-[834px]:max-w-none">
              Performance Data
            </p>
          </div>
          <div className="w-full">
            <div className="max-[778px]:overflow-x-scroll no-scrollbar">
              <div className="flex items-center justify-between px-[1.5rem] gap-[1.5rem] py-[0.75rem] bg-[#FCFCFD] border-b-[0.0625rem] border-[#EAECF0] max-[730px]:flex max-[778px]:pr-0 max-[1110px]:gap-0 max-[778px]:w-fit">
                <div className="flex items-center gap-[0.25rem] max-w-[10rem] w-full max-[778px]:min-w-[5rem] max-[834px]:text-[0.75rem]">
                  <h6 className="text-[0.875rem] font-manropeL text-[#444846] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem]">
                    Date
                  </h6>
                  <Image src="/assets/images/reports/arrow-down.svg" alt="Down Arrow" width={16} height={16} />
                </div>
                <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[7.63rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Value
                  </p>
                </div>
                <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[8.5rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Transaction volume
                  </p>
                </div>
                <div className="max-w-[8.63rem] w-full max-[778px]:min-w-[7.63rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Active Users
                  </p>
                </div>
                <div className="max-w-[7.19rem] w-full max-[778px]:min-w-[7.19rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Total Order
                  </p>
                </div>
                <div className="max-w-[8.56rem] w-full max-[778px]:min-w-[6.06rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Total Users
                  </p>
                </div>
                <div className="max-w-[7.75rem] w-full max-[1000px]:hidden">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                    Best Selling
                  </p>
                </div>
              </div>
              {performanceDataArray.map((performance: any) => {
                return (
                  <div
                    key={performance.index}
                    className="flex items-center justify-between px-[1.5rem] gap-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:pr-0 max-[1110px]:gap-0"
                  >
                    <div className="max-w-[10rem] w-full max-[778px]:min-w-[5rem]">
                      <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                        2023-09-25
                      </h6>
                    </div>
                    <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[8.5rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                        {performance.transaction_value}
                      </p>
                    </div>
                    <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[8.5rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                        {performance.transaction_volume}
                      </p>
                    </div>
                    <div className="max-w-[8.63rem] w-full max-[778px]:min-w-[8.63rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                        {performance.active_users}
                      </p>
                    </div>
                    <div className="max-w-[7.19rem] w-full max-[778px]:min-w-[7.19rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                        {performance.total_orders}
                      </p>
                    </div>
                    <div className="max-w-[8.56rem] w-full max-[778px]:min-w-[8.56rem]">
                      <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[0.75rem]">
                        {performance.total_users}
                      </p>
                    </div>
                    <div className="max-w-[8.25rem] w-full max-[1000px]:hidden">
                      <p className="text-[0.75rem] text-center font-manropeL text-[#667085] font-normal leading-[1rem] tracking-[0.0025rem]">
                        {performance.best_selling_product}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="max-w-77.5rem w-full h-[0.3125rem] bg-[#EAECF0]"></div>
            <div className="h-[0.94rem] rounded-b-[0.5rem] border-[0.001rem] border-[#EAECF0] max-[760px]:rounded-br-none"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceData;
