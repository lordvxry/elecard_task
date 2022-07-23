import React from 'react';
import "./mainPageCatalog.css"

const MainPageCatalog = (props) => {
    const {
catalog: {
    id,
    image,
    category,
    filesize,
    timestamp,
},
onChangeVisibilityCard
    } = props;
    const baseUrl = "http://contest.elecard.ru/frontend_data/"

    return (
        <div>
            <button onClick={() => onChangeVisibilityCard(id)}>Close (iks)</button>
            <img className="catalog-image" src={`${baseUrl}${image}`}/>
            <div>{category}</div>
            <div>{filesize}</div>
            <div>{timestamp}</div>
        </div>
    );
};

export default MainPageCatalog;