import { OrderHistory } from '../../../../../@types';
import React from 'react';
import OrderDetailsRow from './OrderDetailsRow';
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
    id: 'productType',
    title: 'Product Type',
  },
  {
    id: 'price',
    title: 'Price/unit',
  },
  {
    id: 'sales',
    title: 'No. of sales',
  },
  {
    id: 'revenue',
    title: 'Total Revenue',
  },
];

const OrderDetailsTable: React.FC<{
  pageItem: any[];
  changeSort: (val: keyof OrderHistory) => void;
  toggleSort: () => void;
  currentSort: string;
}> = ({ changeSort, pageItem, toggleSort, currentSort }) => {
  const OnCLick = (val: keyof OrderHistory) => {
    if (val === currentSort) {
      toggleSort();
    } else {
      changeSort(val);
    }
  };
  return (
    <table className="w-full   mb-10 hidden md:table overflow-scroll">
      <thead>
        <tr className="border border-custom-color1 font-manropeL font-medium text-custom-color2 bg-custom-color3 [&>*]:px-6 [&>*]:py-3 ">
          {tableHeaders.map((header, i) => (
            <th
              className={`${i === 0 || i === 4 ? 'text-center' : 'text-start'} ${
                header.id === 'productName' && 'hidden lg:table-cell'
              } whitespace-nowrap cursor-pointer`}
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
          <OrderDetailsRow key={order.id} {...order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderDetailsTable;
