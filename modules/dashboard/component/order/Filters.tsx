import React from 'react';
import { OrderHistory } from '../../../../@types';

function Filters(props: {
  filters: { id: keyof OrderHistory; title: string }[];
  currentFilter: string;
  changeFilter: (val: keyof OrderHistory) => void;
}) {
  return (
    <ul className="absolute w-fit [&>*]:px-4  [&>*]:py-2 transition-all rounded-md inset-0 bg-white-100 h-fit whitespace-nowrap shadow-lg top-12 -left-5 ">
      {props.filters.map((filter) => (
        <li key={filter.id}>{filter.title}</li>
      ))}
    </ul>
  );
}

export default Filters;
