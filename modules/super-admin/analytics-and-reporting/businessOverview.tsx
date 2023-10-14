import Image from 'next/image';
import React from 'react';
import { DateObject } from 'react-multi-date-picker';

interface zaProps {
  dateRange: DateObject[];
  reportClicked: boolean;
}

const BusinessOveriview: React.FC<zaProps> = ({ dateRange, reportClicked }) => {
  type BusinessAray = {
    title: string;
    amount: any;
    ratio: string;
  };
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [BusinessOverviewArray, setBusinessOverview] = React.useState<any>([]);

  React.useEffect(() => {
    if (reportClicked && dateRange.length === 2) {
      const starttDate = dateRange[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const enddDate = dateRange[1].format('YYYY-MM-DDTHH:mm:ssZ');
      fetch(
        `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/data/?start_date=${starttDate}&end_date=${enddDate}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setBusinessOverview(data.data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(
        `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/data/?start_date=${startDate}&end_date=${endDate}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setBusinessOverview(data.data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reportClicked]);

  React.useEffect(() => {
    fetch(
      `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/data/?start_date=${startDate}&end_date=${endDate}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setBusinessOverview(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch("https://team-mirage-super-amind2.onrender.com/api/admin/analytics/data/",{
  //   method:'GET',
  //   body: {
  //     start_date: "",
  //     end_date:""
  //   }
  // })

  return (
    <>
      <div className="max-[1310px]:px-[1rem] w-full max-[760px]:pr-0 max-[834px]:px-[2.5rem] max-[800px]:pl-[2.5rem] max-[500px]:px-[1.5rem] max-[500px]:pr-0">
        <div className="max-w-[77.5rem] w-full mt-[3rem] min-[1536px]:max-w-[1536px] flex flex-col gap-[0.9375rem] rounded-[0.5rem] border border-[#E1E3E2] bg-[#FFF] mx-auto max-[730px]:max-w-[100%] max-[800px]:rounded-tr-none max-[760px]:rounded-br-none max-[760px]:border-r-0">
          <div className="px-[1rem] py-[0.75rem] max-w-[77.5rem] w-full border-b-[0.0625rem] border-[#EAECF0]">
            <p className="font-manropeL font-medium leading-[1.75rem] text-[1.25rem] text-gray-900">
              Business Overview
            </p>
          </div>
          <div className="w-full">
            <div className="max-[778px]:overflow-x-scroll no-scrollbar">
              <div className="flex items-center justify-between px-[1.5rem] py-[0.75rem] bg-[#FCFCFD] border-b-[0.0625rem] border-[#EAECF0] max-[730px]:flex max-[730px]:gap-[1.5rem] max-[730px]:w-fit">
                <div className="flex items-center gap-0.25rem max-w-[8.5rem] w-full max-[834px]:max-w-[6rem] max-[778px]:min-w-[6rem]">
                  <h6 className="text-[0.875rem] font-manropeL text-[#444846] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                    Total Users
                  </h6>
                  <Image src="/assets/images/reports/arrow-down.svg" alt="Down Arrow" width={16} height={16} />
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
                <div className="hidden max-w-[5.5rem] w-full max-[834px]:block max-[778px]:min-w-[5.5rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                    Total revenue
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:gap-[1.5rem] max-[730px]:w-fit max-[730px]:pr-0">
                <div className="max-w-[8.5rem] w-full max-[834px]:max-w-[3.75rem] max-[778px]:min-w-[6rem]">
                  <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                    {BusinessOverviewArray[0]?.amount}
                  </h6>
                </div>
                <div className="max-w-[10.3rem] w-full max-[834px]:max-w-[4.5rem] max-[778px]:min-w-[5rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[5rem]">
                    {BusinessOverviewArray[1]?.amount}
                  </p>
                </div>
                <div className="max-w-[10rem] w-full max-[834px]:max-w-[3.5rem] max-[778px]:min-w-[5.44rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                    {BusinessOverviewArray[2]?.amount}
                  </p>
                </div>
                <div className="max-w-[8.63rem] w-full max-[834px]:max-w-[4.31rem] max-[778px]:min-w-[5.69rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[6rem]">
                    {BusinessOverviewArray[5]?.amount}
                  </p>
                </div>
                <div className="max-w-[13.8rem] w-full max-[834px]:max-w-[4.5rem] max-[778px]:min-w-[5rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[730px]:w-[5rem]">
                    {BusinessOverviewArray[3]?.amount}
                  </p>
                </div>
                <div className="max-w-[9.25rem] w-full max-[834px]:max-w-[4.5rem] max-[778px]:min-w-[4.38rem]">
                  <p className="text-[0.875rem] font-manropeL font-normal text-center text-[#667085] leading-[1.25rem] tracking-[0.00088rem] max-[834px]:text-[#000] max-[730px]:w-[5rem]">
                    {BusinessOverviewArray[4]?.amount}
                  </p>
                </div>
                <div className="hidden max-w-[4.5rem] w-full max-[834px]:block max-[834px]:min-w-[5.5rem]">
                  <p className="text-[0.875rem] font-manropeL font-normal text-center leading-[1.25rem] tracking-[0.00088rem] text-[#000] max-[730px]:w-[6rem]">
                    $20000000
                  </p>
                </div>
              </div>
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

export default BusinessOveriview;
