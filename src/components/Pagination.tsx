import React from "react";
import "../styles/Pagination.scss";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <nav className="pagination" role="navigation" aria-label="Pagination Navigation">
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                aria-disabled={currentPage === 1}
                aria-label="Previous Page"
            >
                Prev
            </button>

            <span aria-live="polite">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-disabled={currentPage === totalPages}
                aria-label="Next Page"
            >
                Next
            </button>
        </nav>
    );
};

export default Pagination;
