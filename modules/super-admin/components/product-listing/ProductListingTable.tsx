import React, { Dispatch, SetStateAction } from 'react';
import { ArrowDown, SearchNormal1, Sort } from 'iconsax-react';
import SuperAdminPagination from '@modules/super-admin/components/pagination';
import { formatDate } from './product-details';
import { useRouter } from 'next/router';
import { Input } from '@ui/Input';
import StatusPill from '../StatusPill';

export const LoadingTable = () => {
  return (
    <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-slate-100 border-t-transparent mx-auto my-20"></div>
  );
};

const ProductListingTable = ({
  data,
  isLoading,
  currentPage,
  setCurrentPage,
  searchVal,
  setSearchVal,
}: {
  data: any;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  searchVal: string;
  setSearchVal: Dispatch<SetStateAction<string>>;
}) => {
  const route = useRouter();

  return (
    <div className="font-manropeL mb-8 container mx-auto border-2 border-custom-color1 mt-4">
      <div className="border-b border-white-115 border-solid py-2 px-3 flex flex-col md:flex-row items-left md:items-center justify-between">
        <div className="mb-4 md:mb-0 py-3">
          <p className="text-lg font-bold">Products Listing</p>
          <p className="text-gray-500 text-sm">List of all Products and their details</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <Input
            onChange={(e) => {
              setCurrentPage(1);
              setSearchVal(e.target.value);
            }}
            leftIcon={<SearchNormal1 />}
            type="text"
            intent={'default'}
            disabled={false}
            className="md:min-w-[350px] w-[100%]"
            placeHolder="search"
          />
          <div>
            <div className="">{/* <FilterProduct handleFilter={handleFilter} /> */}</div>
            {/* <div className="md:hidden block">
              <Button>
                <Sort />
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingTable />
      ) : (
        <div className="mb-4">
          {data?.data?.length > 0 ? (
            <>
              <table className="w-full md:table-fixed">
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
                  {data?.data.map((product: any) => (
                    <tr
                      className="border-t  border-custom-color1 cursor-pointer transition delay-100 hover:bg-white-200 py-4"
                      key={product?.product_id}
                      onClick={() => route.push(`/super-admin/product-listing/product-details/${product?.product_id}`)}
                    >
                      <td className="max-w-[10vw] md:w-full font-manropeL text-base text-gray-900 px-6 py-6">
                        <p>{product?.product_name} </p>
                      </td>
                      <td className=" font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                        <p>{product?.vendor_name} </p>
                      </td>
                      <td className="hidden md:table-cell tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                        <p>#{product?.product_id}</p>
                      </td>
                      <td className="hidden md:table-cell tracking-wide font-manropeL text-base text-gray-900 px-6 py-6 text-center">
                        <p>{formatDate(product?.createdAt)}</p>
                      </td>
                      <td className="tracking-wide font-manropeL text-base text-gray-900 flex items-center py-9 justify-center text-center">
                        <StatusPill status={product?.product_status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <SuperAdminPagination
                currentPage={currentPage}
                totalPages={data?.total_pages}
                setCurrentPage={setCurrentPage}
              />
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
