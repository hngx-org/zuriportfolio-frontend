import React, { useEffect } from 'react';
import PaginationLeft from './PaginationLeft';
import PaginationRight from './PaginationRight';
import { Inter } from 'next/font/google';
const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
});
const PaginationBar = ({
  pageLength,
  currentPage,
  changeCurrentPage,
}: {
  pageLength: number;
  currentPage: number;
  changeCurrentPage: (a: number) => void;
}) => {
  const items = Array.from({ length: pageLength }, (_, i) => i + 1);
  const decreasePage = () => {
    changeCurrentPage(currentPage - 1);
  };
  const increasePage = () => {
    changeCurrentPage(currentPage + 1);
  };
  return (
    <nav className="w-fit mx-auto flex items-center gap-4 p-2 rounded-[15px] mb-16 bg-custom-color26">
      <div>{pageLength > 1 && <PaginationLeft active={currentPage > 0} OnClick={decreasePage} />}</div>
      <ul className={`${inter.className} flex text-custom-color27 `}>
        {items.map((paginate) => (
          <li
            key={paginate}
            className={`${
              paginate === currentPage + 1 ? 'bg-brand-green-primary text-white-100' : 'bg-transparent'
            } px-[14px] py-2 rounded-lg flex place-items-center cursor-pointer`}
            onClick={() => {
              changeCurrentPage(paginate - 1);
            }}
          >
            {paginate}
          </li>
        ))}
      </ul>
      <div>{pageLength > 1 && <PaginationRight active={currentPage + 1 !== pageLength} OnClick={increasePage} />}</div>
    </nav>
  );
};

export default PaginationBar;
