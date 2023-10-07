import React from 'react';
import { AdminTablePagination, PaginationBtn } from '../../../../@types';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

const PaginationBtn = ({ handleClick, disabledFn, title }: PaginationBtn) => {
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md ${
        disabledFn ? 'bg-white text-gray-100 cursor-not-allowed' : 'text-black hover:bg-white-140'
      } hidden md:block`}
      disabled={disabledFn}
    >
      {title}
    </button>
  );
};

const SuperAdminPagination = ({ currentPage, totalPages, onPageChange }: AdminTablePagination) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-9 h-8 rounded-md ${
            i === currentPage ? 'bg-brand-green-primary text-white' : 'text-[gray-600] hover:bg-white-140'
          }`}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-4 text-sm font-manrope">
      <PaginationBtn handleClick={handlePrevClick} disabledFn={currentPage === 1} title="Previous" />
      <div className="flex gap-4">
        <PaginationBtn handleClick={handlePrevClick} disabledFn={currentPage === 1} title={<ArrowLeft2 size="11" />} />
        <div className="flex space-x-2">{renderPageNumbers()}</div>
        <PaginationBtn
          handleClick={handleNextClick}
          disabledFn={currentPage === totalPages}
          title={<ArrowRight2 size="11" />}
        />
      </div>
      <PaginationBtn handleClick={handleNextClick} disabledFn={currentPage === totalPages} title="Next" />
    </div>
  );
};

export default SuperAdminPagination;
