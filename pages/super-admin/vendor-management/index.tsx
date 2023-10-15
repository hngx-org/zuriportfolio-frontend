import React, { useEffect } from 'react';
import { useState } from 'react';
import { Sort } from 'iconsax-react';
import VendorsStat from '@modules/super-admin/components/vendormanagement/VendorStat';
import VendorLists from '@modules/super-admin/components/vendormanagement/VendorLists';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import SuperAdminPagination from '@modules/super-admin/components/pagination';
import SearchProduct from '@modules/super-admin/components/vendormanagement/SearchProduct';
import FilterProduct from '@modules/super-admin/components/vendormanagement/FilterProduct';
import Button from '@ui/Button';
import { useGetAllVendor } from '../../../http';
import { LoadingTable } from '@modules/super-admin/components/product-listing/ProductListingTable';
import { formatDate } from '@modules/super-admin/components/product-listing/product-details';
import { DeletedProducts } from '../../../@types';
import { log } from 'console';
const Index = () => {
  const { data, isLoading } = useGetAllVendor();
  //Variables for the pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [showBanned, setShowBanned] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data?.data);
  const itemsPerPage = 10; // Number of items to display per page
  //Range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleVendors = filteredProducts?.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setFilteredProducts(data?.data);
  }, [data]);
  useEffect(() => {
    handleSearch(searchVal);
  }, [searchVal]);
  const bannedVendors = filteredProducts?.filter((vendor: any) => vendor.vendor_status === 'Banned');
  const deletedVendors = filteredProducts?.filter((vendor: any) => vendor?.vendor_status === 'Deleted');
  const handleSearch = (searchText: string) => {
    const filteredProduct: any = data?.data?.filter(
      (product: any) => product?.merchant_name?.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };
  // const handleFilter = (status: string) => {
  //   let filteredProduct = data?.data;
  //   if (status === 'oldest') {
  //     filteredProduct = filteredProduct.sort(
  //       (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  //     );
  //   } else if (status === 'highest') {
  //     filteredProduct = filteredProduct.sort((a: any, b: any) => b.total_products - a.total_products);
  //   } else if (status === 'lowest') {
  //     filteredProduct = filteredProduct.sort((a: any, b: any) => a.total_products - b.total_products);
  //   } else if (status === 'newest') {
  //     filteredProduct = filteredProduct.sort((a: any, b: any) => {
  //       return new Date(formatDate(b.createdAt)).getTime() - new Date(formatDate(a.createdAt)).getTime();
  //     });
  //   } else{
  //     filteredProduct = filteredProduct.sort((a: any, b: any) => {
  //       const statusOrder: { [key: string]: number } = {
  //         Active: 1,
  //         Banned: 2,
  //         Deleted: 3,
  //       };
  //       return statusOrder[a.vendor_status] - statusOrder[b.vendor_status];
  //     });
  //   }
  //   setFilteredProducts(filteredProduct);
  // };

  const totalPages = showDeleted
    ? Math.ceil(deletedVendors.length / itemsPerPage)
    : showBanned
    ? Math.ceil(bannedVendors.length / itemsPerPage)
    : Math.ceil(data?.data?.length / itemsPerPage);

  const handleFilter = (status: string) => {
    if (data?.data) {
      let sortedProducts: any = [...data.data]; // Create a copy of the full dataset

      sortedProducts = sortedProducts.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (status === 'newest') {
          return dateB.getTime() - dateA.getTime(); // Newest to oldest
        } else if (status === 'oldest') {
          return dateA.getTime() - dateB.getTime(); // Oldest to newest
        } else if (status === 'lowest') {
          return a.total_products - b.total_products;
        } else if (status === 'highest') {
          return b.total_products - a.total_products;
        } else {
          const statusOrder: { [key: string]: number } = {
            Active: 1,
            Banned: 2,
            Deleted: 3,
          };
          return statusOrder[a.vendor_status] - statusOrder[b.vendor_status];
        }
      });

      setFilteredProducts(sortedProducts);
    }
  };
  return (
    <div className="">
      <SuperAdminNavbar />

      <section className="px-5 md-px-auto">
        <VendorsStat
          showBanned={showBanned}
          setShowBanned={setShowBanned}
          showDeleted={showDeleted}
          setShowDeleted={setShowDeleted}
          data={data}
          isLoading={isLoading}
        />
        <section className="border-white-115 border-2 py-4 rounded-md container mx-auto">
          <div className=" border-b border-white-115 border-solid py-2 px-3 flex flex-col md:flex-row items-left md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-bold">Vendor Management</p>
              <p className="text-gray-500 text-sm">List of all vendors and their details</p>
            </div>
            <div className="flex items-center justify-left md:justify-between gap-4">
              <SearchProduct handleSearchChange={handleSearch} />
              {showBanned || showDeleted ? (
                <div></div>
              ) : (
                <div className="md:block hidden">
                  <FilterProduct handleFilter={handleFilter} />
                </div>
              )}

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
              {bannedVendors?.length > 0 || deletedVendors?.legnth > 0 || visibleVendors?.length > 0 ? (
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
                    {showBanned
                      ? bannedVendors?.map((data: any) => <VendorLists key={data?.id} data={data} />)
                      : showDeleted
                      ? deletedVendors?.map((data: any) => <VendorLists key={data?.id} data={data} />)
                      : visibleVendors?.map((data: any) => <VendorLists key={data?.id} data={data} />)}
                  </div>
                  {filteredProducts?.length > itemsPerPage && (
                    <SuperAdminPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
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
export default Index;
