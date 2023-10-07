import React, { useEffect, useState, useContext } from 'react';
import { Input, SelectInput } from '@ui/Input';
import Button from '@ui/Button';
import Image from 'next/image';
import { SearchNormal1, Sort } from 'iconsax-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import FilterProduct from './filterProduct';
import { searchProp } from '../../../../@types';

function SearchProduct({ handleSearchChange }: searchProp) {
  const productList = [
    { id: 1, productName: 'Product 1', vendorName: 'Okereke James', dateAdded: '2023-10-01', status: 'active' },
    { id: 2, productName: 'Product 2', vendorName: 'Okereke James', dateAdded: '2023-10-01', status: 'active' },
    { id: 3, productName: 'Product 3', vendorName: 'Okereke James', dateAdded: '2023-10-02', status: 'deleted' },
    { id: 4, productName: 'Product 4', vendorName: 'Okereke James', dateAdded: '2023-10-03', status: 'sanctioned' },
  ];
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
        leftIcon={<SearchNormal1 color="#777" />}
        type="text"
        intent={'default'}
        disabled={false}
        className="md:min-w-[350px] "
      />
    </div>
  );
}

export default SearchProduct;
