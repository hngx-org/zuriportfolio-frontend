import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useOrders from '../../../../../hooks/useOrders';
import OrderDetailsTable from './OrderDetailsTable';
import usePaginate from '../../../../../hooks/usePaginate';
import { SearchNormal1 } from 'iconsax-react';
import PaginationBar from '../PaginationBar';
import { OrderDetailsMobile } from './OrderDetailsRow';
import { OrderHistory } from '../../../../../@types';
import Filters from '../Filters';
import Pagination from '@ui/Pagination';
import { useRouter } from 'next/router';
import Loader from '@ui/Loader';
import axios from 'axios';
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
    id: 'productType',
    title: 'Product Type',
  },
  {
    id: 'price',
    title: 'Price/unit',
  },
  {
    id: 'sales',
    title: 'No. of sales',
  },
  {
    id: 'revenue',
    title: 'Total Revenue',
  },
];
const OrderDetails = () => {
  const {
    orders: pageOrders,
    orderFilter,
    changeFilter,
    changeSortBy,
    sortBy,
    changeSearchQuery,
    fetchOrders,
    getSearchResult,
    insertOrders,
    searchQuery,
    filterFunc,
    sortOrders,
    loading: loadingOrders,
    searching,
  } = useOrders();

  const [currentPage, setCurrentPage] = useState(1);

  const [showFilters, setShowFilters] = useState(false);

  const { push } = useRouter();
  const closeFilter = () => {
    setShowFilters(false);
  };

  const changeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSearchQuery(e.target.value.trim());
    let order;
    if (e.target.value.trim()) {
      order = await getSearchResult(e.target.value.trim());
    } else {
      order = await fetchOrders();
    }
    const sortedOrders = sortOrders(order);
    console.log(sortedOrders);
    insertOrders(sortedOrders);
  };
  useEffect(() => {}, [currentPage]);
  useEffect(() => {
    const changeStatus = async () => {
      changeSearchQuery('');
      const order = await fetchOrders();
      const sortedOrders = sortOrders(order);
      insertOrders(sortedOrders);
    };
    changeStatus();
  }, []);
  return (
    <main className="max-w-[1240px] mx-auto md:px-10 px-6 relative min-h-[400px]">
      {loadingOrders ? (
        <div className="absolute z-50 inset-0 min-h-[300px]">
          <Loader />
        </div>
      ) : (
        <>
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
              <Link href={'/dashboard/orders/details'} className="text-orange-110">
                Order Details
              </Link>
            </div>
            <div className="flex flex-col gap-[60px]">
              <h1 className=" text-[2rem] leading-[125%] text-black mb-14 hidden md:block">Order Details</h1>
              <div className="justify-between items-center mb-[25px] gap-[19px] flex md:hidden">
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
                    onChange={changeInput}
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
              <Link
                href={'/dashboard/orders'}
                className="text-brand-green-primary md:text-[22px] text-[14px] leading-[127.273%] text-end w-fit ml-auto self-end mb-[22px] md:flex items-center gap-2 cursor-pointer hidden "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9.57 5.92982L3.5 11.9998L9.57 18.0698"
                    stroke="#009254"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.4999 12L3.66992 12"
                    stroke="#009254"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Back to Order History</span>
              </Link>
            </div>
          </section>
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
                  onChange={changeInput}
                />
              </div>
              <div className="flex items-center gap-6">
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
                <button
                  className="px-4 py-[10px] border rounded-lg flex gap-2 border-slate-50 text-[14px] font-manropeL font-medium text-slate-300 items-center leading-[142.857%]"
                  style={{
                    boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10.8335 9.16683L17.6668 2.3335"
                      stroke="#464646"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.3335 5.6665V1.6665H14.3335"
                      stroke="#464646"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.1665 1.6665H7.49984C3.33317 1.6665 1.6665 3.33317 1.6665 7.49984V12.4998C1.6665 16.6665 3.33317 18.3332 7.49984 18.3332H12.4998C16.6665 18.3332 18.3332 16.6665 18.3332 12.4998V10.8332"
                      stroke="#464646"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Export</span>
                </button>
              </div>
            </div>
            <div className="relative">
              {!searching ? (
                <>
                  {pageOrders.length === 0 ? (
                    <p className="text-center text-dark-110 font-manropeB text-[24px] leading-[133%] py-[30px] mb-[94px] mt-[70px] ">
                      No Order to Show
                    </p>
                  ) : (
                    <OrderDetailsTable pageItem={pageOrders} changeSort={changeSortBy} currentSort={sortBy} />
                  )}
                </>
              ) : (
                <div className="absolute z-50 inset-0 min-h-[300px]">
                  <Loader />
                </div>
              )}
            </div>
          </section>
          <div className="md:hidden flex flex-col gap-4 mb-4 relative">
            {!searching ? (
              <>
                {pageOrders.length > 0 ? (
                  pageOrders.map((item) => <OrderDetailsMobile key={item.id} {...item} />)
                ) : (
                  <p className="text-center text-dark-110 font-manropeB text-[24px] leading-[133%] py-[30px] mb-[94px] mt-[70px] ">
                    No Order to Show
                  </p>
                )}
              </>
            ) : (
              <div className="absolute z-50 inset-0 min-h-[300px] bg-white-100">
                <Loader />
              </div>
            )}
          </div>
          <div className="flex justify-center my-6">
            <Pagination
              activePage={currentPage}
              page={currentPage}
              pages={3}
              visiblePaginatedBtn={3}
              setPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default OrderDetails;
