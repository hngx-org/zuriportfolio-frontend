import { Manrope } from 'next/font/google';
import React from 'react';
import { OrderHistory } from '../../../../../@types';
import { Clock } from 'iconsax-react';
const manropeMD = Manrope({
  weight: ['500'],
  subsets: ['latin'],
});

const CancelledTab: React.FC = () => {
  return (
    <div
      className={`md:bg-[#FEF3F2] text-[#B42318] ${manropeMD.className} mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit rounded-2xl  `}
    >
      <div className="hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
          <path
            d="M9.5 3L3.5 9M3.5 3L9.5 9"
            stroke="#F04438"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="md:hidden lg:inline-block">Cancelled</span>
    </div>
  );
};
const CompletedTab: React.FC = () => {
  return (
    <div
      className={`md:bg-[#ECFDF3] text-[#027A48] ${manropeMD.className} mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit rounded-2xl `}
    >
      <div className="md:block hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
          <path
            d="M10.5 3L5 8.5L2.5 6"
            stroke="#12B76A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="md:hidden lg:inline-block">Completed</span>
    </div>
  );
};
const PendingTab = () => {
  return (
    <div
      className={`md:bg-[#fcec66] text-[#837737] ${manropeMD.className}  mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit rounded-2xl `}
    >
      <div className="md:block hidden">
        <Clock size="16" color="#837737" />
      </div>
      <span className="md:hidden lg:inline-block">Pending</span>
    </div>
  );
};
const OrderHistoryRow = (props: OrderHistory) => {
  const padDate = (num: number) => {
    return String(num).padStart(2, '0');
  };
  const formatDate = () => {
    const date = props.date;

    return `${padDate(date.getDate()).padStart(2, '0')}/${padDate(date.getMonth())}/${date.getFullYear()}`;
  };

  return (
    <tr className="font-manropeL border border-[#EAECF0] font-normal text-[#667085] [&>*]:px-6  [&>*]:py-4">
      <td className={`text-[#101828] ${manropeMD.className} text-center`}>#{props.id}</td>
      <td>{props.productName}</td>
      <td className={`text-[#101828] ${manropeMD.className}`}>{props.customerName}</td>
      <td>{formatDate()}</td>
      <td>
        {props.status === 'completed' && <CompletedTab />}
        {props.status === 'cancelled' && <CancelledTab />}
        {props.status === 'pending' && <PendingTab />}
      </td>
    </tr>
  );
};
export const OrderHistoryMobile = (props: OrderHistory) => {
  const padDate = (num: number) => {
    return String(num).padStart(2, '0');
  };
  const formatDate = () => {
    const date = props.date;

    return `${padDate(date.getDate()).padStart(2, '0')}/${padDate(date.getMonth())}/${date.getFullYear()}`;
  };
  return (
    <div
      className="font-manropeB font-semibold px-[10px]  py-4 rounded-2xl flex justify-between items-center"
      style={{
        boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.14)`,
      }}
    >
      <div className="flex flex-col">
        <h2 className=" text-[14px] font-semibold mb-2 text-[#1A1C1B]  tracking-[0.014px] leading-[144%]">
          {props.productName}
        </h2>
        <p className="text-[12px] mb-3  text-dark-110">{props.customerName}</p>
        <p className="text-[#5B5F5E] font-semibold">
          Order ID: <span className="text-dark-110 font-manropeL font-normal">#{props.id}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {props.status === 'completed' && <CompletedTab />}
        {props.status === 'cancelled' && <CancelledTab />}
        {props.status === 'pending' && <PendingTab />}
        <p>{formatDate()}</p>
      </div>
    </div>
  );
};
export default OrderHistoryRow;
