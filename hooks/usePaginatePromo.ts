import { useCallback, useEffect, useState } from 'react';
import { PromotionHistory } from '../@types';

const usePaginate = (item: PromotionHistory[], limit: number) => {
  const [currentPage, setCurrentPage] = useState(0);
  let newItem = item.slice(currentPage * limit, currentPage * limit + limit) || [];
  //   Returned array of currrent page items
  const [pageItem, setPageItem] = useState(newItem);
  const pageLength = Math.ceil(item.length / limit);

  const changeCurrentPage = (page: number) => {
    if (page > pageLength) return;
    setCurrentPage(page);
  };
  useEffect(() => {
    const getNewPageItems = () => {
      let currentPageItems = item.slice(currentPage * limit, currentPage * limit + limit) || [];
      setPageItem(currentPageItems);
    };
    getNewPageItems();
  }, [currentPage, limit, item]);
  return {
    currentPage,
    changeCurrentPage,
    pageItem,
    pageLength,
  };
};
export default usePaginate;
