import React from 'react';
import NavDashBoard from '../modules/dashboard/component/Navbar';
import { SearchNormal1 } from 'iconsax-react';
import OrderHistoryRow from '../modules/dashboard/component/order/OrderHistoryRow';
import useOrders from '../hooks/useOrders';
import PaginationLeft from '../modules/dashboard/component/order/PaginationLeft';
import PaginationRight from '../modules/dashboard/component/order/PaginationRight';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import usePaginate from '../hooks/usePaginate';
import PaginationBar from '../modules/dashboard/component/order/PaginationBar';

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
const Orders: React.FC = () => {
  const { orders, orderFilter, changeFilter } = useOrders();
  const { changeCurrentPage, pageItem, currentPage, pageLength } = usePaginate(orders, 3);
  return (
    <div>
      <NavDashBoard active="orders" />
      <main className="max-w-[1240px] mx-auto px-10">
        <section className="font-manropeB font-semibold">
          <h1 className=" text-[2rem] leading-[125%] text-black mb-14">Order History</h1>
          <nav className=" flex flex-col gap-4">
            <ul className="text-[22px] leading-[127.273%] text-[#2E3130] flex items-center gap-[50px]">
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
            <button className="text-brand-green-primary text-[22px] leading-[127.273%] text-end w-fit ml-auto self-end">
              View Order Details
            </button>
          </nav>
          <section
            className="rounded-2xl pt-5"
            style={{
              boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.14)`,
            }}
          >
            <div className="px-8 flex justify-between items-center gap-[129px] mb-[25px]">
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
            </div>
            <table className="w-full mb-10">
              <thead className="border border-[#EAECF0] font-manropeL font-medium text-[#667085] bg-[#F9FAFB] [&>*]:px-6 [&>*]:py-3 ">
                <th className="text-center">Order iD</th>
                <th className="text-start">Product Name</th>
                <th className="text-start">Customer Name</th>
                <th className="text-start">Date</th>
                <th className="text-center">Status</th>
              </thead>
              <tbody>
                {pageItem.map((order) => (
                  <OrderHistoryRow key={order.id} {...order} />
                ))}
              </tbody>
            </table>
            <PaginationBar {...{ changeCurrentPage, currentPage, pageLength }} />
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
