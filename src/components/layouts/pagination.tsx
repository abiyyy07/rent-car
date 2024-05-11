type PaginationProps = {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage}) => {
    return (
        <div className="flex justify-center items-center mt-4 space-x-4 mb-4">
            <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500"
            >
            Previous
            </button>
            <span>
            Page {currentPage} of {totalPages}
            </span>
            <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500"
            >
            Next
            </button>
        </div>
    )
}

export default Pagination;