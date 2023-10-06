import React from 'react';
import { PromotionHistory } from '../../../../../@types';
import PromotionHistoryRow from './PromotionHistoryRow';

const tableHeaders: {
  id: keyof PromotionHistory;
  title: string;
}[] = [
  {
    id: 'productName',
    title: 'Product Name',
  },
  {
    id: 'type',
    title: 'Type',
  },
  {
    id: 'status',
    title: 'Status',
  },
  {
    id: 'discount',
    title: 'Discount Details',
  },
  {
    id: 'quantity',
    title: 'Quantity',
  },
  {
    id: 'sales',
    title: 'Useage/Sales',
  },
  {
    id: 'action',
    title: 'Action',
  },
];
const PromotionHistoryTable: React.FC<{
  pageItem: any[];
  changeSort: (val: keyof PromotionHistory) => void;
  toggleSort: () => void;
  currentSort: string;
}> = ({ pageItem, currentSort, changeSort, toggleSort }) => {
  const OnCLick = (val: keyof PromotionHistory) => {
    if (val === currentSort) {
      toggleSort();
    } else {
      changeSort(val);
    }
  };
  return (
    <table className="w-full mb-10 hidden md:table border rounded-lg">
      <thead>
        <tr className="border border-[#EAECF0] font-manropeL text-left font-medium text-[#2E3130] bg-[#F9FAFB] [&>*]:px-6 [&>*]:py-3 ">
          {tableHeaders.map((header, i) => (
            <th
              className={`${i === 0 || i === 4 ? 'text-start' : 'text-center'} cursor-pointer`}
              key={header.id}
              onClick={() => OnCLick(header.id)}
            >
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pageItem.map((order) => (
          <PromotionHistoryRow key={order.id} {...order} />
        ))}
      </tbody>
    </table>
  );
};

export default PromotionHistoryTable;
