import React from 'react';
import OrderHistoryRow from './OrderHistoryRow';
import { OrderHistory } from '../../../../../@types';
const tableHeaders: {
  id: keyof OrderHistory;
  title: string;
}[] = [
  {
    id: 'id',
    title: 'Order iD',
  },
  {
    id: 'productName',
    title: 'Product Name',
  },
  {
    id: 'customerName',
    title: 'Customer Name',
  },
  {
    id: 'date',
    title: 'Date',
  },
  {
    id: 'status',
    title: 'Status',
  },
];
const OrderHistoryTable: React.FC<{
  pageItem: any[];
  changeSort: (val: keyof OrderHistory) => void;
  currentSort: string;
}> = ({ pageItem, currentSort, changeSort }) => {
  const OnCLick = (val: keyof OrderHistory) => {
    if (val === currentSort) {
      return;
    } else {
      changeSort(val);
    }
  };
  return (
    <table className="w-full mb-10 hidden md:table">
      <thead>
        <tr className="border border-custom-color1 font-manropeL font-medium text-custom-color2 bg-custom-color3 [&>*]:px-6 [&>*]:py-3 ">
          {tableHeaders.map((header, i) => (
            <th
              className={`${i === 0 || i === 4 ? 'text-center' : 'text-start'} whitespace-nowrap cursor-pointer`}
              key={header.id}
              onClick={() => OnCLick(header.id)}
            >
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pageItem.map((order, i) => (
          <OrderHistoryRow key={`${order.id}${i}`} {...order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderHistoryTable;
