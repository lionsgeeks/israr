import React from 'react';

const Filters = ({ onFilterChange, onFilters }) => {
    return (
        <>
            <div className="bg-light shadow-sm sticky top-0 z-20 border-b border-light_gray">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center">
                        <span className="text-sm font-medium text-alpha mr-2 hidden sm:inline">
                            Filtrer par :
                        </span>
                        {onFilters.map((f) => (
                            <button
                                key={f}
                                onClick={() => onFilterChange(f)}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${onFilters === f
                                    ? "bg-alpha text-light shadow-lg transform scale-105"
                                    : "bg-light text-alpha border-2 border-light_gray hover:border-beta hover:text-beta hover:shadow-md"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Filters;