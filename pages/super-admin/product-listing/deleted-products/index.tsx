import { useEffect, useState } from 'react';
import { ArrowDown, More } from 'iconsax-react';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';
import { deletedProducts } from '../../../../helpers/sanctionedProducts';
import Pagination from '../../../view-components/super-admin/pagination';
import { useRouter } from 'next/router';
import { DeletedProducts } from '../../../../@types';
import { getAllProducts } from '../../../../http';

const DeletedProducts = () => {
  const [searchVal, setSearchVal] = useState('');
  const [deletedProducts, setDeletedProducts] = useState<DeletedProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProduct, setFilteredProducts] = useState(deletedProducts);

  const handleSubmit = (searchText: string) => {
    const filteredProduct: DeletedProducts[] = deletedProducts.filter((product) =>
      product.product_name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };

  useEffect(() => {
    const fetchDta = async () => {
      const dd = await getAllProducts(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNzVkZDIyLTBhMTAtNGY0NC05Yjc1LWE3NDI1Nzg0NzFiMiIsImZpcnN0TmFtZSI6InNhcHBoaXJlQGdtYWlsLmNvbSIsImVtYWlsIjoic2FwcGhpcmVqdWRpdGhAZ21haWwuY29tIiwiaWF0IjoxNjk3MjA3OTQ2fQ.9cWy9mxCLtLZIfDzFoV0KOwwiHP36BcPYXs4P6YDIZA',
      );
      setDeletedProducts(dd);
      console.log();
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
      const filteredDatar = deletedProducts.filter((dat) => dat.product_status.toLowerCase().includes('deleted'));
      setFilteredProducts(filteredDatar);
      setIsLoading(false);
    };
    updateData();
  }, [deletedProducts]);

  const route = useRouter();

  return (
    <>
      <SuperAdminNavbar />
      <div className="m-6 container mx-auto font-manropeL border-2 border-custom-color1">
        <div className="py-6 px-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-lg font-medium text-custom-color10">Deleted Products</h2>
            <p className="text-custom-color2 text-sm">List of all deleted products and their details</p>
          </div>
          <div>
            <SearchProduct handleSearchChange={handleSubmit} />
          </div>
        </div>
        <table className="border-t border-custom-color1 w-full">
          <thead>
            <tr>
              <th className="text-custom-color2 text-sm font-normal leading-5 px-6 py-6 gap-3 text-left flex  items-center">
                <input type="checkbox" />
                <span>Product Name </span>
                <ArrowDown size="16" className="" />
              </th>
              <th className="text-custom-color2 text-sm font-normal leading-5 px-3 py-6 gap-3">Vendor</th>
              <th className="hidden md:table-cell text-custom-color2 text-sm font-normal leading-5 px-3 py-6 gap-3 ">
                ID
              </th>
              <th className="hidden md:table-cell text-custom-color2 text-sm font-normal leading-5 px-3 py-6 gap-3">
                Date Added
              </th>
              <th className="hidden md:table-cell text-custom-color2 text-sm font-normal leading-5 px-3 py-6 gap-3">
                Date Deleted
              </th>
              <th className="hidden md:table-cell text-custom-color2 text-sm font-normal leading-5 px-3 py-6 gap-3">
                Status
              </th>
              <th className="hidden lg:table-cell text-custom-color2 text-sm font-normal leading-5 px-3 py-6 gap-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                {' '}
                <td className="absolute md:px-[40%] px-[20%]">Is loading...</td>
              </tr>
            ) : filteredProduct.length == 0 ? (
              <tr className="absolute md:px-[40%] px-[20%]">
                <td>No Deleted products found!</td>
              </tr>
            ) : (
              deletedProducts.map((product, index) => (
                <tr
                  className="border-t border-custom-color1 cursor-pointer transition delay-100 hover:bg-white-200"
                  key={index}
                  onClick={() => route.push(`/super-admin/product-listing/deleted-products/${product.id}`)}
                >
                  <td className="text-xs tracking-wider lg:tracking-wide font-manropeL lg:text-base text-custom-color10 px-6 py-4 items-center gap-6 self-stretch flex">
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
                    <div className="hidden mx-auto bg-pink-120 text-custom-color34 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2 w-max">
                      <span className="inline-block w-2 h-2 bg-custom-color34 rounded-full"></span>
                      <span className=" capitalize">{product.product_status}</span>
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

export default DeletedProducts;
