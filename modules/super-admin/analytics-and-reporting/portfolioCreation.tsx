import React from 'react';
import Image from 'next/image';

const PortfolioCreation: React.FC = (props) => {
  const [portfolioCreationArray, setPortfolioCreationArray] = React.useState<any>([]);
  React.useEffect(() => {
    fetch('https://team-mirage-super-amind2.onrender.com/api/admin/analytics/portfolio_summary/')
      .then((res) => res.json())
      .then((data) => {
        // setPortfolioCreationArray(data.data)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  // DateQuery

  //   React.useEffect((()=>{
  //     fetch(`https://team-mirage-super-amind2.onrender.com/api/admin/analytics/data/?start_date=${startDate}&end_date=${endDate}`)
  //    .then(res => res.json())
  //    .then(data =>  {
  //      setCardDataOne(data.data)
  //      // console.log(data.data)
  //    })
  //    .catch(err => {
  //      console.log(err)
  //    });
  //  }),[])

  return (
    <>
      <div className="max-[1310px]:px-[1rem] max-[834px]:px-[2.5rem] max-[800px]:pr-0 max-[830px]:px-[1.5rem]">
        <div className="max-w-[77.5rem] w-full mt-[3rem] flex flex-col gap-[0.9375rem] rounded-[0.5rem] border border-[#E1E3E2] bg-[#FFF] mx-auto max-[730px]:max-w-[100%] max-[800px]:rounded-tr-none max-[800px]:rounded-br-none max-[800px]:border-r-0">
          <div className="px-[1rem] py-[0.75rem] max-w-[77.5rem] w-full border-b-[0.0625rem] border-[#EAECF0]">
            <p className="font-manropeL font-medium leading-[1.75rem] text-[1.25rem] text-gray-900 max-[834px]:text-[1.125rem] max-[880px]:text-[1.125rem] max-[834px]:max-w-none">
              PortFolio Creation
            </p>
          </div>
          <div className="w-full">
            <div className="max-[778px]:overflow-x-scroll no-scrollbar">
              <div className="flex items-center justify-between px-[1.5rem] py-[0.75rem] bg-[#FCFCFD] border-b-[0.0625rem] border-[#EAECF0] max-[730px]:w-fit max-[730px]:flex max-[778px]:pr-0">
                <div className="flex items-center max-w-[9.969rem] w-full max-[778px]:min-w-[9.969rem]">
                  <h6 className="text-[0.875rem] font-manropeL text-[#444846] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem] ">
                    Total Portfolio created
                  </h6>
                  <Image src="/assets/images/reports/arrow-down.svg" alt="Down Arrow" width={16} height={16} />
                </div>
                <div className="max-w-[19.8rem] w-full max-[730px]:ml-0 max-[778px]:min-w-[9.8rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Categories
                  </p>
                </div>
                <div className="max-w-[11.8rem] w-full max-[778px]:min-w-[11.8rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Total amount
                  </p>
                </div>
                <div className="max-w-[12.4rem] w-full max-[778px]:min-w-[12.4rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Percentage
                  </p>
                </div>
                <div className="max-w-[10.8rem] w-full max-[778px]:min-w-[10.8rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Active Users
                  </p>
                </div>
              </div>
              {portfolioCreationArray.map((e: any) => {
                return (
                  <div
                    key={e.index}
                    className="flex items-center justify-between px-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:pr-0"
                  >
                    <div className="max-w-[9.969rem] w-full max-[778px]:min-w-[9.969rem]">
                      <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {e.totalPorfolio}
                      </h6>
                    </div>
                    <div className="max-w-[19.8rem] w-full max-[778px]:min-w-[9.8rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {e.category}
                      </p>
                    </div>
                    <div className="max-w-[11.8rem] w-full max-[778px]:min-w-[11.8rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {e.totalAmount}
                      </p>
                    </div>
                    <div className="max-w-[12.4rem] w-full max-[778px]:min-w-[12.4rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {e.percentage}
                      </p>
                    </div>
                    <div className="max-w-[10.8rem] w-full max-[778px]:min-w-[10.8rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {e.activeUsers}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="max-w-77.5rem w-full h-[0.3125rem] bg-[#EAECF0]"></div>
            <div className="h-[0.94rem] rounded-b-[0.5rem] border-[0.001rem] border-[#EAECF0] max-[800px]:rounded-br-none"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioCreation;
