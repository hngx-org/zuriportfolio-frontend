import React from 'react';
import { useState } from 'react';
import { ArrowDown, Sort } from 'iconsax-react';
import VendorsStat from '@modules/super-admin/components/vendormanagement/VendorStat';
import VendorLists from '@modules/super-admin/components/vendormanagement/VendorLists';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import SuperAdminPagination from '@modules/super-admin/components/pagination';
import SearchProduct from '@modules/super-admin/components/vendormanagement/SearchProduct';
import FilterProduct from '@modules/super-admin/components/vendormanagement/FilterProduct';
import Button from '@ui/Button';
const Index = () => {
  const vendorsList = [
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Okereke James',
      email: 'okerekejames@gmail.com',
      amount: '$4,000.00',
      quantity: 3,
      date: '08-01-23',
      statusIndicatorSrc: '/assets/red-dot.png',
      statusText: 'Deleted',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Chukwu Chinaza',
      email: 'chukwuchinaza@gmail.com',
      amount: '$3,520.89',
      quantity: 2,
      date: '08-02-23 ',
      statusIndicatorSrc: '/assets/red-dot.png',
      statusText: 'Deleted',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Mark Essien',
      email: 'markessien@gmail.com',
      amount: '$3,520.89',
      quantity: 1,
      date: '08-03-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Charles Egesionu',
      email: 'charlesegesionu@gmail.com',
      amount: '$3,520.89',
      quantity: 1,
      date: '08-04-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'John Paul',
      email: 'johnpaul@gmail.com',
      amount: '$3,520.89',
      quantity: 2,
      date: '08-05-23 ',
      statusIndicatorSrc: '/assets/yellow-dot.png',
      statusText: 'Banned',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Bakare Femi',
      email: 'bakarefemi@gmail.com',
      amount: '$3,520.89',
      quantity: 3,
      date: '08-06-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Gustavo Silas',
      email: 'gustavosilas@gmail.com',
      amount: '$3,520.89',
      quantity: 3,
      date: '08-07-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Okereke James',
      email: 'okerekejames@gmail.com',
      amount: '$4,000.00',
      quantity: 3,
      date: '08-08-23',
      statusIndicatorSrc: '/assets/red-dot.png',
      statusText: 'Deleted',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Chukwu Chinaza',
      email: 'chukwuchinaza@gmail.com',
      amount: '$3,520.89',
      quantity: 2,
      date: '08-09-23 ',
      statusIndicatorSrc: '/assets/red-dot.png',
      statusText: 'Deleted',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Mark Essien',
      email: 'markessien@gmail.com',
      amount: '$3,520.89',
      quantity: 1,
      date: '08-10-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Charles Egesionu',
      email: 'charlesegesionu@gmail.com',
      amount: '$3,520.89',
      quantity: 1,
      date: '08-11-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'John Paul',
      email: 'johnpaul@gmail.com',
      amount: '$3,520.89',
      quantity: 2,
      date: '08-12-23 ',
      statusIndicatorSrc: '/assets/yellow-dot.png',
      statusText: 'Banned',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Bakare Femi',
      email: 'bakarefemi@gmail.com',
      amount: '$3,520.89',
      quantity: 3,
      date: '08-13-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
    {
      vendorImgSrc: '/assets/vendor.png',
      name: 'Gustavo Silas',
      email: 'gustavosilas@gmail.com',
      amount: '$3,520.89',
      quantity: 3,
      date: '08-14-23 ',
      statusIndicatorSrc: '/assets/green-dot.png',
      statusText: 'Active',
    },
  ];
  //Variables for the pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [showBanned, setShowBanned] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(vendorsList);
  const itemsPerPage = 10; // Number of items to display per page
  //Range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleVendors = filteredProducts.slice(startIndex, endIndex);
  const totalItems = 1000;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const bannedVendors = filteredProducts.filter((vendor) => vendor.statusText === 'Banned');
  const deletedVendors = filteredProducts.filter((vendor) => vendor.statusText === 'Deleted');
  const handleSearch = (searchText: string) => {
    const filteredProduct: Array<{
      vendorImgSrc: string;
      name: string;
      email: string;
      amount: string;
      quantity: number;
      date: string;
      statusIndicatorSrc: string;
      statusText: string;
    }> = vendorsList.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));
    setSearchVal(searchText);
    setFilteredProducts(filteredProduct);
  };
  const handleFilter = (status: string) => {
    let filteredProducts = [...vendorsList];
    if (status === 'oldest') {
      filteredProducts = filteredProducts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (status === 'highest') {
      filteredProducts = filteredProducts.sort((a, b) => b.quantity - a.quantity);
    } else if (status === 'lowest') {
      filteredProducts = filteredProducts.sort((a, b) => a.quantity - b.quantity);
    } else if (status === 'newest') {
      filteredProducts = filteredProducts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }
    setFilteredProducts(filteredProducts);
  };
  return (
    <main>
      <SuperAdminNavbar />
      <VendorsStat
        showBanned={showBanned}
        setShowBanned={setShowBanned}
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
      />
      <section className="border-white-115 border-2 py-4 rounded-md mx-5 md:mx-10 mb-10">
        <div className=" border-b border-white-115 border-solid py-2 px-3 flex flex-col md:flex-row items-left md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold">Vendor Management</p>
            <p className="text-gray-500 text-sm">List of all vendors and their details</p>
          </div>
          <div className="flex items-center justify-left md:justify-between gap-4">
            <SearchProduct handleSearchChange={handleSearch} />
            <div className="md:block hidden">
              <FilterProduct handleFilter={handleFilter} />
            </div>
            <div className="md:hidden block">
              <Button intent={'primary'} size={'sm'}>
                <Sort />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-b border-white-115 border-solid py-5 px-5 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-1 text-gray-500 text-center text-sm overflow-x-auto">
          <div className="flex items-center">
            <input type="checkbox" name="" id="" />
            <p className="px-2">Vendor Name</p>
            <ArrowDown size="16" className="" />
          </div>
          <p className="hidden md:block">Total Sales</p>
          <p className="hidden md:block">Number of Products</p>
          <p className="hidden md:block">Date Joined</p>
          <p className="hidden lg:block">Status</p>
          <p className="hidden lg:block">Action</p>
        </div>
        <div>
          {showBanned
            ? bannedVendors.map((data, index) => <VendorLists key={index} {...data} />)
            : showDeleted
            ? deletedVendors.map((data, index) => <VendorLists key={index} {...data} />)
            : visibleVendors.map((data, index) => <VendorLists key={index} {...data} />)}
        </div>
        <SuperAdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </main>
  );
};
export default Index;
