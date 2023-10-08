'use client';
// import { useState } from 'react';
// import React, { FC, useState} from 'react';
import React, { useState } from 'react';

import { More, Sort } from 'iconsax-react';
import { ProductInfo } from '../../../../@types';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';
import FilterProduct from '@modules/super-admin/components/product-listing/filterProduct';
import Button from '@ui/Button';
import Link from 'next/link';

const ProductListingTable = () => {
  const data: ProductInfo[] = [
    {
      productName: 'Learning Design',
      vendor: 'Okereke James',
      id: 1234,
      dateAdded: '08-01-23',
      status: 'Sanctioned',
    },
    {
      productName: 'Frontend Development',
      vendor: 'Chukwu Chinaza',
      id: 1235,
      dateAdded: '08-02-23',
      status: 'Deleted',
    },
    {
      productName: 'Backend Development',
      vendor: 'Mark Essien',
      id: 1236,
      dateAdded: '08-03-23',
      status: 'Active',
    },
    {
      productName: 'Ethical Hacking',
      vendor: 'Shobande Abraham',
      id: 1237,
      dateAdded: '08-04-23',
      status: 'Active',
    },
    {
      productName: 'Product Management',
      vendor: 'John Paul',
      id: 1238,
      dateAdded: '08-05-23',
      status: 'Active',
    },
    {
      productName: 'Digital Marketing',
      vendor: 'Bakare Femi',
      id: 1239,
      dateAdded: '08-06-23',
      status: 'Active',
    },
    {
      productName: 'Fullstack Development',
      vendor: 'Gustavo Silas',
      id: 1233,
      dateAdded: '08-07-23',
      status: 'Active',
    },
  ];
  const [searchVal, setSearchVal] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data);

  const handleSearch = (searchText: string) => {
    const filteredProduct: Array<{
      productName: string;
      vendor: string;
      id: number;
      dateAdded: string;
      status: string;
    }> = data.filter((product) => product.productName.toLowerCase().includes(searchText.toLowerCase()));
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };

  const handleFilter = (status: string) => {
    const sortedProducts = [...data].sort((a, b) => {
      const dateA = new Date(a.dateAdded);
      const dateB = new Date(b.dateAdded);

      if (status === 'newest') {
        return dateB.getTime() - dateA.getTime(); // Newest to oldest
      } else {
        return dateA.getTime() - dateB.getTime(); // Oldest to newest
      }
    });
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="font-manropeL max-w-7xl mx-auto border-2 border-custom-color1 mt-4">
      {/* Heading */}
      <div className="flex  justify-between items-center p-4">
        <div className="py-2">
          <h2 className="text-lg  text-gray-900  font-bold">Products Listing</h2>
          <p className="text-gray-500 text-base">List of all products and their details</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <SearchProduct handleSearchChange={handleSearch} />
          <div>
            <div className="md:block hidden">
              <FilterProduct handleFilter={handleFilter} />
            </div>
            <div className="md:hidden block">
              <Button intent={'primary'} size={'sm'}>
                <Sort />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Deleted products list */}
      <table className="w-full ">
        <thead>
          {/* Table Headers */}
          <tr>
            <th className="text-gray-500 text-xs font-normal leading-[18px] px-6 py-3 gap-3 text-left flex items-center">
              <input type="checkbox" />
              <samp> Product Name</samp>
            </th>
            <th className="text-gray-500 text-xs font-normal leading-[18px] px-3 py-3 gap-3">Vendor</th>
            <th className=" hidden md:table-cell text-gray-500 text-xs font-normal leading-[18px] px-3 py-3 gap-3 ">
              ID
            </th>
            <th className="hidden md:table-cell text-gray-500 text-xs font-normal leading-[18px] px-3 py-3 gap-3">
              Date Added
            </th>
            <th className="hidden md:table-cell text-gray-500 text-xs font-normal leading-[18px] px-3 py-3 gap-3">
              Status
            </th>
            <th className="hidden md:table-cell text-gray-500 text-xs font-normal leading-[18px] px-3 py-3 gap-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Listed Products */}
          {filteredProducts.map((product, index) => (
            <tr className="border-t border-custom-color1 border-2 py-4" key={index}>
              <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 items-center gap-6 self-stretch flex ">
                <input type="checkbox" />
                <Link href="/product-listing/product-details">
                  {' '}
                  <p>{product.productName} </p>
                </Link>
              </td>
              <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                <p>{product.vendor} </p>
              </td>
              <td className="hidden md:table-cell tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                <p>#{product.id}</p>
              </td>
              <td className="hidden md:table-cell tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                <p>{product.dateAdded}</p>
              </td>
              <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                <div
                  className={` hidden  mx-auto rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2 w-max ${
                    product.status === 'Sanctioned'
                      ? 'bg-yellow-100 bg-opacity-50 text-yellow-800'
                      : product.status === 'Deleted'
                      ? 'bg-red-200 bg-opacity-50 text-red-800'
                      : 'bg-green-200 bg-opacity-50 text-green-800'
                  }`}
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      product.status === 'Sanctioned'
                        ? 'bg-yellow-600'
                        : product.status === 'Deleted'
                        ? 'bg-red-800'
                        : 'bg-green-800'
                    }`}
                  ></span>
                  <span>{product.status}</span>
                </div>
              </td>
              <td className="hidden tracking-wide font-manropeL text-base text-gray-900 px-6 py-4 text-center w-max mx-auto md:flex">
                <More />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListingTable;
