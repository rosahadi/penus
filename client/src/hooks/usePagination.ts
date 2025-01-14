import { useState, useEffect } from 'react';

function usePagination(initialPage = 1, initialPageSize = 10) {
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = sessionStorage.getItem('blogCurrentPage');
    return storedPage ? parseInt(storedPage, 10) : initialPage;
  });

  const [pageSize, setPageSize] = useState(() => {
    const storedPageSize = sessionStorage.getItem('blogPageSize');
    return storedPageSize ? parseInt(storedPageSize, 10) : initialPageSize;
  });

  useEffect(() => {
    sessionStorage.setItem('blogCurrentPage', currentPage.toString());
    sessionStorage.setItem('blogPageSize', pageSize.toString());
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize, 10);
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
}

export default usePagination;
