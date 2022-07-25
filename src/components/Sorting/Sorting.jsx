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

const Sorting = ({sortByCatalog}) => {
    return (
        <div className="radio-btns">
            {radioButtons.map((button, index) => {
                return (
                    <div key={index}>
                        <label>{button.title}</label>
                        <input
                            type="radio"
                            name="sort"
                            value={button.value}
                            onClick={() => {
                                sortByCatalog(button.value);
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};
export default Sorting;