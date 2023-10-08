import { useState } from 'react';
import { More } from 'iconsax-react';
import products from './deletedProducts';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import Pagination from '../view-components/super-admin/pagination';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';

const DeletedProducts = () => {
  const [searchVal, setSearchVal] = useState('');
  const [filteredProduct, setFilteredProducts] = useState(products);

  const handleSubmit = (searchText: string) => {
    const filteredProduct: Array<{
      name: string;
      vendor: string;
      id: number;
      dateAdded: Date;
      dateDeleted: Date;
      status: string;
    }> = products.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };

  return (
    <>
      <SuperAdminNavbar />
      <div className="m-6 font-manropeL border border-custom-color1">
        {/* <ProductListingTable /> */}
        {/* Heading */}
        <div className="py-3 px-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-lg font-medium text-custom-color10">Deleted Products</h2>
            <p className="text-custom-color2 text-sm">List of all deleted products and their details</p>
          </div>
          <div>
            {/* input for search */}
            <SearchProduct handleSearchChange={handleSubmit} />
          </div>
        </div>
        {/* Deleted products list */}
        <table className="border-t border-custom-color1 w-full">
          <thead>
            {/* Table Headers */}
            <tr>
              <th className="text-custom-color2 text-xs font-normal leading-5 px-6 py-3 gap-3 text-left flex  items-center">
                <input type="checkbox" />
                <span>Product Name </span>
              </th>
              <th className="text-custom-color2 text-xs font-normal leading-5 px-3 py-3 gap-3">Vendor</th>
              <th className="hidden md:table-cell text-custom-color2 text-xs font-normal leading-5 px-3 py-3 gap-3 ">
                ID
              </th>
              <th className="hidden md:table-cell text-custom-color2 text-xs font-normal leading-5 px-3 py-3 gap-3">
                Date Added
              </th>
              <th className="hidden md:table-cell text-custom-color2 text-xs font-normal leading-5 px-3 py-3 gap-3">
                Date Deleted
              </th>
              <th className="hidden md:table-cell text-custom-color2 text-xs font-normal leading-5 px-3 py-3 gap-3">
                Status
              </th>
              <th className="hidden lg:table-cell text-custom-color2 text-xs font-normal leading-5 px-3 py-3 gap-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Listed Products */}
            {products.map((product, index) => (
              <tr className="border-t border-custom-color1" key={index}>
                <td className="text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color10 px-6 py-4 items-center gap-6 self-stretch flex">
                  <input type="checkbox" />

                  {product.name}
                </td>
                <td className="text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                  {product.vendor}
                </td>
                <td className="hidden md:table-cell text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                  #{product.id}
                </td>
                <td className="hidden md:table-cell text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                  {product.dateAdded.getDate().toString().padStart(2, '0')}-
                  {(product.dateAdded.getMonth() + 1).toString().padStart(2, '0')}-
                  {(product.dateAdded.getFullYear() % 100).toString().padStart(2, '0')}
                </td>
                <td className="hidden md:table-cell text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                  {product.dateDeleted.getDate().toString().padStart(2, '0')}-
                  {(product.dateDeleted.getMonth() + 1).toString().padStart(2, '0')}-
                  {(product.dateDeleted.getFullYear() % 100).toString().padStart(2, '0')}
                </td>
                <td className="hidden md:table-cell text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                  <div className="hidden mx-auto bg-pink-120 text-custom-color34 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2 w-max">
                    <span className="inline-block w-2 h-2 bg-custom-color34 rounded-full"></span>
                    <span className=" capitalize">{product.status}</span>
                  </div>
                </td>

                <td className="hidden tracking-wide font-manropeL text-base text-custom-color2 px-6 py-4 text-center w-max mx-auto lg:flex">
                  <More />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  );
};

export default DeletedProducts;
