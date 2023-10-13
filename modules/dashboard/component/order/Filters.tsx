import React from 'react';
import { OrderHistory } from '../../../../@types';
import { useRouter } from 'next/router';

function Filters(props: {
  filters: { id: keyof OrderHistory; title: string }[];
  currentFilter: string;
  changeFilter: (val: keyof OrderHistory) => void;
  closeFilter: () => void;
}) {
  const { pathname } = useRouter();

  return (
    <ul
      className={`absolute w-fit [&>*]:px-4  [&>*]:py-2 transition-all rounded-md inset-0 bg-white-100 h-fit whitespace-nowrap shadow-lg  top-12 md:-left-5 ${
        pathname.includes('orders/details') ? '-left-8' : '-left-[250%]'
      } flex flex-col gap-3 z-50  mx-auto max-h-60 overflow-y-scroll scrollbar-track-black `}
    >
      {props.filters.map((filter) => (
        <li
          key={filter.id}
          className={`${
            props.currentFilter === filter.id && 'border-l-4 border-l-brand-green-primary text-brand-green-primary'
          } cursor-pointer`}
          onClick={() => {
            props.changeFilter(filter.id);
            props.closeFilter();
          }}
        >
          {filter.title}
        </li>
      ))}
    </ul>
  );
}

export default Filters;
