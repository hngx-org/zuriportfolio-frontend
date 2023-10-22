import { ArrowDown, SearchNormal1 } from 'iconsax-react';

import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import { useState } from 'react';
import SuperAdminPagination from '@modules/super-admin/components/pagination';
import { useRouter } from 'next/router';
import { useGetPending } from '../../../../http/super-admin1';
import { LoadingTable } from '@modules/super-admin/components/product-listing/ProductListingTable';
import { formatDate } from '@modules/super-admin/components/product-listing/product-details';
import { withAdminAuth } from '../../../../helpers/withAuth';
import { Input } from '@ui/Input';
import StatusPill from '@modules/super-admin/components/StatusPill';
import Image from 'next/image';
import right from '/public/assets/vendor/arrow-right.svg';

const PendingProducts = () => {
  const [searchVal, setSearchVal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { pendData, pendLoading } = useGetPending(currentPage, searchVal);

  const route = useRouter();

  return (
    <>
      <SuperAdminNavbar />
      <div className=" container">
        <Image
          src={right}
          alt="back"
          className="  pb-3 cursor-pointer"
          onClick={() => route.push('/super-admin/product-listing/')}
        ></Image>
      </div>

      <div className=" container  font-manropeL mx-auto border-2 border-custom-color1">
        <div className="py-3 px-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-lg font-medium text-custom-color10">Pending Products</h2>
            <p className="text-custom-color2 text-sm">List of all pending products and their details</p>
          </div>
          <div>
            <div className="w-[400px]">
              <Input
                onChange={(e) => {
                  // handleSearch(e.target.value);
                  setSearchVal(e.target.value);
                  console.log(e.target.value);
                }}
                leftIcon={<SearchNormal1 />}
                type="text"
                intent={'default'}
                disabled={false}
                className="md:min-w-[350px] w-[100%]"
                placeHolder="search"
              />
            </div>
          </div>
        </div>
        {pendLoading ? (
          <LoadingTable />
        ) : (
          <div className="mb-4">
            {pendData?.data?.length > 0 ? (
              <>
                <table className="w-full md:table-fixed">
                  <thead>
                    <tr>
                      <th className="text-gray-500 text-sm font-normal leading-[18px] px-6 py-6 gap-3 text-left flex items-center">
                        <p className="">Product Name</p>
                        <ArrowDown size="16" className="" />
                      </th>
                      {['Vendor', 'ID', 'Date Added', 'Date Sanctioned', 'Status'].map((item, index) => (
                        <th
                          className={`text-gray-500 ${
                            index === 0 ? 'table-cell' : 'hidden md:table-cell'
                          } text-sm font-normal leading-[18px] px-3 py-6 gap-3`}
                          key={item}
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pendData?.data.map((product: any) => (
                      <tr
                        className="border-t  border-custom-color1 cursor-pointer transition delay-100 hover:bg-white-200 py-4"
                        key={product?.product_id}
                        onClick={() =>
                          route.push(`/super-admin/product-listing/product-details/${product?.product_id}`)
                        }
                      >
                        <td className="max-w-[10vw] md:full tracking-wide font-manropeL text-base text-gray-900 px-6 py-6">
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
                          <StatusPill status={product.admin_status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <SuperAdminPagination
                  currentPage={currentPage}
                  totalPages={pendData.total_pages}
                  setCurrentPage={setCurrentPage}
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

export default withAdminAuth(PendingProducts);
