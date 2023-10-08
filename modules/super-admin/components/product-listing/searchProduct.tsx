import React, { useEffect, useState } from 'react';
import { Input } from '@ui/Input';
import { SearchNormal1, Sort } from 'iconsax-react';
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
      />
    </div>
  );
}

export default SearchProduct;
