import React from 'react';

const Filters = () => {
  return (
    <ul className="absolute w-fit [&>*]:px-4  [&>*]:py-2 transition-all rounded-md inset-0 bg-white-100 h-fit whitespace-nowrap shadow-lg top-12 -left-5 ">
      <li className="">Order Id</li>
      <li>Product Name</li>
      <li>Customer Name</li>
      <li>Date</li>
    </ul>
  );
};

export default Filters;
