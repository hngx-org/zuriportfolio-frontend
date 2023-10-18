import React, { useEffect, useState } from 'react';
import { Input, SelectInput } from '@ui/Input';
import { SearchNormal1, Sort } from 'iconsax-react';
import { searchProp } from '../../../../@types';
function SearchProduct({ handleSearchChange }: searchProp) {
  const [searchVal, setSearchVal] = useState('');
  useEffect(() => {
    handleSearchChange(searchVal);
  }, [searchVal]);
  return (
    <div className="w-[400px]">
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
        className="md:min-w-[350px] w-[100%]"
        placeHolder="Search"
      />
    </div>
  );
}
export default SearchProduct;
