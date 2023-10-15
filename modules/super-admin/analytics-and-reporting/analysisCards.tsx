import React from 'react';
import Image from 'next/image';
import { DateObject } from 'react-multi-date-picker';
import { ImSpinner8 } from 'react-icons/im';

interface zaProps {
  dateRange: DateObject[];
  reportClicked: Boolean;
}

const AnalysisCards: React.FC<zaProps> = ({ dateRange, reportClicked }) => {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [loadingState, setLoading] = React.useState(true);
  const [CardDataOne, setCardDataOne] = React.useState<any>([]);
  React.useEffect(() => {
    if (reportClicked && dateRange.length === 2) {
      const starttDate = dateRange[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const enddDate = dateRange[1].format('YYYY-MM-DDTHH:mm:ssZ');
      setLoading(true);
      fetch(
        `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/data/?start_date=${starttDate}&end_date=${enddDate}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setCardDataOne(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(true);
      fetch(
        `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/data/?start_date=${startDate}&end_date=${endDate}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setCardDataOne(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reportClicked]);

  const percentile = '/assets/images/reports/crack.svg';

  return (
    <>
      <div className="max-w-[77.5rem] min-[1536px]:max-w-[1536px] w-full mx-auto mt-[1.75rem] max-[1300px]:px-[1.2rem] max-[1300px]:py-0 max-[834px]:hidden">
        <div className="grid grid-cols-4 gap-[1.5rem] max-[1300px]:gap-[1rem]">
          {/* card */}
          <div
            // key={hero.index}
            className={`${
              loadingState
                ? 'h-[7.375rem] max-[1536px]:max-w-[25.25rem] w-full max-w-[18.25rem] max-[1024px]:max-w-[14.651rem] max-[1024px]:h-[5.974rem] bg-gray-300 shadow-lg` mx-auto rounded-md animate-pulse'
                : 'flex flex-col gap-[0.5rem] hover:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[18.25rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[1024px]:p-[1rem] max-[1024px]:py-[0.8rem] max-[1536px]:max-w-[25.25rem]'
            }`}
          >
            {loadingState ? (
              // <ImSpinner8 className="w-6 h-6  text-brand-success-primary animate-spin" />
              <div className=""></div>
            ) : (
              <>
                <div className="flex w-full justify-between gap-[0.5rem]">
                  <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL max-[1024px]:text-[0.7rem]">
                    {/* {hero.Title} */}
                    {CardDataOne[0]?.title}
                  </p>
                  {/* <Image
                    src="/assets/images/reports/more.svg"
                    alt="More options"
                    width={20}
                    height={20}
                    className="w-[1.25rem] h-[1.25rem] max-[1024px]:w-[1rem] max-[1024px]:h-[1rem]"
                  /> */}
                </div>
                <div className="flex w-full justify-between gap-[1rem] items-center">
                  <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000] max-[1024px]:text-[1.2rem]">
                    {CardDataOne[0]?.amount}
                  </p>
                  {CardDataOne[0]?.ratio < 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#fecaca] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        className="rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3804 6.38065L8.33378 2.33398L4.28711 6.38065"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33398 13.6673V2.44727"
                          stroke="#dc2626"
                          stroke-width="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-red-300 tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {Math.floor(CardDataOne[0]?.ratio)}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[0]?.ratio > 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <Image
                        src={percentile}
                        alt="Percentage-rate"
                        width={16}
                        height={16}
                        className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem] "
                      />
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {Math.floor(CardDataOne[0]?.ratio)}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[0]?.ratio == 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-blue-50 h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {Math.floor(CardDataOne[0]?.ratio)}%
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* card */}
          <div
            // key={hero.index}
            className={`${
              loadingState
                ? 'h-[7.375rem] max-[1536px]:max-w-[25.25rem] w-full max-w-[18.25rem] max-[1024px]:max-w-[14.651rem] max-[1024px]:h-[5.974rem] bg-gray-300 shadow-lg` mx-auto rounded-md animate-pulse'
                : 'flex flex-col gap-[0.5rem] hover:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[18.25rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[1024px]:p-[1rem] max-[1024px]:py-[0.8rem] max-[1536px]:max-w-[25.25rem]'
            }`}
          >
            {loadingState ? (
              // <ImSpinner8 className="w-6 h-6  text-brand-success-primary animate-spin" />
              <div className=""></div>
            ) : (
              <>
                <div className="flex w-full justify-between gap-[0.5rem]">
                  <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL max-[1024px]:text-[0.7rem]">
                    {CardDataOne[1]?.title}
                  </p>
                  {/* <Image
                    src="/assets/images/reports/more.svg"
                    alt="More options"
                    width={20}
                    height={20}
                    className="w-[1.25rem] h-[1.25rem] max-[1024px]:w-[1rem] max-[1024px]:h-[1rem]"
                  /> */}
                </div>
                <div className="flex w-full justify-between gap-[1rem] items-center">
                  <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000] max-[1024px]:text-[1.2rem]">
                    {CardDataOne[1]?.amount}
                  </p>
                  {CardDataOne[1]?.ratio < 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#fecaca] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        className="rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3804 6.38065L8.33378 2.33398L4.28711 6.38065"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33398 13.6673V2.44727"
                          stroke="#dc2626"
                          stroke-width="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-red-300 tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {Math.floor(CardDataOne[1]?.ratio)}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[1]?.ratio > 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      {/* <Image
                        src={percentile}
                        alt="Percentage-rate"
                        width={16}
                        height={16}
                        className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem]"
                      /> */}
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {Math.floor(CardDataOne[1]?.ratio)}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[1]?.ratio == 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-blue-50 h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {Math.floor(CardDataOne[1]?.ratio)}%
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* card */}
          <div
            // key={hero.index}
            className={`${
              loadingState
                ? 'h-[7.375rem] w-full max-w-[18.25rem] max-[1536px]:max-w-[25.25rem] max-[1024px]:max-w-[14.651rem] max-[1024px]:h-[5.974rem] bg-gray-300 shadow-lg` mx-auto rounded-md animate-pulse'
                : 'flex flex-col gap-[0.5rem] hover:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[18.25rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[1024px]:p-[1rem] max-[1024px]:py-[0.8rem] max-[1536px]:max-w-[25.25rem]'
            }`}
          >
            {loadingState ? (
              // <ImSpinner8 className="w-6 h-6  text-brand-success-primary animate-spin" />
              <div className=""></div>
            ) : (
              <>
                <div className="flex w-full justify-between gap-[0.5rem]">
                  <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL max-[1024px]:text-[0.7rem]">
                    {CardDataOne[2]?.title}
                  </p>
                  {/* <Image
                    src="/assets/images/reports/more.svg"
                    alt="More options"
                    width={20}
                    height={20}
                    className="w-[1.25rem] h-[1.25rem] max-[1024px]:w-[1rem] max-[1024px]:h-[1rem]"
                  /> */}
                </div>
                <div className="flex w-full justify-between gap-[1rem] items-center">
                  <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000] max-[1024px]:text-[1.2rem]">
                    {CardDataOne[2]?.amount}
                  </p>
                  {CardDataOne[2]?.ratio < 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#fecaca] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        className="rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3804 6.38065L8.33378 2.33398L4.28711 6.38065"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33398 13.6673V2.44727"
                          stroke="#dc2626"
                          stroke-width="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-red-300 tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {CardDataOne[2]?.ratio}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[2]?.ratio > 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      {/* <Image
                        src={percentile}
                        alt="Percentage-rate"
                        width={16}
                        height={16}
                        className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem]"
                      /> */}
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {CardDataOne[2]?.ratio}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[2]?.ratio == 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-blue-50 h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {CardDataOne[2]?.ratio}%
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* card */}
          <div
            // key={hero.index}
            className={`${
              loadingState
                ? 'h-[7.375rem] w-full max-w-[18.25rem] max-[1536px]:max-w-[25.25rem] max-[1024px]:max-w-[14.651rem] max-[1024px]:h-[5.974rem] bg-gray-300 shadow-lg` mx-auto rounded-md animate-pulse'
                : 'flex flex-col gap-[0.5rem] hover:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[18.25rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[1024px]:p-[1rem] max-[1024px]:py-[0.8rem] max-[1536px]:max-w-[25.25rem]'
            }`}
          >
            {loadingState ? (
              // <ImSpinner8 className="w-6 h-6  text-brand-success-primary animate-spin" />
              <div className=""></div>
            ) : (
              <>
                <div className="flex w-full justify-between gap-[0.5rem]">
                  <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL max-[1024px]:text-[0.7rem]">
                    {CardDataOne[5]?.title}
                  </p>
                  {/* <Image
                    src="/assets/images/reports/more.svg"
                    alt="More options"
                    width={20}
                    height={20}
                    className="w-[1.25rem] h-[1.25rem] max-[1024px]:w-[1rem] max-[1024px]:h-[1rem]"
                  /> */}
                </div>
                <div className="flex w-full justify-between gap-[1rem] items-center">
                  <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000] max-[1024px]:text-[1.2rem]">
                    {CardDataOne[5]?.amount}
                  </p>
                  {CardDataOne[5]?.ratio < 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#fecaca] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        className="rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3804 6.38065L8.33378 2.33398L4.28711 6.38065"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33398 13.6673V2.44727"
                          stroke="#dc2626"
                          stroke-width="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-red-300 tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {Math.floor(CardDataOne[5]?.ratio)}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[5]?.ratio > 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      {/* <Image
                        src={percentile}
                        alt="Percentage-rate"
                        width={16}
                        height={16}
                        className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem] "
                      /> */}
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {Math.floor(CardDataOne[5]?.ratio)}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[5]?.ratio == 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-blue-50 h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {Math.floor(CardDataOne[5]?.ratio)}%
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[1.5rem] max-[1300px]:gap-[1rem] mt-[1.5rem] max-[1024px]:mt-[1rem]">
          <div
            // key={hero.index}
            className={`${
              loadingState
                ? 'h-[7.375rem] max-[1536px]:max-w-[47rem] w-full max-w-[38rem] max-[1024px]:max-w-[30.301rem] max-[1024px]:h-[5.974rem] bg-gray-300 shadow-lg` mx-auto rounded-md animate-pulse'
                : 'flex flex-col gap-[0.5rem] hover:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[38rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[1024px]:p-[1rem] max-[1024px]:py-[0.8rem] max-[1536px]:max-w-[47rem]'
            }`}
          >
            {loadingState ? (
              // <ImSpinner8 className="w-6 h-6  text-brand-success-primary animate-spin" />
              <div className=""></div>
            ) : (
              <>
                <div className="flex w-full justify-between gap-[0.5rem]">
                  <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL max-[1024px]:text-[0.7rem]">
                    {CardDataOne[3]?.title}
                  </p>
                  {/* <Image
                    src="/assets/images/reports/more.svg"
                    alt="More options"
                    width={20}
                    height={20}
                    className="w-[1.25rem] h-[1.25rem] max-[1024px]:w-[1rem] max-[1024px]:h-[1rem]"
                  /> */}
                </div>
                <div className="flex w-full justify-between gap-[1rem] items-center">
                  <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000] max-[1024px]:text-[1.2rem]">
                    ${CardDataOne[3]?.amount}
                  </p>
                  {CardDataOne[3]?.ratio < 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#fecaca] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        className="rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3804 6.38065L8.33378 2.33398L4.28711 6.38065"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33398 13.6673V2.44727"
                          stroke="#dc2626"
                          stroke-width="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-red-300 tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {CardDataOne[3]?.ratio}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[3]?.ratio > 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      {/* <Image
                        src={percentile}
                        alt="Percentage-rate"
                        width={16}
                        height={16}
                        className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem]"
                      /> */}
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {CardDataOne[3]?.ratio}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[3]?.ratio == 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-blue-50 h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {CardDataOne[3]?.ratio}%
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div
            // key={hero.index}
            className={`${
              loadingState
                ? 'h-[7.375rem] max-[1536px]:max-w-[47rem] w-full max-w-[38rem] max-[1024px]:max-w-[30.301rem] max-[1024px]:h-[5.974rem] bg-gray-300 shadow-lg` mx-auto rounded-md animate-pulse'
                : 'flex flex-col gap-[0.5rem] hover:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[38rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[1024px]:p-[1rem] max-[1024px]:py-[0.8rem] max-[1536px]:max-w-[47rem]'
            }`}
          >
            {loadingState ? (
              // <ImSpinner8 className="w-6 h-6  text-brand-success-primary animate-spin" />
              <div className=""></div>
            ) : (
              <>
                <div className="flex w-full justify-between gap-[0.5rem]">
                  <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL max-[1024px]:text-[0.7rem]">
                    {CardDataOne[4]?.title}
                  </p>
                  {/* <Image
                    src="/assets/images/reports/more.svg"
                    alt="More options"
                    width={20}
                    height={20}
                    className="w-[1.25rem] h-[1.25rem] max-[1024px]:w-[1rem] max-[1024px]:h-[1rem]"
                  /> */}
                </div>
                <div className="flex w-full justify-between gap-[1rem] items-center">
                  <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000] max-[1024px]:text-[1.2rem]">
                    {CardDataOne[4]?.amount}
                  </p>
                  {CardDataOne[4]?.ratio < 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#fecaca] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        className="rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3804 6.38065L8.33378 2.33398L4.28711 6.38065"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33398 13.6673V2.44727"
                          stroke="#dc2626"
                          stroke-width="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-red-300 tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {CardDataOne[4]?.ratio}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[4]?.ratio > 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <Image
                        src={percentile}
                        alt="Percentage-rate"
                        width={16}
                        height={16}
                        className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem]"
                      />
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {CardDataOne[4]?.ratio}%
                      </p>
                    </div>
                  )}
                  {CardDataOne[4]?.ratio == 0 && (
                    <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-blue-50 h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                      <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                        {CardDataOne[4]?.ratio}%
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hidden max-w-[47.125rem] w-full mx-auto mt-[1.75rem] max-[834px]:block max-[800px]:px-[1.5rem]">
        <div className="grid grid-cols-3 gap-[1rem] max-[800px]:grid-cols-2 max-[800px]:gap-[0.7rem] max-[540px]:grid-cols-1">
          {CardDataOne?.map((hero: any, index: any) => (
            <div
              key={index}
              className="flex flex-col gap-[0.5rem] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] max-w-[18.25rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[800px]:mx-auto max-[800px]:max-w-[25rem] max-[540px]:max-w-[30.25rem] max-[540px]:w-full"
            >
              <div className="flex w-full justify-between gap-[0.5rem]">
                <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL">
                  {hero?.title}
                </p>
                {/* <Image
                  src="/assets/images/reports/more.svg"
                  alt="More options"
                  width={20}
                  height={20}
                  className="w-[1.25rem] h-[1.25rem]"
                /> */}
              </div>
              <div className="flex w-full justify-between gap-[1rem] items-center">
                <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000]">{hero?.amount}</p>
                {hero?.ratio < 0 && (
                  <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#fecaca] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      className="rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3804 6.38065L8.33378 2.33398L4.28711 6.38065"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.33398 13.6673V2.44727"
                        stroke="#dc2626"
                        stroke-width="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-red-300 tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                      {Math.floor(hero?.ratio)}%
                    </p>
                  </div>
                )}
                {hero?.ratio > 0 && (
                  <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                    {/* <Image
                      src={percentile}
                      alt="Percentage-rate"
                      width={16}
                      height={16}
                      className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem] "
                    /> */}
                    <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                      {Math.floor(hero?.ratio)}%
                    </p>
                  </div>
                )}
                {hero?.ratio == 0 && (
                  <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-blue-50 h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                    <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                      {Math.floor(hero?.ratio)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden max-w-[47.125rem] w-full mx-auto mt-[1.75rem] pl-[1.5rem] max-[500px]:block pr-0">
        <div className="flex gap-[1.5rem] overflow-x-scroll no-scrollbar">
          {CardDataOne?.map((hero: any, index: any) => (
            // {loadingState ? <ImSpinner8 className="w-6 h-6  text-brand-success-primary animate-spin" />:}
            <div
              key={index}
              className="flex flex-col gap-[0.5rem] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.06),0px_1px_3px_0px_rgba(16,24,40,0.10)] p-[1.5rem] min-w-[14.25rem] w-full bg-[#FFF] rounded-[0.5rem] border border-[#F9F9F9] max-[800px]:mx-auto max-[800px]:max-w-[25rem] max-[540px]:max-w-[30.25rem] max-[540px]:w-full"
            >
              <div className="flex w-full justify-between gap-[0.5rem]">
                <p className="text-[0.875rem] text-[#737876] font-normal leading-[1.25rem] tracking-[0.00219rem] font-manropeL">
                  {hero?.title}
                </p>
                {/* <Image
                  src="/assets/images/reports/more.svg"
                  alt="More options"
                  width={20}
                  height={20}
                  className="w-[1.25rem] h-[1.25rem]"
                /> */}
              </div>
              <div className="flex w-full justify-between gap-[1rem] items-center">
                <p className="text-[2rem] font-manropeL font-bold leading-[2.5rem] text-[#000]">{hero?.amount}</p>
                {hero?.ratio < 0 && (
                  <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#fecaca] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      className="rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3804 6.38065L8.33378 2.33398L4.28711 6.38065"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.33398 13.6673V2.44727"
                        stroke="#dc2626"
                        stroke-width="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-red-300 tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                      {Math.floor(hero?.ratio)}%
                    </p>
                  </div>
                )}
                {hero?.ratio > 0 && (
                  <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-[#E6F5EA] h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                    {/* <Image
                      src={percentile}
                      alt="Percentage-rate"
                      width={16}
                      height={16}
                      className="w-[1rem] h-[1rem] max-[1024px]:w-[0.5rem] max-[1024px]:h-[0.5rem] "
                    /> */}
                    <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                      {Math.floor(hero?.ratio)}%
                    </p>
                  </div>
                )}
                {hero?.ratio == 0 && (
                  <div className="flex items-center py-[0.125rem] pl-[0.5rem] pr-[0.75rem] gap-[0.125rem] rounded-[0.75rem] bg-blue-50 h-[1.5rem] max-[1024px]:gap-[0.1rem]">
                    <p className="font-manropeL text-[0.875rem] leading-[1.25rem] text-[#009254] tracking-[0.00219rem] text-center max-[1024px]:text-[0.6rem]">
                      {Math.floor(hero?.ratio)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnalysisCards;
