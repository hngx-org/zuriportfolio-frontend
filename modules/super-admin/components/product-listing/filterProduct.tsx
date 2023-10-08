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
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="oldest">Oldest Products</SelectItem>
          <SelectItem value="newest">Newest Products</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterProduct;