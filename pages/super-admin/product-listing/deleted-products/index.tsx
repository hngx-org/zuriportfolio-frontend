import { ArrowDown } from 'iconsax-react';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';
import { useEffect, useState } from 'react';
import SuperAdminPagination from '@modules/super-admin/components/pagination';
import { useRouter } from 'next/router';
import { useGetProd } from '../../../../http';
import { DeletedProducts } from '../../../../@types';
import { LoadingTable } from '@modules/super-admin/components/product-listing/ProductListingTable';
import { formatDate } from '@modules/super-admin/components/product-listing/product-details';

const SanctionedProducts = () => {
  const [searchVal, setSearchVal] = useState('');
  const { data, isLoading } = useGetProd();
  const [sanctionedProducts, setSanctionedProducts] = useState<DeletedProducts[]>(data);

  const deletedProd = data?.data?.filter((item: any) => item?.product_status === 'Deleted');

  const [filteredProducts, setFilteredProducts] = useState(deletedProd);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate the range of products to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = filteredProducts?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setFilteredProducts(deletedProd);
  }, [sanctionedProducts]);
  useEffect(() => {}, [filteredProducts]);

  const handleSearch = (searchText: string) => {
    const filteredProduct: any = data?.data?.filter(
      (product: any) =>
        product?.product_name?.toLowerCase()?.includes(searchText.toLowerCase()) &&
        product?.product_status?.toLowerCase()?.includes('deleted'),
    );
  };

  const handleSubmit = (searchText: string) => {
    const filteredProduct: DeletedProducts[] = sanctionedProducts.filter((product) =>
      product.product_name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };

  const route = useRouter();

  return (
    <>
      <SuperAdminNavbar />
      <div className="m-6 font-manropeL max-w-7xl mx-auto border-2 border-custom-color1">
        <div className="py-3 px-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-lg font-medium text-custom-color10">Deleted Products</h2>
            <p className="text-custom-color2 text-sm">List of all deleted products and their details</p>
          </div>
          <div>
            <SearchProduct handleSearchChange={handleSearch} />
          </div>
        </div>
        {isLoading ? (
          <LoadingTable />
        ) : (
          <div className="mb-4">
            {visibleProducts?.length > 0 ? (
              <>
                <table className="w-full ">
                  <thead>
                    <tr>
                      <th className="text-gray-500 text-sm font-normal leading-[18px] px-6 py-6 gap-3 text-left flex items-center">
                        <p className="">Product Name</p>
                        <ArrowDown size="16" className="" />
                      </th>
                      {['Vendor', 'ID', 'Date Added', 'Date Deleted', 'Status'].map((item) => (
                        <th className="text-gray-500 text-sm font-normal leading-[18px] px-3 py-6 gap-3" key={item}>
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleProducts?.map((product: any) => (
                      <tr
                        className="border-t  border-custom-color1 cursor-pointer transition delay-100 hover:bg-white-200 py-4"
                        key={product?.product_id}
                        onClick={() =>
                          route.push(`/super-admin/product-listing/sanctioned-products/${product?.product_id}`)
                        }
                      >
                        <td className="tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 items-center gap-6 self-stretch flex ">
                          <p>{product?.product_name} </p>
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
                        <td className="hidden md:table-cell tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                          <p>{formatDate(product?.updatedAt)}</p>
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
                <SuperAdminPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <p className="text-red-100 my-10 w-fit mx-auto">Nothing to show</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SanctionedProducts;
