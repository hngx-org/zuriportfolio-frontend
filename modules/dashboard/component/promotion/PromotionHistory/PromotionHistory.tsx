import React from 'react';
import PaginationBar from '../PaginationBar';
import { SearchNormal1 } from 'iconsax-react';
import PromotionHistoryTable from './PromotionHistoryTable';
import { PromotionHistoryMobile } from './PromotionHistoryRow';
import Image from 'next/image';
import Link from 'next/link';
import usePaginate from '../../../../../hooks/usePaginatePromo';
import usePromotions from '../../../../../hooks/usePromotions';

const PromotionHistory: React.FC = () => {
  const { promotions, changeSortBy, sortBy, toggleSortOrder } = usePromotions();
  const { changeCurrentPage, pageItem, currentPage, pageLength } = usePaginate(promotions, 8);
  return (
    <>
      <main className="w-[100%] md:w-full mx-auto px-3 md:px-20">
        <section className="font-manropeB font-semibold mt-4">
          <div className="justify-between items-center  mb-[25px] gap-[35px] flex md:hidden">
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
          <section className="rounded-2xl hidden md:block">
            {pageItem.length === 0 ? (
              <main className="max-w-[1240px] p-10 mx-auto flex m-[100px] md:m-[200px] flex-col items-center justify-center">
                <Image src="/assets/images/discount.png" alt="discount" width={100} height={100} />
                <h2 className="text-[28px] font-bold text-center font-manropeB mt-4">
                  You don’t have any promotion running
                </h2>
                <p className="text-[16px] md:text-[24px] font-medium text-center font-manropeB">
                  Create your first promotion on products
                </p>
                <Link
                  href="/promotions/promotions-type"
                  className="text-[16px] dark:text-white-100 font-manropeB bg-[#009254] px-10 py-2 rounded-md mt-8"
                >
                  Create Promotion
                </Link>
              </main>
            ) : (
              <>
                <PromotionHistoryTable
                  pageItem={pageItem}
                  changeSort={changeSortBy}
                  toggleSort={toggleSortOrder}
                  currentSort={sortBy}
                />
                <PaginationBar {...{ changeCurrentPage, currentPage, pageLength }} />
              </>
            )}
          </section>
          <div className="md:hidden flex flex-col gap-4 ">
            {pageItem.map((item) => (
              <PromotionHistoryMobile key={item.type} {...item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default PromotionHistory;
