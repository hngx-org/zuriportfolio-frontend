import React from 'react';
import { useState } from 'react';
import { Sort, SearchNormal1 } from 'iconsax-react';
import VendorLists from '@modules/super-admin/components/vendormanagement/VendorLists';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import SuperAdminPagination from '@modules/super-admin/components/pagination';
import Button from '@ui/Button';
import { useGetAllVendor } from '../../../http/super-admin1';
import { LoadingTable } from '@modules/super-admin/components/product-listing/ProductListingTable';
import { withAdminAuth } from '../../../helpers/withAuth';
import { Input } from '@ui/Input';
import Image from 'next/image';
import right from '/public/assets/vendor/arrow-right.svg';
import { useRouter } from 'next/router';

const Index = () => {
  //Variables for the pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState('');

  const { data, isLoading } = useGetAllVendor(currentPage, searchVal, 'banned');
  const router = useRouter();
  return (
    <div className="">
      <SuperAdminNavbar />

      <section className="px-5 md-px-auto ">
        <div className=" container">
          <Image
            src={right}
            alt="back"
            className="  pb-3 cursor-pointer"
            onClick={() => router.push('/super-admin/vendor-management/')}
          ></Image>
        </div>
        <section className="border-white-115 border-2 py-4 rounded-md container mx-auto mb-10">
          <div className=" border-b border-white-115 border-solid py-2 px-3 flex flex-col md:flex-row items-left md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-bold">Banned Vendors</p>
              <p className="text-gray-500 text-sm">List of all banned vendors and their details</p>
            </div>
            <div className="flex items-center justify-left md:justify-between gap-4">
              {/* <SearchProduct handleSearchChange={handleSearch} /> */}
              <Input
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
                leftIcon={<SearchNormal1 />}
                type="text"
                intent={'default'}
                disabled={false}
                className=""
                placeHolder="Search"
              />

              <div className="md:block hidden">{/* <FilterProduct handleFilter={handleFilter} /> */}</div>

              <div className="md:hidden block">
                <Button intent={'primary'} size={'sm'}>
                  <Sort />
                </Button>
              </div>
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
                      {/* <input type="checkbox" name="" id="" /> */}
                      <p className="px-2">Vendor Name</p>
                      {/* <ArrowDown size="16" className="" /> */}
                    </div>
                    <p className="hidden md:block">Total Sales</p>
                    <p className="hidden md:block">Number of Products</p>
                    <p className="hidden md:block">Date Joined</p>
                    <p className="hidden lg:block">Status</p>
                    {/* <p className="hidden lg:block">Action</p> */}
                  </div>

                  <div>
                    {data.data?.map((data: any) => <VendorLists key={data?.id} data={data} vendor_status="banned" />)}
                  </div>
                  <SuperAdminPagination
                    currentPage={currentPage}
                    totalPages={data?.total_pages}
                    setCurrentPage={setCurrentPage}
                  />
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
