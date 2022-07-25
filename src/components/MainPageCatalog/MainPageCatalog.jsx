import React, { useState } from "react";
import "./mainPageCatalog.css";

const MainPageCatalog = (props) => {
  const {
    catalog: { id, image, category, filesize, timestamp, visibility },
    onChangeVisibilityCard,
  } = props;
  const baseUrl = "http://contest.elecard.ru/frontend_data/";

  const date = new Date(timestamp);
  const formatDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  return (
    <div className="catalog-content">
      <button onClick={() => onChangeVisibilityCard(id)}>X</button>
      <img className="catalog-image" src={`${baseUrl}${image}`} />
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
          {formatDate}
        </div>
      </div>
    </div>
  );
};

export default MainPageCatalog;
