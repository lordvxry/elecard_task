import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCatalog} from "../../redux/actions/catalogActions";
import MainPageCatalog from "../MainPageCatalog/MainPageCatalog";
import "./mainPage.css"
import {connect} from "react-redux";
import Pagination from "../Pagination/Pagination";

const MainPage = (props) => {
    const {catalog, isLoading, getCatalog} = props
    const [currentPage, setCurrentPage] = useState(1)
    const [catalogPerPage] = useState(40)
    const lastCatalogIndex = currentPage * catalogPerPage
    const firstCatalogIndex = lastCatalogIndex - catalogPerPage
    const currentCatalog = catalog.slice(firstCatalogIndex, lastCatalogIndex)

    useEffect(() => {
        getCatalog()
    }, [])

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const [a, b] = useState([])

    const sortByCatalog = (data) => {
        const catalogCopy = catalog.concat()
        const catalogSort = catalogCopy.sort((a, b) => {
                return a[data] > b[data] ? 1 : -1
            }
        )
        return getCatalog(catalogSort)
    }

    return (
        <div className="mainPage-container">
            <div>
                <div>
                    <label>По категории: </label>
                    <input type="radio" name="sort" value="category" onClick={() => {
                        sortByCatalog("category")
                    }}/>
                </div>
                <div>
                    <label>По размеру файла: </label>
                    <input type="radio" name="sort" value="fileSize" onClick={() => {
                        sortByCatalog("filesize")
                    }}/>
                </div>
                <div>
                    <label>По дате: </label>
                    <input type="radio" name="sort" value="date" onClick={() => {
                        sortByCatalog("timestamp")
                    }}/>
                </div>
            </div>
            <div className="mainPage-content">
                {
                    isLoading === false ?
                        (currentCatalog.map(data => {
                            return (<MainPageCatalog key={data.timestamp} catalog={data}/>)
                        }))
                        :
                        (<div className="isLoading"></div>)
                }
            </div>
            <Pagination catalogPerPage={catalogPerPage} totalCatalogCount={catalog.length} paginate={paginate}/>
        </div>
    );
};

export const mapStateToProps = (state) => {
    return {
        catalog: state.catalogReducer.data,
        isLoading: state.catalogReducer.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCatalog: () => dispatch(getCatalog()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);