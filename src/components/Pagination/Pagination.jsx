import React from 'react';
import "./pagination.css"

const Pagination = (props) => {
    const {catalogPerPage, totalCatalogCount, paginate} = props
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalCatalogCount / catalogPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            {pageNumbers.map(number => (
                <span className="page" key={number} onClick={() => paginate(number)}>
                    {number}
                </span>
            ))}

        </div>
    );
};

export default Pagination;