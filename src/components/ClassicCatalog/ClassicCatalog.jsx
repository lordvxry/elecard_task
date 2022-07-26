import React, { useState } from "react";
import "./classicCatalog.css";
import Sorting from "../Sorting/Sorting";
import CatalogCards from "../CatalogCards/CatalogCards";
import Pagination from "../Pagination/Pagination";
import {
  basePageNumber,
  baseSortValue,
} from "../../global/constants";

const ClassicCatalog = (props) => {
  const { catalog, closedCardIds, updateClosedCardIds } = props
  const [currentPage, setCurrentPage] = useState(basePageNumber);
  const [currentSortValue, setSortValue] = useState(baseSortValue);
  const [catalogPerPage] = useState(40);

  const lastCatalogIndex = currentPage * catalogPerPage;
  const firstCatalogIndex = lastCatalogIndex - catalogPerPage;
  const catalogFilter = JSON.parse(JSON.stringify(catalog)).filter(
    (card) => !closedCardIds.includes(card.id)
  );

  catalogFilter.sort((a, b) => {
    return a[currentSortValue] > b[currentSortValue] ? 1 : -1;
  });

  const currentCatalog = catalogFilter.slice(
    firstCatalogIndex,
    lastCatalogIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortByCatalog = (data) => setSortValue(data);

  const cleanPageParams = () => {
    sortByCatalog(baseSortValue);
    setCurrentPage(basePageNumber);
    updateClosedCardIds([]);
    localStorage.removeItem("closedCardIds");
  };

  const onChangeVisibilityCard = (cardId) => {
    const currentClosedArr = [...closedCardIds, cardId];
    localStorage.setItem("closedCardIds", JSON.stringify(currentClosedArr));
    updateClosedCardIds(currentClosedArr);
  };

  return (
    <div className="classicCatalog-container">
      <div className="classicCatalog-btns">
        <Sorting
          currentSortValue={currentSortValue}
          sortByCatalog={sortByCatalog}
        />
        <button onClick={() => cleanPageParams()}>AWESOME BUTTON</button>
      </div>
      <div className="classicCatalog-content">
        {currentCatalog.map((data) => {
          return (
            <CatalogCards
              key={data.id}
              catalog={data}
              onChangeVisibilityCard={onChangeVisibilityCard}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        catalogPerPage={catalogPerPage}
        totalCatalogCount={catalog.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ClassicCatalog;
