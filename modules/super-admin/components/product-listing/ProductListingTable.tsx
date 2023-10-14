import React, { useState, useEffect } from 'react';
import { ArrowDown, More, Sort } from 'iconsax-react';
import { ProductInfo } from '../../../../@types';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';
import FilterProduct from '@modules/super-admin/components/product-listing/filterProduct';
import Button from '@ui/Button';
import Link from 'next/link';
import Pagination from '../../../../pages/view-components/super-admin/pagination';

interface ExtractedProductInfo {
  product_id: number;
  product_name: string;
  status: string;
  vendor_name: string;
  date_added: string;
}

const ProductListingTable: React.FC = () => {
  // State to hold the fetched data from the endpoint
  const [data, setData] = useState<ProductInfo[]>([]);
  // State for search input value
  const [searchVal, setSearchVal] = useState<string>('');
  // State to hold the filtered products based on search and sorting
  const [filteredProducts, setFilteredProducts] = useState<ExtractedProductInfo[]>([]);

  useEffect(() => {
    // Fetch data from the endpoint when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://test-super-admin.onrender.com/api/product/get-all-products/');
        const result = await response.json();

        // Ensure result is an array
        const resultArray = Array.isArray(result) ? result : [];

        setData(resultArray);

        // Extracting specific fields: product_id, product_name, status, vendor_name
        const extractedData: ExtractedProductInfo[] = resultArray.map((product: ProductInfo) => ({
          product_id: product.product_id,
          product_name: product.product_name,
          status: product.status,
          vendor_name: product.vendor_name,
          date_added: product.date_added,
        }));

        setFilteredProducts(extractedData);

        // Log the extracted data
        console.log('Extracted Data:', extractedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchText: string) => {
    // Filter products based on the search text
    const filteredProduct = data.filter((product) =>
      product.product_name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };

  const handleFilter = (status: string) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const dateA: any = new Date(a.date_added);
      const dateB: any = new Date(b.date_added);

      return dateA - dateB;
    });
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container font-manropeL max-w-7xl mx-auto border-2 border-custom-color1 mt-4">
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

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-gray-500 text-sm font-normal leading-[18px] px-6 py-6 gap-3 text-left flex items-center">
              <input type="checkbox" />
              <p className="">Product Name</p>
              <ArrowDown size="16" className="" />
            </th>
            <th className="text-gray-500 text-sm font-normal leading-[18px] px-3 py-6 gap-3">Vendor</th>
            <th className="hidden md:table-cell text-gray-500 text-sm font-normal leading-[18px] px-3 py-6 gap-3">
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
          {Array.isArray(filteredProducts) &&
            filteredProducts.map((product, index) => (
              <tr className="border-t border-custom-color1  py-4" key={index}>
                <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 items-center gap-6 self-stretch flex ">
                  <input type="checkbox" />
                  <Link href="product-listing/product-details">
                    <p>{product.product_name}</p>
                  </Link>
                </td>
                <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                  <p>{product.vendor_name}</p>
                </td>
                <td className="hidden md:table-cell tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                  <p>#{product.product_id}</p>
                </td>
                <td className="hidden md:table-cell tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                  <p>{product.date_added}</p>
                </td>
                <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                  <div
                    className={` hidden  mx-auto rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2 w-max ${
                      product.status === 'Sanctioned'
                        ? 'mx-auto bg-custom-color40 text-yellow-600 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL font-medium'
                        : product.status === 'Deleted'
                        ? 'hidden mx-auto bg-pink-120 text-custom-color34 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL font-medium'
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
      <Pagination />
    </div>
  );
};

export default ProductListingTable;
