import React from 'react';
import "./mainPageCatalog.css"

const MainPageCatalog = (props) => {
    const catalog = props.catalog

    return (
        <div>
            <img className="catalog-image" src={`http://contest.elecard.ru/frontend_data/${catalog.image}`}/>
            <div>{catalog.category}</div>
            <div>{catalog.filesize}</div>
            <div>{catalog.timestamp}</div>
        </div>
    );
};

export default MainPageCatalog;