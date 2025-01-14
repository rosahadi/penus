interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalBlogs: number;
  handlePageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalBlogs,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalBlogs / pageSize);

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        className="bg-primary text-white rounded-md py-2 px-4 hover:opacity-90 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-700">
        {totalBlogs === undefined ? (
          <span className="opacity-50">Loading...</span>
        ) : (
          `Page ${currentPage} of ${totalPages}`
        )}
      </span>
      <button
        className="bg-primary text-white rounded-md py-2 px-4 hover:opacity-90 disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
