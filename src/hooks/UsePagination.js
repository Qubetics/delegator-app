/*eslint-disable*/
import React, { useEffect, useState } from 'react';

export const usePagination = (limit) => {
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageParams, setPageParams] = useState({
    offset: 0,
    page: 1,
    limit: limit,
  });

  useEffect(() => {
    if (totalCount / limit < 1) {
      setTotalPages(1);
    } else {
      setTotalPages(Math.ceil(totalCount / limit));
    }
  }, [totalCount]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setPageParams({
      offset: currentPage === 1 ? 0 : (currentPage - 1) * limit,
      page: currentPage,
      limit: limit,
    });
  }, [currentPage, limit, totalCount]);

  return { pageParams, handlePageChange, totalPages, setTotalCount, setCurrentPage };
};
