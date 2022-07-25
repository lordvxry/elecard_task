import React from 'react';
import "./sorting.css"

const radioButtons = [
    {
        title: "Standard",
        value: "id",
    },
    {
        title: "Category",
        value: "category",
    },
    {
        title: "File size",
        value: "filesize",
    },
    {
        title: "Date",
        value: "timestamp",
    },
];

const Sorting = ({sortByCatalog, currentSortValue}) => {

    return (
        <div className="radio-btns">
            {radioButtons.map(({title, value}, index) => {
                return (
                    <div key={index}>
                        <label>{title}</label>
                        <input
                            type="radio"
                            name="sort"
                            checked={value === currentSortValue}
                            onChange={() => {
                                sortByCatalog(value);
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};
export default Sorting;