import React, { useEffect, useState, useContext } from 'react';
import { Input, SelectInput } from '@ui/Input';
import Button from '@ui/Button';
import Image from 'next/image';
import { SearchNormal1, Sort } from 'iconsax-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import FilterProduct from './filterProduct';
import { searchProp } from '../../../../@types';

function SearchProduct({ handleSearchChange }: searchProp) {
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    handleSearchChange(searchVal);
  }, [searchVal]);
  return (
    <div>
      <Input
        onChange={(e) => {
          setSearchVal(e.target.value);
          handleSearchChange(searchVal);
          console.log(searchVal);
        }}
        leftIcon={<SearchNormal1 />}
        type="text"
        intent={'default'}
        disabled={false}
        className="md:min-w-[350px] "
        placeHolder="search"
      />
    </div>
  );
}

export default SearchProduct;
