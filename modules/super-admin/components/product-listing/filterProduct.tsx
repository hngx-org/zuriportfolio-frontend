import { SelectInput } from '@ui/Input';
import { Sort } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { filterProp } from '../../../../@types';

const FilterProduct = ({ handleFilter }: filterProp) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchVal, setSearchVal] = useState('');

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
            value: 'newest',
            label: 'Newest to oldest',
          },
          {
            value: 'oldest',
            label: 'Oldest to newest',
          },
        ]}
        disabled={false}
        intent="default"
        onChange={(e) => {
          setFilterStatus(e.target.value);
          handleFilter(e.target.value);
          console.log(e.target.value);
        }}
        className="w-[150px]"
      />
    </div>
  );
};

export default FilterProduct;
