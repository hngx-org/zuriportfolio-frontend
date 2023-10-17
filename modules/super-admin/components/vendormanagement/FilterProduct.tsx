import { SelectInput } from '@ui/Input';
import { Sort } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { filterProp } from '../../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

const FilterProduct = ({ handleFilter }: filterProp) => {
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    handleFilter(filterStatus);
  }, [filterStatus]);
  return (
    <div>
      <Select
        onValueChange={(value) => {
          setFilterStatus(value);
          handleFilter(value);
          console.log(value);
        }}
      >
        <SelectTrigger className="md:w-[100px] w-[50px]">
          <svg
            className="md:w-[50px] w-[80px]"
            width=""
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
              stroke="#344054"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="md:block hidden w-[100px]">
            <SelectValue placeholder="Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="status">Status</SelectItem>
          <SelectItem value="highest">Highest quantity</SelectItem>
          <SelectItem value="lowest">Lowest quantity</SelectItem>
          <SelectItem value="oldest">Oldest Products</SelectItem>
          <SelectItem value="newest">Newest Products</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterProduct;
