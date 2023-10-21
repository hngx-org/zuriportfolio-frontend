import Image from 'next/image';
import React, { useState } from 'react';

interface DataProps {
  data: {
    month: string;
    id: number;
    categories: Array<{
      category_name: string;
      count: number;
      percentage: number;
    }>;
    total_portfolios_created_per_month: number;
  };
  showItems: Boolean;
}

const Data: React.FC<DataProps> = ({ data, showItems }) => {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };
  return (
    <>
      <div key={data.id} className={`${showItems ? 'block' : 'hidden'}`}>
        <div className="flex items-baseline pl-[1.5rem] pr-[1rem] py-[1rem] min-[1536px]:justify-between max-[950px]:pr-[2rem] max-[950px]:w-fit">
          <div className="flex items-center max-w-[9.53rem] w-full max-[834px]:max-w-[8rem] max-[950px]:min-w-[9.53rem]">
            <p className="text-[#737876] font-manropeL text-[0.875rem] max-[834px]:tracking-[0.003rem] max-[834px]:leading-[1rem] font-semibold leading-[1.25rem] max-[834px]:font-normal max-[834px]:text-[0.75rem] tracking-[0.00219rem]">
              {data.month}
            </p>
          </div>
          <div className="max-w-[11.25rem] w-full max-[778px]:ml-0 max-[834px]:max-w-[7.875rem] max-[950px]:min-w-[11.25rem]">
            <p className="text-[#737876] font-manropeL text-[0.875rem] max-[834px]:tracking-[0.003rem] max-[834px]:leading-[1rem] font-semibold leading-[1.25rem] max-[834px]:font-normal max-[834px]:text-[0.75rem] tracking-[0.00219rem]">
              {data.total_portfolios_created_per_month}
            </p>
          </div>
          <div className="flex justify-between items-baseline max-w-[51.3rem] w-full gap-[1.25rem] px-[1.5rem] min-[1536px]:gap-0 min-[1536px]:px-0 max-[834px]:pl-0">
            <div className="max-w-[11.3125rem] w-full max-[950px]:min-w-[11.3125rem]">
              <p className="text-[#737876] font-manropeL text-[0.875rem] font-semibold max-[834px]:tracking-[0.003rem] max-[834px]:leading-[1rem] leading-[1.25rem] max-[834px]:text-[0.75rem] tracking-[0.00219rem] max-[834px]:font-normal">
                {data.categories[0]?.category_name
                  ? `${data.categories[0]?.category_name} - ${data.categories[0]?.count} (${data.categories[0]?.percentage})`
                  : ''}
              </p>
            </div>
            <div className="max-w-[11.3125rem] w-full max-[950px]:min-w-[11.3125rem]">
              <p className="text-[#737876] font-manropeL text-[0.875rem] font-semibold max-[834px]:tracking-[0.003rem] max-[834px]:leading-[1rem] leading-[1.25rem] max-[834px]:text-[0.75rem] tracking-[0.00219rem] max-[834px]:font-normal">
                {data.categories[1]?.category_name
                  ? `${data.categories[1]?.category_name} - ${data.categories[1]?.count} (${data.categories[1]?.percentage})`
                  : ''}
              </p>
            </div>
            <div className="max-w-[11.3125rem] w-full max-[950px]:min-w-[11.3125rem]">
              <p className="text-[#737876] max-w-[11.3125rem] w-full  font-manropeL text-[0.875rem] font-semibold max-[834px]:tracking-[0.003rem] max-[834px]:leading-[1rem] leading-[1.25rem] max-[834px]:text-[0.75rem] tracking-[0.00219rem] max-[834px]:font-normal">
                {data.categories[2]?.category_name
                  ? `${data.categories[2]?.category_name} - ${data.categories[2]?.count} (${data.categories[2]?.percentage})`
                  : ''}
              </p>
            </div>
            <div className="max-w-[11.3125rem] w-full max-[950px]:min-w-[11.3125rem]">
              <p className="text-[#737876] max-w-[11.3125rem] w-full  font-manropeL text-[0.875rem] font-semibold leading-[1.25rem] max-[834px]:text-[0.75rem] max-[834px]:tracking-[0.003rem] max-[834px]:leading-[1rem] tracking-[0.00219rem] max-[834px]:font-normal">
                {data.categories[3]?.category_name
                  ? `${data.categories[3]?.category_name} - ${data.categories[3]?.count} (${data.categories[3]?.percentage})`
                  : ''}
              </p>
            </div>
          </div>
          <Image
            src={`${showContent ? '/assets/images/reports/down.svg' : '/assets/images/reports/downny.svg'}`}
            className="cursor-pointer"
            onClick={toggleContent}
            alt="arrow-up"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className={`transition-all duration-500 ${showContent ? 'block' : 'hidden'}`}>
        <div className="flex gap-[1.5rem] items-center px-[1.5rem] pt-[1.25rem] pb-[1rem] border-b-[#EAECF0] border-b-[0.2rem] max-[950px]:w-[75.563rem]">
          <p className="text-[#737876] font-manropeL text-[0.875rem] font-bold leading-[1.25rem] tracking-[0.00219rem]">
            All categories
          </p>
          <p className="text-[#737876] text-[1rem] leading-[1.5rem]">-</p>
          <p className="text-[#009444] text-[1rem] font-manropeL font-bold leading-[1.25rem] tracking-[0.005rem]">
            {data.month}
          </p>
        </div>
        <div className="flex items-baseline gap-[2.5rem] px-[1.5rem] pt-[1.5rem] pb-[2.5rem] border-b border-b-[#E1E3E2] max-[950px]:w-[75.563rem]">
          <div>
            <p className="max-w-[12.5rem] w-full text-[#737876] max-[950px]:min-w-[12.5rem] text-[0.75rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem] mb-[2rem]">
              {data.categories[0]?.category_name
                ? `${data.categories[0]?.category_name} - ${data.categories[0]?.count} (${data.categories[0]?.percentage})`
                : ''}
            </p>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem] mb-[2rem]">
              {data.categories[1]?.category_name
                ? `${data.categories[1]?.category_name} - ${data.categories[1]?.count} (${data.categories[1]?.percentage})`
                : ''}
            </p>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem]">
              {data.categories[2]?.category_name
                ? `${data.categories[2]?.category_name} - ${data.categories[2]?.count} (${data.categories[2]?.percentage})`
                : ''}
            </p>
          </div>
          <div>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem] mb-[2rem]">
              {data.categories[3]?.category_name
                ? `${data.categories[3]?.category_name} - ${data.categories[3]?.count} (${data.categories[3]?.percentage})`
                : ''}
            </p>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem] mb-[2rem]">
              {data.categories[4]?.category_name
                ? `${data.categories[4]?.category_name} - ${data.categories[4]?.count} (${data.categories[4]?.percentage})`
                : ''}
            </p>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem]">
              {data.categories[5]?.category_name
                ? `${data.categories[5]?.category_name} - ${data.categories[5]?.count} (${data.categories[5]?.percentage})`
                : ''}
            </p>
          </div>
          <div>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem] mb-[2rem]">
              {data.categories[6]?.category_name
                ? `${data.categories[6]?.category_name} - ${data.categories[6]?.count} (${data.categories[6]?.percentage})`
                : ''}
            </p>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem] mb-[2rem]">
              {data.categories[7]?.category_name
                ? `${data.categories[7]?.category_name} - ${data.categories[7]?.count} (${data.categories[7]?.percentage})`
                : ''}
            </p>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem]">
              {data.categories[8]?.category_name
                ? `${data.categories[8]?.category_name} - ${data.categories[8]?.count} (${data.categories[8]?.percentage})`
                : ''}
            </p>
          </div>
          <div>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem] mb-[2rem]">
              {data.categories[9]?.category_name
                ? `${data.categories[9]?.category_name} - ${data.categories[9]?.count} (${data.categories[9]?.percentage})`
                : ''}
            </p>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem] mb-[2rem]">
              {data.categories[10]?.category_name
                ? `${data.categories[10]?.category_name} - ${data.categories[10]?.count} (${data.categories[10]?.percentage})`
                : ''}
            </p>
            <p className="max-w-[12.5rem] w-full text-[#737876] text-[0.75rem] max-[950px]:min-w-[12.5rem] max-[834px]:font-normal font-bold tetxt-[0.75rem] font-manropeL leading-[1rem] tracking-[0.003rem]">
              {data.categories[11]?.category_name
                ? `${data.categories[11]?.category_name} - ${data.categories[11]?.count} (${data.categories[11]?.percentage})`
                : ''}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Data;
