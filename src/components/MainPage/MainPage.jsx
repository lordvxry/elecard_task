import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatalog } from "../../redux/actions/catalogActions";
import MainPageCatalog from "../MainPageCatalog/MainPageCatalog";
import "./mainPage.css";
import { connect } from "react-redux";
import Pagination from "../Pagination/Pagination";
import CatalogTree from "../CatalogTree/CatalogTree";

const baseSortValue = "id";
const basePageNumber = 1;
const baseClosedCardIds =
  JSON.parse(localStorage.getItem("closedCardIds")) || [];

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

const MainPage = (props) => {
  const { catalog, isLoading, getCatalog } = props;

  const [currentPage, setCurrentPage] = useState(basePageNumber);
  const [currentSortValue, setSortValue] = useState(baseSortValue);
  const [closedCardIds, updateClosedCardIds] = useState(baseClosedCardIds);
  const [catalogPerPage] = useState(40);

  const [classicView, setClassicView] = useState(true);

  const lastCatalogIndex = currentPage * catalogPerPage;
  const firstCatalogIndex = lastCatalogIndex - catalogPerPage;
  const catalogCopy = JSON.parse(JSON.stringify(catalog)).filter(
    (card) => !closedCardIds.includes(card.id)
  );

  catalogCopy.sort((a, b) => {
    return a[currentSortValue] > b[currentSortValue] ? 1 : -1;
  });

  const currentCatalog = catalogCopy.slice(firstCatalogIndex, lastCatalogIndex);

  useEffect(() => {
    getCatalog();
  }, []);

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

  const onChangedView = (value) => {
    value === "classic" ? setClassicView(true) : setClassicView(false);
  };

  return (
    <div className="mainPage-container">
      <div className="mainPage-viewPanel">
        <div className="mainPage-viewPanel-text">Sorting:</div>
        <div>
          <label>Classic view</label>
          <input
            type="radio"
            name="view"
            value="classic"
            onClick={(e) => onChangedView(e.currentTarget.value)}
            defaultChecked
          ></input>
          <label>Tree view</label>
          <input
            type="radio"
            name="view"
            value="tree"
            onClick={(e) => onChangedView(e.currentTarget.value)}
          ></input>
        </div>
      </div>
      <div className="mainPage-btns">
        <div className="mainPage-btns-radio">
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
        <button onClick={() => cleanPageParams()}>AWESOME BUTTON</button>
      </div>
      <div className="mainPage-content">
        {isLoading === false ? (
          classicView ? (
            currentCatalog.map((data) => {
              return (
                <MainPageCatalog
                  key={data.id}
                  catalog={data}
                  onChangeVisibilityCard={onChangeVisibilityCard}
                />
              );
            })
          ) : (
            <CatalogTree catalog={currentCatalog} />
          )
        ) : (
          <div className="isLoading"></div>
        )}
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

export const mapStateToProps = (state) => {
  return {
    catalog: state.catalogReducer.data,
    isLoading: state.catalogReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalog: () => dispatch(getCatalog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
