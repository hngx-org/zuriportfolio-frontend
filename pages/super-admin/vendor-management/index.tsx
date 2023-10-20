import React from 'react';
import { useState } from 'react';
import VendorsStat from '@modules/super-admin/components/vendormanagement/VendorStat';
import VendorLists from '@modules/super-admin/components/vendormanagement/VendorLists';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import SuperAdminPagination from '@modules/super-admin/components/pagination';
import { LoadingTable } from '@modules/super-admin/components/product-listing/ProductListingTable';
import { useGetAllVendor } from '../../../http/super-admin1';
import { withAdminAuth } from '../../../helpers/withAuth';
import { Input } from '@ui/Input';
import { SearchNormal1 } from 'iconsax-react';

const Index = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetAllVendor(page, search);

  return (
    <div className="">
      <SuperAdminNavbar />

      <section className="px-5 md-px-auto">
        <VendorsStat data={data} isLoading={isLoading} />
        <section className="border-white-115 border-2 py-4 rounded-md container mx-auto mb-10">
          <div className=" border-b border-white-115 border-solid py-2 px-3 flex flex-col md:flex-row items-left md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-bold">Vendor Management</p>
              <p className="text-gray-500 text-sm">List of all vendors and their details</p>
            </div>
            <div className="flex items-center justify-left md:justify-between gap-4">
              {/* <SearchProduct handleSearchChange={handleSearch} /> */}
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                leftIcon={<SearchNormal1 />}
                type="text"
                intent={'default'}
                disabled={false}
                className=""
                placeHolder="Search"
              />

              {/* <div className="md:hidden block">
                <Button intent={'primary'} size={'sm'}>
                  <Sort />
                </Button>
              </div> */}
            </div>
          </div>
          {isLoading ? (
            <LoadingTable />
          ) : (
            <>
              {data.data?.length > 0 ? (
                <>
                  <div className="border-b border-white-115 border-solid py-5 px-5 grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 text-gray-500 text-center text-sm overflow-x-auto ">
                    <div className="flex items-center">
                      <p className="px-2">Vendor Name</p>
                    </div>
                    <p className="hidden md:block">Total Sales</p>
                    <p className="hidden md:block">Number of Products</p>
                    <p className="hidden md:block">Date Joined</p>
                    <p className="hidden lg:block">Status</p>
                  </div>
                  <div>{data.data?.map((data: any) => <VendorLists key={data?.id} data={data} />)}</div>
                  <SuperAdminPagination currentPage={page} totalPages={data?.total_pages} setCurrentPage={setPage} />
                </>
              ) : (
                <p className="text-red-100 my-10 w-fit mx-auto">Nothing to show</p>
              )}
            </>
          )}
        </section>
      </section>
    </div>
  );
};
export default withAdminAuth(Index);
