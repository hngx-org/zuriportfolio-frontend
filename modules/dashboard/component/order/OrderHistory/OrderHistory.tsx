import React from 'react';
import PaginationBar from '../PaginationBar';
import Footer from '../../../../../components/Footer';
import { OrderHistoryMobile } from './OrderHistoryRow';
import OrderHistoryTable from './OrderHistoryTable';
import { SearchNormal1 } from 'iconsax-react';
import usePaginate from '../../../../../hooks/usePaginate';
import useOrders from '../../../../../hooks/useOrders';

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

const OrderHistory: React.FC = () => {
  const { orders, orderFilter, changeFilter, changeSortBy, sortBy, toggleSortOrder } = useOrders();

  const { changeCurrentPage, pageItem, currentPage, pageLength } = usePaginate(orders, 5);

  return (
    <>
      <main className="max-w-[1240px] mx-auto px-10">
        <section className="font-manropeB font-semibold mt-4">
          <h1 className="text-[2rem] leading-[125%] text-black mb-14 hidden md:block">Order History</h1>
          <div className="justify-between items-center mb-[25px] gap-[35px] flex md:hidden">
            <div
              className="focus-within:outline focus-within:outline-black px-[14px] py-[10px] flex gap-2 items-center border border-[#D0D5DD] rounded-lg md:hidden flex-1 min-w-0"
              style={{
                boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
              }}
            >
              <SearchNormal1 size="16" color="#667085" />
              <input
                className=" bg-transparent focus-within:outline-none flex-1  text-[1rem] leading-[150%] min-w-0"
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
            </button>
          </div>
          <nav className="flex flex-col md:gap-4 gap-5">
            <ul className="md:text-[22px] text-[14px] w-fit mx-auto md:mx-0 leading-[127.273%] text-[#2E3130] flex items-center md:gap-[50px] gap-[16px] justify-between md:justify-start">
              {orderNavs.map((orderNav) => (
                <li
                  key={orderNav.id}
                  className={`${
                    orderNav.id === orderFilter &&
                    'text-brand-green-primary border-b-2 border-b-brand-green-primary capitalize'
                  } cursor-pointer`}
                  onClick={() => {
                    changeFilter(orderNav.id);
                    changeCurrentPage(0);
                  }}
                >
                  {orderNav.title}
                </li>
              ))}
            </ul>
            <button className="text-brand-green-primary md:text-[22px] text-[14px] leading-[127.273%] text-end w-fit ml-auto self-end mb-[22px]">
              View Order Details
            </button>
          </nav>
          <section
            className="rounded-2xl pt-5 hidden md:block"
            style={{
              boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.14)`,
            }}
          >
            <div className="px-8 justify-between items-center gap-[129px] mb-[25px] hidden md:flex">
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
            {/*commented out*/}
          </section>
          {pageItem.length === 0 ? (
            <p className="text-center text-[#2E3130] font-manropeB text-[24px] leading-[133%] py-[30px] mb-[94px] mt-[70px] ">
              No Order to Show
            </p>
          ) : (
            <OrderHistoryTable
              pageItem={pageItem}
              changeSort={changeSortBy}
              toggleSort={toggleSortOrder}
              currentSort={sortBy}
            />
          )}
          <div className="md:hidden flex flex-col gap-4">
            {pageItem.map((item) => (
              <OrderHistoryMobile key={item.id} {...item} />
            ))}
          </div>
          {pageItem.length > 0 && <PaginationBar {...{ changeCurrentPage, currentPage, pageLength }} />}
        </section>
      </main>
      {/* Add a footer component */}
    </>
  );
};

export default OrderHistory;
