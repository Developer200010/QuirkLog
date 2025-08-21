export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100 disabled:text-gray-400"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100 disabled:text-gray-400"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
