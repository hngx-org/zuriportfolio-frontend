import React, { useEffect, useState } from 'react';
import PaginationBar from '../PaginationBar';

import { OrderHistoryMobile } from './OrderHistoryRow';
import OrderHistoryTable from './OrderHistoryTable';
import { SearchNormal1 } from 'iconsax-react';
import usePaginate from '../../../../../hooks/usePaginate';
import useOrders from '../../../../../hooks/useOrders';
import Link from 'next/link';
import Filters from '../Filters';
import { OrderHistory } from '../../../../../@types';
import Pagination from '@ui/Pagination';

const orderNavs: {
  id: string;
  title: string;
}[] = [
  {
    id: 'all',
    title: 'All Order',
  },
  {
    id: 'completed',
    title: 'Completed',
  },
  {
    id: 'cancelled',
    title: 'Cancelled',
  },
];
const filters: {
  id: keyof OrderHistory;
  title: string;
}[] = [
  {
    id: 'id',
    title: 'Order iD',
  },
  {
    id: 'productName',
    title: 'Product Name',
  },
  {
    id: 'customerName',
    title: 'Customer Name',
  },
  {
    id: 'date',
    title: 'Date',
  },
];
const OrderHistory: React.FC = () => {
  const { orders, orderFilter, changeFilter, changeSortBy, sortBy, toggleSortOrder, searchQuery, changeSearchQuery } =
    useOrders();

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const closeFilter = () => {
    setShowFilters(false);
  };
  useEffect(() => {}, [currentPage]);
  return (
    <>
      <main className="max-w-[1240px] mx-auto md:px-10 px-4">
        <section className="font-manropeB font-semibold mt-4">
          <div className="text-gray-300 font-manropeB font-medium text-[14px] leading-[142.857%] tracking-[0.014px]  items-center gap-[2px] mb-4 hidden md:flex">
            <Link href={'/dashboard/orders'}>Order manegement</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4.50002 2.03996L7.76002 5.29996C8.14502 5.68496 8.14502 6.31496 7.76002 6.69996L4.50002 9.95996"
                stroke="#8D9290"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Link href={'/dashboard/orders'} className="text-orange-110">
              Order History
            </Link>
          </div>
          <h1 className="text-[2rem] leading-[125%] text-black mb-14 hidden md:block">Order History</h1>
          <div className="justify-between items-center mb-[25px] gap-[35px] flex md:hidden relative">
            <div
              className="focus-within:outline focus-within:outline-black px-[14px] py-[10px] flex gap-2 items-center border border-slate-50 rounded-lg md:hidden flex-1 min-w-0"
              style={{
                boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
              }}
            >
              <SearchNormal1 size="16" color="#667085" />
              <input
                className=" bg-transparent focus-within:outline-none flex-1  text-[1rem] leading-[150%] min-w-0"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => changeSearchQuery(e.target.value, orderFilter)}
              />
            </div>
            <div className="relative">
              <button
                className="px-4 py-[10px] border rounded-lg flex gap-2 border-slate-50 text-[14px] font-manropeL font-medium text-slate-300 items-center leading-[142.857%]"
                style={{
                  boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
                }}
                onClick={() => setShowFilters((prev) => !prev)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                    stroke="#344054"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {showFilters && (
                <Filters
                  filters={filters}
                  changeFilter={changeSortBy}
                  currentFilter={sortBy}
                  closeFilter={closeFilter}
                />
              )}
            </div>
          </div>
          <nav className="flex flex-col md:gap-4 gap-5">
            <ul className="lg:text-[22px] text-[14px]   mx-auto md:mx-0 leading-[127.273%] text-dark-110 flex items-center md:gap-[50px] gap-[16px] justify-between md:justify-start">
              {orderNavs.map((orderNav) => (
                <li
                  key={orderNav.id}
                  className={`${
                    orderNav.id === orderFilter &&
                    'text-brand-green-primary border-b-2 border-b-brand-green-primary capitalize'
                  } cursor-pointer whitespace-nowrap`}
                  onClick={() => {
                    changeFilter(orderNav.id);
                    changeSearchQuery('', orderNav.id);
                  }}
                >
                  {orderNav.title}
                </li>
              ))}
            </ul>
            <Link
              href={'/dashboard/orders/details'}
              className="text-brand-green-primary md:text-[22px] text-[14px] leading-[127.273%] text-end w-fit ml-auto self-end mb-[22px]"
            >
              View Order Details
            </Link>
          </nav>
          <section
            className="rounded-2xl pt-5 hidden md:block"
            style={{
              boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.14)`,
            }}
          >
            <div className="px-8 justify-between items-center gap-[129px] mb-[25px] hidden md:flex">
              <div
                className="focus-within:outline focus-within:outline-black px-[14px] py-[10px] flex gap-2 items-center border border-slate-50 rounded-lg flex-1"
                style={{
                  boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
                }}
              >
                <SearchNormal1 size="16" color="#667085" />
                <input
                  className=" bg-transparent focus-within:outline-none flex-1 text-[1rem] leading-[150%]"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => changeSearchQuery(e.target.value, orderFilter)}
                />
              </div>
              <div className="flex items-center gap-6 relative">
                <button
                  className="px-4 py-[10px] border rounded-lg flex gap-2 border-slate-50 text-[14px] font-manropeL font-medium text-slate-300 items-center leading-[142.857%]"
                  style={{
                    boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
                  }}
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                      stroke="#344054"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Filters</span>
                </button>
                {showFilters && (
                  <Filters
                    filters={filters}
                    changeFilter={changeSortBy}
                    currentFilter={sortBy}
                    closeFilter={closeFilter}
                  />
                )}
              </div>
            </div>
            {orders.length === 0 ? (
              <p className="text-center text-dark-110 font-manropeB text-[24px] leading-[133%] py-[30px] mb-[94px] mt-[70px] ">
                No Order to Show
              </p>
            ) : (
              <OrderHistoryTable
                pageItem={orders}
                changeSort={changeSortBy}
                toggleSort={toggleSortOrder}
                currentSort={sortBy}
              />
            )}
          </section>

          <div className="md:hidden flex flex-col gap-4 mb-4">
            {orders.length > 0 ? (
              orders.map((item) => <OrderHistoryMobile key={item.id} {...item} />)
            ) : (
              <p className="text-center text-dark-110 font-manropeB text-[24px] leading-[133%] py-[30px] mb-[94px] mt-[70px] ">
                No Order to Show
              </p>
            )}
          </div>
        </section>
        <div className="flex justify-center my-6">
          <Pagination
            activePage={currentPage}
            page={currentPage}
            pages={3}
            visiblePaginatedBtn={3}
            setPage={setCurrentPage}
          />
        </div>
      </main>
      {/* Add a footer component */}
    </>
  );
};

export default OrderHistory;
