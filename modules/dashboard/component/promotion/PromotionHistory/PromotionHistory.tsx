import React from 'react';
import PaginationBar from '../PaginationBar';
import { SearchNormal1 } from 'iconsax-react';
import PromotionHistoryTable from './PromotionHistoryTable';
import Image from 'next/image';
import Link from 'next/link';
import usePaginate from '../../../../../hooks/usePaginatePromo';
import usePromotions from '../../../../../hooks/usePromotions';
import Button from '@ui/Button';

const PromotionHistory: React.FC = () => {
  const { promotions, changeSortBy, sortBy, toggleSortOrder } = usePromotions();
  const { changeCurrentPage, pageItem, currentPage, pageLength } = usePaginate(promotions, 8);

  return (
    <>
      <main className="max-w-[1240px] mx-auto md:px-10 px-4">
        <section className="font-manropeB font-semibold mt-4">
          <div className="mb-[25px] gap-[35px] flex justify-end">
            <div className="hidden md:justify-end md:flex  justify-center">
              <Link href="/dashboard/promotions/promotions-type">
                <Button className="flex py-3 px-5 gap-4 rounded-2xl text-white-100 items-center bg-brand-green-primary transition after:transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                      d="M6.5 12H18.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 18V6"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Add New Promotion</span>
                </Button>
              </Link>
            </div>
            <div className="mb-[25px] gap-[35px] flex justify-end md:hidden">
              <button
                className="px-4 py-[10px] border rounded-lg flex gap-2 border-slate-50 text-[14px] font-manropeL font-medium text-slate-300 items-center leading-[142.857%]"
                style={{
                  boxShadow: `0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
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
              <Link href="/dashboard/promotions/promotions-type">
                <button className="px-4 bg-brand-green-primary rounded-full">
                  <span className="text-white-100 text-[24px] font-manropeEL">+</span>
                </button>
              </Link>
            </div>
          </div>
          <section className="rounded-2xl md:block">
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
                  className="text-[16px] dark:text-white-100 font-manropeB bg-brand-green-primary px-10 py-2 rounded-md mt-8"
                >
                  Create Promotion
                </Link>
              </main>
            ) : (
              <div className="table-container border rounded-lg border-slate-50 mb-10 overflow-x-auto">
                <PromotionHistoryTable
                  pageItem={pageItem}
                  changeSort={changeSortBy}
                  toggleSort={toggleSortOrder}
                  currentSort={sortBy}
                />
              </div>
            )}
            <PaginationBar {...{ changeCurrentPage, currentPage, pageLength }} />
          </section>
        </section>
      </main>

      <style jsx>{`
        .table-container {
          overflow-x: auto;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};

export default PromotionHistory;
