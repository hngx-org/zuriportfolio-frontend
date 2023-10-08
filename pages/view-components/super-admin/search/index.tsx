// @modules/super-admin/components/Test.js
import SuperAdminSearch from '@modules/super-admin/components/search/SuperAdminSearch';
import React, { useState } from 'react';

const Test = () => {
  const originalData = [
    {
      customerName: 'chioma',
      age: 23,
    },
    {
      customerName: 'precious',
      age: 23,
    },
    {
      customerName: 'chioma',
      age: 23,
    },
    {
      customerName: 'nike',
      age: 23,
    },
  ];

  const [filteredData, setFilteredData] = useState(originalData);

  return (
    <div>
      <SuperAdminSearch results={originalData} setResults={setFilteredData} />
      {filteredData?.map((item, index) => <p key={index}>{item.customerName}</p>)}
    </div>
  );
};

export default Test;
