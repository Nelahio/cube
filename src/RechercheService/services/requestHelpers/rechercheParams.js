exports.rechercheParams = (req) => {
  const query = req.query;
  return {
    searchTerm: query.searchTerm || "",
    category: query.category || "",
    state: query.state || "",
    pageNumber: parseInt(query.pageNumber, 10) || 1,
    pageSize: parseInt(query.pageSize, 10) || 4,
    seller: query.seller || "",
    winner: query.winner || "",
    orderBy: query.orderBy || "",
    filterBy: query.filterBy || "",
  };
};
