import React from 'react';
import Button from './Button';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

interface PaginationProps {
  page: number;
  pages: number;
  activePage: number;
  visiblePaginatedBtn: number;
  setPage: (page: number) => void;
}

function Pagination({ page, pages, activePage, visiblePaginatedBtn, setPage }: PaginationProps) {
  if (pages <= 1) {
    // If there's only one page or no pages, don't render pagination.
    return null;
  }

  const pageNumbers = [];
  const maxVisiblePage = Math.min(pages, visiblePaginatedBtn);

  const startPage = Math.max(1, Math.min(activePage - Math.floor(maxVisiblePage / 2), pages - maxVisiblePage + 1));

  for (let i = startPage; i < startPage + maxVisiblePage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-fit mt-3 rounded-[20px] p-1 flex items-center justify-center gap-3 text-gray-600 bg-white-200">
      <Button
        onClick={() => setPage(Math.max(1, page - 1))}
        className={`px-2 py-1 disabled:bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent rounded-md bg-transparent text-dark-100 text-[12px] ${
          page <= 1 ? 'text-gray-400' : ''
        }`}
        disabled={page <= 1}
      >
        <RiArrowLeftSLine size={30} color={page <= 1 ? '#ccc' : '#777'} />
      </Button>

      {pageNumbers.map((p, idx) => (
        <Button
          key={idx}
          className={`w-12 text-[15px] hover:bg-transparent focus-bg-transparent focus-within-bg-transparent active-bg-transparent scale-[.95] px-5 py-1 rounded-[10px] ${
            activePage === p
              ? 'bg-brand-green-primary text-white-100 hover-bg-brand-green-primary focus-bg-brand-green-primary active-bg-brand-green-primary'
              : 'bg-transparent text-white-400'
          }`}
          onClick={() => setPage(p)}
        >
          {p}
        </Button>
      ))}
      {pages > 5 && activePage !== pages && (
        <Button
          className={twMerge(
            'w-12 text-[15px] hover:bg-transparent focus:bg-transparent focus-within:bg-transparent active:bg-transparent scale-[.95] px-5 py-1 rounded-[10px]',
            'bg-transparent text-white-400',
          )}
          onClick={() => setPage(pages)}
        >
          ...
        </Button>
      )}

      <Button
        onClick={() => setPage(Math.min(pages, page + 1))}
        className={`px-2 py-1 disabled:bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent rounded-md bg-transparent text-dark-100 text-[12px] ${
          page === pages ? 'text-gray-400' : ''
        }`}
        disabled={page === pages}
      >
        <RiArrowRightSLine size={30} color={page === pages ? '#ccc' : '#777'} />
      </Button>
    </div>
  );
}

export default Pagination;
