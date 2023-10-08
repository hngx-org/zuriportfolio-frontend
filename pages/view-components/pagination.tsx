import Pagination from '@ui/Pagination';
import React from 'react';

const Paginated = () => {
  // state
  const [page, setPage] = React.useState(1);
  const pagesLength = 10;
  const visiblePaginatedBtn = 5;
  const activePage = page;

  // do something when the page changes
  React.useEffect(() => {
    // go get another page of results
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Pagination</h1>
      <Pagination
        visiblePaginatedBtn={visiblePaginatedBtn}
        activePage={activePage}
        pages={pagesLength}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Paginated;
