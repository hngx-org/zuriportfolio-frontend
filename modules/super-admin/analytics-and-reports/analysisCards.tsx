import React from 'react';
import Image from 'next/image';

const AnalysisCards: React.FC = () => {
  const CardDataOne: {
    id: number;
    CardName: string;
    TotalAmount: number;
    percentage: number;
  }[] = [
    {
      id: 1,
      CardName: 'Total Users',
      TotalAmount: 400,
      percentage: 10,
    },
    {
      id: 2,
      CardName: 'Active Users',
      TotalAmount: 259,
      percentage: 10,
    },
    {
      id: 3,
      CardName: 'Total Products',
      TotalAmount: 1700,
      percentage: 10,
    },
    {
      id: 4,
      CardName: 'Portfolio Created',
      TotalAmount: 290,
      percentage: 10,
    },
  ];

  const CardDataTwo: {
    id: number;
    CardName: string;
    TotalAmount: string;
    percentage: number;
  }[] = [
    {
      id: 1,
      CardName: 'Total Users',
      TotalAmount: '400',
      percentage: 10,
    },
    {
      id: 2,
      CardName: 'Active Users',
      TotalAmount: '259',
      percentage: 10,
    },
    {
      id: 3,
      CardName: 'Total Products',
      TotalAmount: '1700',
      percentage: 10,
    },
    {
      id: 4,
      CardName: 'Total Sales',
      TotalAmount: '$1605',
      percentage: 10,
    },
    {
      id: 5,
      CardName: 'Total Order',
      TotalAmount: '7890',
      percentage: 10,
    },
    {
      id: 6,
      CardName: 'Portfolio Created',
      TotalAmount: '290',
      percentage: 10,
    },
  ];

  const percentile = '/assets/images/icon-left.svg';

  return (
    <>
      <div className="max-w-[77.5rem] w-full mx-auto mt-[1.75rem] max-[1300px]:px-[1.2rem] max-[1300px]:py-0 max-[834px]:hidden">
        <div className="grid grid-cols-4 gap-[1.5rem] max-[1300px]:gap-[1rem]">
          {CardDataOne.map((hero) => (
            <div
              key={hero.id}
              className="flex flex-col gap-[0.5rem] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[18.25rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[1024px]:p-[1rem] max-[1024px]:py-[0.8rem]"
            >
              <div className="flex w-full justify-between gap-[0.5rem]">
                <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL max-[1024px]:text-[0.7rem]">
                  {hero.CardName}
                </p>
                <Image
                  src="/assets/images/more.svg"
                  alt="More options"
                  width={20}
                  height={20}
                  className="w-[1.25rem] h-[1.25rem] max-[1024px]:w-[1rem] max-[1024px]:h-[1rem]"
                />
              </div>
              <div className="flex w-full justify-between gap-[1rem] items-center">
                <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000] max-[1024px]:text-[1.2rem]">
                  {hero.TotalAmount}
                </p>
                <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                  <Image
                    src={percentile}
                    alt="Percentage-rate"
                    width={16}
                    height={16}
                    className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem]"
                  />
                  <p className="font-manropeL text-[0.875rem] leading-[1.25rem] tracking-[0.00219rem] text-[#009254] text-center max-[1024px]:text-[0.6rem]">
                    {hero.percentage}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-[1.5rem] max-[1300px]:gap-[1rem] mt-[1.5rem] max-[1024px]:mt-[1rem]">
          <div className="flex flex-col gap-[0.5rem] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[38rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[1024px]:p-[1rem] max-[1024px]:py-[0.8rem]">
            <div className="flex w-full justify-between gap-[0.5rem]">
              <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL max-[1024px]:text-[0.7rem]">
                Total Sales
              </p>
              <Image
                src="/assets/images/more.svg"
                alt="More options"
                width={20}
                height={20}
                className="w-[1.25rem] h-[1.25rem] max-[1024px]:w-[1rem] max-[1024px]:h-[1rem]"
              />
            </div>
            <div className="flex w-full justify-between gap-[1rem] items-center">
              <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000] max-[1024px]:text-[1.2rem]">
                $160500
              </p>
              <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                <Image
                  src={percentile}
                  alt="Percentage-rate"
                  width={16}
                  height={16}
                  className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem]"
                />
                <p className="font-manropeL text-[0.875rem] leading-[1.25rem] tracking-[0.00219rem] text-[#009254] text-center max-[1024px]:text-[0.6rem]">
                  10%
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[38rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[1024px]:p-[1rem] max-[1024px]:py-[0.8rem]">
            <div className="flex w-full justify-between gap-[0.5rem]">
              <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL max-[1024px]:text-[0.7rem]">
                Total Order
              </p>
              <Image
                src="/assets/images/more.svg"
                alt="More options"
                width={20}
                height={20}
                className="w-[1.25rem] h-[1.25rem] max-[1024px]:w-[1rem] max-[1024px]:h-[1rem]"
              />
            </div>
            <div className="flex w-full justify-between gap-[1rem] items-center">
              <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000] max-[1024px]:text-[1.2rem]">
                7890
              </p>
              <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                <Image
                  src={percentile}
                  alt="Percentage-rate"
                  width={16}
                  height={16}
                  className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem]"
                />
                <p className="font-manropeL text-[0.875rem] leading-[1.25rem] tracking-[0.00219rem] text-[#009254] text-center max-[1024px]:text-[0.6rem]">
                  10%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden max-w-[47.125rem] w-full mx-auto mt-[1.75rem] max-[834px]:block max-[800px]:px-[1.5rem]">
        <div className="grid grid-cols-3 gap-[1rem] max-[800px]:grid-cols-2 max-[800px]:gap-[0.7rem] max-[540px]:grid-cols-1">
          {CardDataTwo.map((hero) => (
            <div
              key={hero.id}
              className="flex flex-col gap-[0.5rem] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[18.25rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[800px]:mx-auto max-[800px]:max-w-[25rem] max-[540px]:max-w-[30.25rem] max-[540px]:w-full"
            >
              <div className="flex w-full justify-between gap-[0.5rem]">
                <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL">
                  {hero.CardName}
                </p>
                <Image
                  src="/assets/images/more.svg"
                  alt="More options"
                  width={20}
                  height={20}
                  className="w-[1.25rem] h-[1.25rem]"
                />
              </div>
              <div className="flex w-full justify-between gap-[1rem] items-center">
                <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000]">{hero.TotalAmount}</p>
                <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                  <Image src={percentile} alt="Percentage-rate" width={16} height={16} className="w-[1rem] h-[1rem]" />
                  <p className="font-manropeL text-[0.875rem] leading-[1.25rem] tracking-[0.00219rem] text-[#009254] text-center">
                    {hero.percentage}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden max-w-[47.125rem] w-full mx-auto mt-[1.75rem] pl-[1.5rem] max-[500px]:block pr-0">
        <div className="flex gap-[1.5rem] overflow-x-scroll no-scrollbar">
          {CardDataTwo.map((hero) => (
            <div
              key={hero.id}
              className="flex flex-col gap-[0.5rem] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] min-w-[14.25rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[800px]:mx-auto max-[800px]:max-w-[25rem] max-[540px]:max-w-[30.25rem] max-[540px]:w-full"
            >
              <div className="flex w-full justify-between gap-[0.5rem]">
                <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL">
                  {hero.CardName}
                </p>
                <Image
                  src="/assets/images/more.svg"
                  alt="More options"
                  width={20}
                  height={20}
                  className="w-[1.25rem] h-[1.25rem]"
                />
              </div>
              <div className="flex w-full justify-between gap-[1rem] items-center">
                <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000]">{hero.TotalAmount}</p>
                <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                  <Image src={percentile} alt="Percentage-rate" width={16} height={16} className="w-[1rem] h-[1rem]" />
                  <p className="font-manropeL text-[0.875rem] leading-[1.25rem] tracking-[0.00219rem] text-[#009254] text-center">
                    {hero.percentage}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnalysisCards;
