import React, { useState, useEffect } from 'react';
import { Input } from '@ui/Input';
import { SearchNormal1 } from 'iconsax-react';
import { superAdminSearch } from '../../../../@types';

const SuperAdminSearch = ({ results, setResults }: superAdminSearch) => {
  const [key, setKey] = useState('');
  const [filteredData, setFilteredData] = useState(results);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setKey(e.target.value);

    if (query === '') {
      setFilteredData(results);
    } else {
      const filteredResults = results.filter(
        (item: any) =>
          item?.id?.toLowerCase().includes(query) ||
          item?.productName?.toLowerCase().includes(query) ||
          item?.vendorName?.toLowerCase().includes(query) ||
          item?.customerName?.toLowerCase().includes(query)
      );
      setFilteredData(filteredResults);
    }
  };

  useEffect(() => {
    setResults(filteredData);
  }, [filteredData, setResults]);

  return (
    <Input
      value={key}
      onChange={handleSearch}
      leftIcon={<SearchNormal1 />}
      type="text"
      intent="default"
      disabled={false}
      className="md:min-w-[350px]"
    />
  );
};

export default SuperAdminSearch;
