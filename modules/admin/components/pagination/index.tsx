import React from 'react';
import { AdminTablePagination } from '../../../../@types';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

const AdminPagination = ({ currentPage, totalPages, onPageChange }: AdminTablePagination) => {
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
            i === currentPage ? 'bg-brand-green-primary text-white' : 'text-[gray-600] hover:bg-[#EBFDF3]'
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
      <button
        onClick={handlePrevClick}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1 ? 'bg-white text-gray-100 cursor-not-allowed' : 'text-black hover:bg-[#EBFDF3]'
        } hidden md:block`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="flex gap-4">
        <button
          onClick={handlePrevClick}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? 'bg-white text-gray-100 cursor-not-allowed' : 'text-black hover:bg-[#EBFDF3]'
          }`}
          disabled={currentPage === 1}
        >
          <ArrowLeft2 size="11" />
        </button>
        <div className="flex space-x-2">{renderPageNumbers()}</div>
        <button
          onClick={handleNextClick}
          className={`px-4 h-8 rounded-md ${
            currentPage === totalPages ? 'bg-white text-gray-100 cursor-not-allowed' : 'text-black hover:bg-[#EBFDF3]'
          }`}
          disabled={currentPage === totalPages}
        >
          <ArrowRight2 size="11" />
        </button>
      </div>
      <button
        onClick={handleNextClick}
        className={`px-4 h-8 rounded-md ${
          currentPage === totalPages ? 'bg-white text-gray-100 cursor-not-allowed' : 'text-black hover:bg-[#EBFDF3]'
        } hidden md:block`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default AdminPagination;
