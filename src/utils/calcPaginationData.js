const calcPaginationData = (total, page, perPage) => {
  const totalPages = Math.ceil(total / perPage);
  const hasNextPage = page != totalPages;
  const hasPreviousPage = page !== 1;
  return {
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};

export default calcPaginationData;