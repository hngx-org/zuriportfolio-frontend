import React from 'react';
import NavDashBoard from '../modules/dashboard/component/Navbar';
import { SearchNormal1 } from 'iconsax-react';
import OrderHistoryRow, { OrderHistoryMobile } from '../modules/dashboard/component/order/OrderHistoryRow';
import useOrders from '../hooks/useOrders';
import PaginationLeft from '../modules/dashboard/component/order/PaginationLeft';
import PaginationRight from '../modules/dashboard/component/order/PaginationRight';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import usePaginate from '../hooks/usePaginate';
import PaginationBar from '../modules/dashboard/component/order/PaginationBar';
import OrderHistoryTable from '../modules/dashboard/component/order/OrderHistoryTable';

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
  {
    id: 'pending',
    title: 'Pending',
  },
];
const Orders: React.FC = () => {
  const { orders, orderFilter, changeFilter, changeSortBy, sortBy, toggleSortOrder } = useOrders();
  const { changeCurrentPage, pageItem, currentPage, pageLength } = usePaginate(orders, 5);
  return (
    <>
      <NavDashBoard active="orders" />
      <main className="max-w-[1240px] mx-auto px-10">
        <section className="font-manropeB font-semibold">
          <h1 className=" text-[2rem] leading-[125%] text-black mb-14">Order History</h1>
          <nav className=" flex flex-col md:gap-4 gap-5">
            <ul className="md:text-[22px] text-[14px] w-fit mx-auto md:mx-0 leading-[127.273%] text-[#2E3130] flex items-center md:gap-[50px] gap-[10px] ">
              {orderNavs.map((orderNav) => (
                <li
                  key={orderNav.id}
                  className={`${
                    orderNav.id === orderFilter &&
                    'text-brand-green-primary border-b-2 border-b-brand-green-primary capitalize'
                  }`}
                  onClick={() => {
                    changeFilter(orderNav.id);
                    changeCurrentPage(0);
                  }}
                >
                  {orderNav.title}
                </li>
              ))}
            </ul>
            <button className="text-brand-green-primary md:text-[22px] text-[14px] leading-[127.273%] text-end w-fit ml-auto self-end">
              View Order Details
            </button>
          </nav>
          <section
            className="rounded-2xl pt-5"
            style={{
              boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.14)`,
            }}
          >
            <div className="px-8  justify-between items-center gap-[129px] mb-[25px] hidden md:flex">
              <div
                className="focus-within:outline focus-within:outline-black px-[14px] py-[10px] flex gap-2 items-center border border-[#D0D5DD] rounded-lg flex-1"
                style={{
                  boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
                }}
              >
                <SearchNormal1 size="16" color="#667085" />
                <input
                  className=" bg-transparent focus-within:outline-none flex-1 text-[1rem] leading-[150%]"
                  placeholder="Search"
                />
              </div>
              <div className="flex items-center gap-6">
                <button
                  className="px-4 py-[10px] border rounded-lg flex gap-2 border-[#D0D5DD] text-[14px] font-manropeL font-medium text-[#344054] items-center leading-[142.857%]"
                  style={{
                    boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
                  }}
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
                <button
                  className="px-4 py-[10px] border rounded-lg flex gap-2 border-[#D0D5DD] text-[14px] font-manropeL font-medium text-[#344054] items-center leading-[142.857%]"
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
            {pageItem.length === 0 ? (
              <p className="text-center text-[#2E3130] font-manropeB text-[24px] leading-[133%]">No Order to Show</p>
            ) : (
              <OrderHistoryTable
                pageItem={pageItem}
                changeSort={changeSortBy}
                toggleSort={toggleSortOrder}
                currentSort={sortBy}
              />
            )}
          </section>
          <PaginationBar {...{ changeCurrentPage, currentPage, pageLength }} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
