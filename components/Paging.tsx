import React, { useState } from 'react';
import Pagination from 'react-js-pagination';

interface PagingProps{
    page: number;
    count: number;
    setPage:
}

const Paging = ({page,count,setPage}:) => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
};
export default Paging;
