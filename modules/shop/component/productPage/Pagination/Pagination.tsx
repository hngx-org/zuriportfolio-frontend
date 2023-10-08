// components/Pagination.tsx
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React from 'react';
interface PaginationProps {
  currentPage: number;
  totalPageCount: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPageCount, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=" py-10 ">
      <div className="px-2 bg-[#F2F4F5]  py-1 rounded-xl container mx-auto flex justify-between space-x-1 max-w-[13rem]">
        <button
          className={`btn outline-none ${currentPage === 1 ? 'text-gray-300' : ''}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft2 />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`text-sm outline-none ${
              currentPage === number ? 'bg-green-500  text-[#fff]  px-3 py-1 rounded-md' : 'text-gray-400'
            }`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`btn outline-none${currentPage === totalPageCount ? 'text-gray-300' : ''}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPageCount}
        >
          <ArrowRight2 />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
