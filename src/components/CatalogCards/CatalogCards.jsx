import React, {useState} from "react";
import "./catalogCards.css";
import {baseUrl} from "../../global/constants";
import {getCurrentDate} from "../../global/functions";

const CatalogCards = (props) => {
    const {
        catalog: {
            id,
            image,
            category,
            filesize,
            timestamp
        },
        onChangeVisibilityCard,
    } = props;

    const [isClosed, closeCard] = useState(false);

    const handleCloseElem = () => {
        closeCard(true);

        setTimeout(() => {
            onChangeVisibilityCard(id);
        }, 300)
    }

    return (
        <div className={`catalog-content${isClosed ? " closed-content" : ""}`}>
            <button onClick={handleCloseElem}>X</button>
            <img className="catalog-image" src={`${baseUrl}${image}`}/>
            <div>
                <div>
                    <span className="catalog-fields">Category: </span>
                    {category}
                </div>
                <div>
                    <span className="catalog-fields">File size: </span>
                    {filesize}
                </div>
                <div>
                    <span className="catalog-fields">Date: </span>
                    {getCurrentDate(timestamp)}
                </div>
            </div>
        </div>
    );
};

export default CatalogCards;
