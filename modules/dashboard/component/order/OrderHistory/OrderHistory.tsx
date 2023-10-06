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
            {/* ... Search input and button */}
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
              {/* ... Search input and buttons */}
            </div>
            {/*commented out*/}
          </section>
          <div className="md:hidden flex flex-col gap-4">
            {pageItem.map((item) => (
              <OrderHistoryMobile key={item.id} {...item} />
            ))}
          </div>
          <PaginationBar {...{ changeCurrentPage, currentPage, pageLength }} />
        </section>
      </main>
      {/* Add a footer component */}
      <Footer />
    </>
  );
};

export default OrderHistory;
