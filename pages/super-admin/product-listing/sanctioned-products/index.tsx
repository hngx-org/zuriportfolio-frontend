import { ArrowDown, More } from 'iconsax-react';

import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';
import { useEffect, useState } from 'react';
import { sanctionedProducts } from '../../../../helpers/sanctionedProducts';
import Pagination from '../../../view-components/super-admin/pagination';
import { useRouter } from 'next/router';
import { getAllProducts } from '../../../../http';
import { DeletedProducts } from '../../../../@types';

const SanctionedProducts = () => {
  const [searchVal, setSearchVal] = useState('');
  const [sanctionedProducts, setSanctionedProducts] = useState<DeletedProducts[]>([]);
  const [filteredProduct, setFilteredProducts] = useState(sanctionedProducts);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (searchText: string) => {
    const filteredProduct: DeletedProducts[] = sanctionedProducts.filter((product) =>
      product.product_name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };

  useEffect(() => {
    const fetchDta = async () => {
      const dd = await getAllProducts();
      setSanctionedProducts(dd);
      console.log(setSanctionedProducts);
      // datar.filter(dat => dat.status.toLowerCase().includes("sanctioned"));
    };
    fetchDta();
    // const testFunc = async () => {
    //   const $http = axios.create({
    //     baseURL: "https://jsonplaceholder.typicode.com/",
    //     headers: {
    //       'Content-Type': 'application/json; charset=UTF-8'
    //     }
    //   })
    //   try {
    //     const resp = await $http.get('/users');
    //     console.log(resp);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // testFunc();
  }, []);

  useEffect(() => {
    const updateData = () => {
      const filteredDatar = sanctionedProducts.filter((dat) => dat.admin_status.toLowerCase().includes('sanctioned'));
      setFilteredProducts(filteredDatar);
      setIsLoading(false);
    };
    updateData();
  }, [sanctionedProducts]);

  const route = useRouter();

  return (
    <>
      <SuperAdminNavbar />

      <div className="m-6 font-manropeL max-w-7xl mx-auto border-2 border-custom-color1">
        {/* Heading */}
        <div className="py-3 px-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-lg font-medium text-custom-color10">Sanctioned Products</h2>
            <p className="text-custom-color2 text-sm">List of all sanctioned products and their details</p>
          </div>
          <div>
            <SearchProduct handleSearchChange={handleSubmit} />
          </div>
        </div>
        {/* Deleted products list */}
        <table className="border-t border-custom-color1 w-full">
          <thead>
            {/* Table Headers */}
            <tr>
              <th className="text-custom-color2 text-sm font-normal leading-[18px] px-6 py-6 gap-3 text-left flex  items-center">
                <input type="checkbox" />
                <samp>Product Name</samp>
                <ArrowDown size="16" className="" />
              </th>
              <th className="text-custom-color2 text-sm font-normal leading-[18px] px-3 py-6 gap-3">Vendor</th>
              <th className="hidden md:table-cell text-custom-color2 text-sm font-normal leading-[18px] px-3 py-6 gap-3 ">
                ID
              </th>
              <th className="hidden md:table-cell text-custom-color2 text-sm font-normal leading-[18px] px-3 py-6 gap-3">
                Date Added
              </th>
              <th className="hidden md:table-cell text-custom-color2 text-sm font-normal leading-[18px] px-3 py-6 gap-3">
                Date Deleted
              </th>
              <th className="hidden md:table-cell text-custom-color2 text-sm font-normal leading-[18px] px-3 py-6 gap-3">
                Status
              </th>
              <th className="hidden lg:table-cell text-custom-color2 text-sm font-normal leading-[18px] px-3 py-6 gap-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Listed Products */}
            {isLoading ? (
              <tr>
                {' '}
                <td className="absolute md:px-[40%] px-[20%]">Is loading</td>
              </tr>
            ) : filteredProduct.length == 0 ? (
              <tr className="absolute md:px-[40%] px-[20%]">
                <td>No Sanctioned products found!</td>
              </tr>
            ) : (
              sanctionedProducts.map((product, index) => (
                <tr
                  className="border-t  border-custom-color1 cursor-pointer transition delay-100 hover:bg-white-200 py-4"
                  key={index}
                  onClick={() => route.push(`/super-admin/product-listing/sanctioned-products/${product.id}`)}
                >
                  <td className="text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 items-center gap-6 self-stretch flex">
                    <input type="checkbox" />

                    {product.product_name}
                  </td>
                  <td className="text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                    {product.vendor_name}
                  </td>
                  <td className="hidden md:table-cell text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                    #{product.id}
                  </td>
                  <td className="hidden md:table-cell text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                    {product.createdAt}
                  </td>
                  <td className="hidden md:table-cell text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                    {product.updatedAt}
                  </td>
                  <td className="hidden md:table-cell text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color2 px-6 py-4 text-center">
                    <div className="hidden mx-auto bg-custom-color40 text-yellow-600 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2 w-max">
                      <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full"></span>
                      <span className="capitalize">{product.admin_status}</span>
                    </div>
                  </td>

                  <td className="hidden tracking-wide font-manropeL text-base text-custom-color2 px-6 py-4 text-center w-max mx-auto lg:flex">
                    <More />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-5">
        <Pagination />
      </div>
    </>
  );
};

export default SanctionedProducts;
