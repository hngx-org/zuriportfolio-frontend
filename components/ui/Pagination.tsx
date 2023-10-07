import React, { useState } from 'react';
import Button from './Button';
import { twMerge } from 'tailwind-merge';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

interface PaginationProps {
  page: any;
  setPage: (page: number) => void;
  pages: number;
  activePage: any;
  visiblePaginatedBtn: number;
}

function Pagination({ page, pages, activePage, visiblePaginatedBtn, setPage }: PaginationProps) {
  const pageNumbers = [];

  if (visiblePaginatedBtn >= pages) {
    // If visiblePaginatedBtn is greater than or equal to total pages, display all pages
    pageNumbers.push(...Array.from({ length: pages }, (_, i) => i + 1));
  } else {
    // pageNumbers.push(...Array.from({ length: visiblePaginatedBtn }, (_, i) => i + 1));
    const minPage = Math.max(1, activePage - Math.floor(visiblePaginatedBtn / 2));
    const maxPage = Math.min(pages, minPage + visiblePaginatedBtn - 1);
    pageNumbers.push(...Array.from({ length: maxPage - minPage + 1 }, (_, i) => minPage + i));
  }

  // 🆕 handler for the next button
  function handleNext() {
    if (pages > 1) setPage(page + 1);
  }

  // 🆕 handler for the previous button
  function handlePrevious() {
    if (page > 1) setPage(page - 1);
  }

  return (
    <div className="w-fit mt-3 rounded-[20px] p-2 flex items-center justify-center gap-3 text-gray-600 bg-white-200">
      <Button
        onClick={handlePrevious}
        className={twMerge(
          'px-2 py-3 disabled:bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent rounded-md bg-transparent text-dark-100 text-[12px]',
        )}
        disabled={page <= 1}
      >
        <RiArrowLeftSLine size={30} color={twMerge(page <= 1 ? '#ccc' : '#777')} />
      </Button>

      {pageNumbers.map((p, idx) => (
        <Button
          key={idx}
          className={twMerge(
            'w-12 text-[15px] hover:bg-transparent focus:bg-transparent focus-within:bg-transparent active:bg-transparent scale-[.95] px-5 py-2 rounded-[10px]',
            activePage === p
              ? 'bg-brand-green-primary text-white-100 hover:bg-brand-green-primary focus:bg-brand-green-primary active:bg-brand-green-primary'
              : 'bg-transparent text-white-400',
          )}
          onClick={() => {
            if (p !== page) {
              setPage(p);
            }
          }}
        >
          {p}
        </Button>
      ))}
      {pages > 1 && activePage !== pages && (
        <Button
          className={twMerge(
            'w-12 text-[15px] hover:bg-transparent focus:bg-transparent focus-within:bg-transparent active:bg-transparent scale-[.95] px-5 py-2 rounded-[10px]',
            'bg-transparent text-white-400',
          )}
          onClick={() => setPage(pages)}
        >
          ...
        </Button>
      )}

      <Button
        onClick={handleNext}
        className={twMerge(
          'px-2 py-3 disabled:bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent rounded-md bg-transparent text-dark-100 text-[12px]',
        )}
        disabled={pages === 0 || page === pages}
      >
        <RiArrowRightSLine size={30} color={twMerge(pages === 0 || page === pages ? '#ccc' : '#777')} />
      </Button>
    </div>
  );
}

export default Pagination;
