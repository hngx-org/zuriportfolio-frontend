// import { useState } from 'react';
import React, { FC } from 'react';
import { More } from 'iconsax-react';
import { ProductInfo } from '../../../../@types';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';
import FilterProduct from '@modules/super-admin/components/product-listing/filterProduct';

const data: ProductInfo[] = [
  {
    productName: 'Learning Design',
    vendor: 'Okereke James',
    id: 1234,
    dateAdded: '08-01-23',
    status: 'Sanctioned',
  },
  {
    productName: 'Frontend development ',
    vendor: 'Chukwu Chinaza',
    id: 1235,
    dateAdded: '08-01-23',
    status: 'Deleted',
  },
  {
    productName: 'Backend development',
    vendor: 'Mark Essien',
    id: 1236,
    dateAdded: '08-01-23',
    status: 'Active',
  },
  {
    productName: 'Ethical Hacking',
    vendor: 'Shobande Abraham',
    id: 1237,
    dateAdded: '08-01-23',
    status: 'Active',
  },
  {
    productName: 'Product management ',
    vendor: 'John Paul',
    id: 1238,
    dateAdded: '08-01-23',
    status: 'Active',
  },
  {
    productName: 'Digital Marketing',
    vendor: 'Bakare Femi',
    id: 1239,
    dateAdded: '08-01-23',
    status: 'Active',
  },
  {
    productName: 'Fullstack development ',
    vendor: 'Gustavo Silas',
    id: 1233,
    dateAdded: '08-01-23',
    status: 'Active',
  },
];

const ProductListingTable: FC = () => {
  return (
    <div className="font-manropeL max-w-7xl mx-auto">
      {/* Heading */}
      <div>
        <div className="py-2">
          <h2 className="text-lg  text-gray-900  font-bold">Products Listing</h2>
          <p className="text-gray-500 text-base">List of all products and their details</p>
        </div>
      </div>
      {/* Deleted products list */}
      <table className="w-full border-2 border-custom-color1 ">
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
          {data.map((product, index) => (
            <tr className="border-t border-custom-color1 border-2 py-4" key={index}>
              <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 items-center gap-6 self-stretch flex ">
                <input type="checkbox" />
                <p>{product.productName}</p>
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
