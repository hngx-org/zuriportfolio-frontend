import { SelectInput } from '@ui/Input';
import { Sort } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { filterProp } from '../../../../@types';

const FilterProduct = ({ handleFilter }: filterProp) => {
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    handleFilter(filterStatus);
  }, [filterStatus]);
  return (
    <div>
      <SelectInput
        leftIcon={<Sort />}
        inputSize={'sm'}
        options={[
          {
            value: 'all',
            label: 'Filters',
          },
          {
            value: 'highest',
            label: 'Highest qty',
          },
          {
            value: 'lowest',
            label: 'Lowest qty',
          },
          {
            value: 'newest',
            label: 'Newest products',
          },
          {
            value: 'oldest',
            label: 'Oldest products',
          },
        ]}
        disabled={false}
        intent="default"
        onChange={(e) => {
          setFilterStatus(e.target.value);
          handleFilter(e.target.value);
          console.log(e.target.value);
        }}
        className="md:w-fit w-[100px]"
      />
    </div>
  );
};

export default FilterProduct;
