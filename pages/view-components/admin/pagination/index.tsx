import { useState } from 'react';
import AdminPagination from '../../../../modules/admin/components/pagination';

const Pagination = () => {
      // Example data
  const totalItems = 1000;
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />;
};

export default Pagination;
