import Image from 'next/image';

const PortfolioCreation: React.FC = () => {
  //   const CreationData: {
  //     id: number;
  //     categories: string;
  //     amount: number;
  //     percentage: string;
  //     users: number;
  //   }[] = [
  //     {
  //       id: 1,
  //       categories: 'Product Manager',
  //       amount: 190,
  //       percentage: '40%',
  //       users: 170,
  //     },
  //     {
  //       id: 2,
  //       categories: 'Software Developer',
  //       amount: 110,
  //       percentage: '34%',
  //       users: 90,
  //     },
  //     {
  //       id: 3,
  //       categories: 'Product  Designer',
  //       amount: 105,
  //       percentage: '16%',
  //       users: 79,
  //     },
  //     {
  //       id: 4,
  //       categories: 'DevOps Engineer',
  //       amount: 95,
  //       percentage: '10%',
  //       users: 64,
  //     },
  //   ];

  //   const port: {
  //     id: number;
  //     digit: number;
  //   }[] = [
  //     {
  //       id: 1,
  //       digit: 500,
  //     },
  //     {
  //       id: 2,
  //       digit: 500,
  //     },
  //     {
  //       id: 3,
  //       digit: 500,
  //     },
  //     {
  //       id: 4,
  //       digit: 500,
  //     },
  //   ];
  return (
    <>
      <div className="max-[1310px]:px-[1rem] max-[834px]:px-[2.5rem] max-[800px]:pr-0 max-[830px]:px-[2.5rem] max-[500px]:px-[1.5rem] max-[500px]:pr-0">
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
              <div className="flex items-center justify-between px-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:pr-0">
                <div className="max-w-[9.969rem] w-full max-[778px]:min-w-[9.969rem]">
                  <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    500
                  </h6>
                </div>
                <div className="max-w-[19.8rem] w-full max-[778px]:min-w-[9.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    Product Manager
                  </p>
                </div>
                <div className="max-w-[11.8rem] w-full max-[778px]:min-w-[11.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    190
                  </p>
                </div>
                <div className="max-w-[12.4rem] w-full max-[778px]:min-w-[12.4rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    40%
                  </p>
                </div>
                <div className="max-w-[10.8rem] w-full max-[778px]:min-w-[10.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    170
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:pr-0">
                <div className="max-w-[9.969rem] w-full max-[778px]:min-w-[9.969rem]">
                  <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    500
                  </h6>
                </div>
                <div className="max-w-[19.8rem] w-full max-[778px]:min-w-[9.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    Software Developer
                  </p>
                </div>
                <div className="max-w-[11.8rem] w-full max-[778px]:min-w-[11.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    110
                  </p>
                </div>
                <div className="max-w-[12.4rem] w-full max-[778px]:min-w-[12.4rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    34%
                  </p>
                </div>
                <div className="max-w-[10.8rem] w-full max-[778px]:min-w-[10.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    90
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:pr-0">
                <div className="max-w-[9.969rem] w-full max-[778px]:min-w-[9.969rem]">
                  <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    500
                  </h6>
                </div>
                <div className="max-w-[19.8rem] w-full max-[778px]:min-w-[9.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    Product Designer
                  </p>
                </div>
                <div className="max-w-[11.8rem] w-full max-[778px]:min-w-[11.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    105
                  </p>
                </div>
                <div className="max-w-[12.4rem] w-full max-[778px]:min-w-[12.4rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    16%
                  </p>
                </div>
                <div className="max-w-[10.8rem] w-full max-[778px]:min-w-[10.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    79
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-[1.5rem] py-[1rem] bg-[#FFF] max-[730px]:flex max-[730px]:pr-0">
                <div className="max-w-[9.969rem] w-full max-[778px]:min-w-[9.969rem]">
                  <h6 className="text-[0.875rem] font-manropeL font-semibold text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    500
                  </h6>
                </div>
                <div className="max-w-[19.8rem] w-full max-[778px]:min-w-[9.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    DevOps Engineer
                  </p>
                </div>
                <div className="max-w-[11.8rem] w-full max-[778px]:min-w-[11.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    95
                  </p>
                </div>
                <div className="max-w-[12.4rem] w-full max-[778px]:min-w-[12.4rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    10%
                  </p>
                </div>
                <div className="max-w-[10.8rem] w-full max-[778px]:min-w-[10.8rem]">
                  <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                    64
                  </p>
                </div>
              </div>
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
