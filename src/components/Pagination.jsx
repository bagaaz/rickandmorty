import React from "react";
import ChevronLeft from "../assets/icons/left_chevron_icon.svg";
import ChevronRight from "../assets/icons/right_chevron_icon.svg";

function Pagination({ page, totalPages, onPrevPage, onNextPage }) {
    return (
        <div className="flex items-center justify-center mt-8 space-x-4">
            <button
                onClick={onPrevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-white rounded-md border border-gray-300 transition-colors
                  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
                <img src={ChevronLeft} alt="Anterior" className="w-4 h-4" />
            </button>

            <span className="text-gray-700 font-medium">
                <span className="font-bold">{page}</span> de{" "}
                <span className="text-gray-700">{totalPages || 0}</span>
            </span>

            <button
                onClick={onNextPage}
                disabled={page === totalPages || totalPages === 0}
                className="px-4 py-2 bg-white rounded-md border border-gray-300 transition-colors
                  hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
                <img src={ChevronRight} alt="Próxima" className="w-4 h-4" />
            </button>
        </div>
    );
}

export default Pagination;
