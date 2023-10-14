import React, { useEffect, useState } from 'react';

import { ArrowDown, Sort } from 'iconsax-react';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';
import FilterProduct from '@modules/super-admin/components/product-listing/filterProduct';
import Button from '@ui/Button';
import Link from 'next/link';
import Pagination from '../../../../pages/view-components/super-admin/pagination';
import { formatDate } from './product-details';
import { useRouter } from 'next/router';

export const LoadingTable = () => {
  return (
    <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-slate-100 border-t-transparent mx-auto my-20"></div>
  );
};

const ProductListingTable = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const [searchVal, setSearchVal] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data?.data);

  useEffect(() => {
    setFilteredProducts(data?.data);
  }, [data]);

  const handleSearch = (searchText: string) => {
    const filteredProduct: any = data?.data?.filter(
      (product: any) => product?.product_name?.toLowerCase()?.includes(searchText.toLowerCase()),
    );
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };

  const route = useRouter();

  const handleFilter = (status: string) => {
    if (data?.data) {
      let sortedProducts: any = [...data.data]; // Create a copy of the full dataset

      sortedProducts = sortedProducts.sort((a: any, b: any) => {
        const dateA = new Date(formatDate(a.createdAt));
        const dateB = new Date(formatDate(b.createdAt));

        if (status === 'newest') {
          return dateB.getTime() - dateA.getTime(); // Newest to oldest
        } else if (status === 'oldest') {
          return dateA.getTime() - dateB.getTime(); // Oldest to newest
        } else {
          const statusOrder: { [key: string]: number } = {
            Active: 1,
            Sanctioned: 2,
            Deleted: 3,
          };
          return statusOrder[a.product_status] - statusOrder[b.product_status];
        }
      });

      setFilteredProducts(sortedProducts);
    }
  };

  return (
    <div className="font-manropeL mb-8 container mx-auto border-2 border-custom-color1 mt-4">
      <div className="border-b border-white-115 border-solid py-2 px-3 flex flex-col md:flex-row items-left md:items-center justify-between">
        <div className="mb-4 md:mb-0 py-3">
          <p className="text-lg font-bold">Products Listing</p>
          <p className="text-gray-500 text-sm">List of all Products and their details</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <SearchProduct handleSearchChange={handleSearch} />
          <div>
            <div className="md:block hidden">
              <FilterProduct handleFilter={handleFilter} />
            </div>
            <div className="md:hidden block">
              <Button>
                <Sort />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingTable />
      ) : (
        <div className="mb-4">
          {filteredProducts?.length > 0 ? (
            <>
              <table className="w-full ">
                <thead>
                  <tr>
                    <th className="text-gray-500 text-sm font-normal leading-[18px] px-6 py-6 gap-3 text-left flex items-center">
                      <p className="">Product Name</p>
                      <ArrowDown size="16" className="" />
                    </th>
                    <th className="text-gray-500 text-sm font-normal leading-[18px] px-3 py-6 gap-3">Vendor</th>
                    <th className=" hidden md:table-cell text-gray-500 text-sm font-normal leading-[18px] px-3 py-6 gap-3 ">
                      ID
                    </th>
                    <th className="hidden md:table-cell text-gray-500 text-sm font-normal leading-[18px] px-3 py-6 gap-3">
                      Date Added
                    </th>
                    <th className="hidden md:table-cell text-gray-500 text-sm font-normal leading-[18px] px-3 py-6 gap-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts?.map((product: any) => (
                    <tr
                      className="border-t  border-custom-color1 cursor-pointer transition delay-100 hover:bg-white-200 py-4"
                      key={product?.product_id}
                      onClick={() => route.push(`/super-admin/product-listing/product-details/${product?.product_id}`)}
                    >
                      <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 items-center gap-6 self-stretch flex ">
                        <Link href="product-listing/product-details">
                          <p>{product?.product_name} </p>
                        </Link>
                      </td>
                      <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                        <p>{product?.vendor_name} </p>
                      </td>
                      <td className="hidden md:table-cell tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                        <p>#{product?.product_id}</p>
                      </td>
                      <td className="hidden md:table-cell tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                        <p>{formatDate(product?.createdAt)}</p>
                      </td>
                      <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                        <div
                          className={` hidden  mx-auto rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2 w-max ${
                            product?.product_status === 'Sanctioned'
                              ? 'mx-auto bg-custom-color40 text-yellow-600 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL font-medium'
                              : product?.product_status === 'Deleted'
                              ? 'hidden mx-auto bg-pink-120 text-custom-color34 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL font-medium'
                              : 'bg-green-200 bg-opacity-50 text-green-800'
                          }`}
                        >
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              product?.product_status === 'Sanctioned'
                                ? 'bg-yellow-600'
                                : product?.product_status === 'Deleted'
                                ? 'bg-red-800'
                                : 'bg-green-800'
                            }`}
                          ></span>
                          <span>{product?.product_status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination />
            </>
          ) : (
            <p className="text-red-100 my-10 w-fit mx-auto">Nothing to show</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductListingTable;
