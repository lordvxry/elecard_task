import React, {useEffect, useState} from "react";
import {getCatalog} from "../../redux/actions/catalogActions";
import "./mainPage.css";
import {connect} from "react-redux";
import TreeCatalog from "../TreeCatalog/TreeCatalog";
import ClassicCatalog from "../ClassicCatalog/ClassicCatalog";

const MainPage = (props) => {
    const {catalog, loading, getCatalog} = props;
    const [isClassicView, setClassicView] = useState(true);
    const catalogCopy = JSON.parse(JSON.stringify(catalog));

    useEffect(() => {
        getCatalog();
    }, []);

    const onChangedView = (value) => {
        value === "classic" ? setClassicView(true) : setClassicView(false);
    };

    return (
        <div className="mainPage-container">
            <div className="mainPage-viewPanel">
                <div className="mainPage-viewPanel-text">{isClassicView ? "Sorting:" : ""}</div>
                <div className="mainPage-viewPanel-radio">
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
            <div className="mainPage-content">
                {loading ? (
                    <div className="loading"/>
                ) : (
                    isClassicView ? (
                        <ClassicCatalog catalog={catalog}/>
                    ) : (
                        <TreeCatalog catalog={catalogCopy}/>
                    )
                )}
            </div>
        </div>
    );
};

export const mapStateToProps = (state) => {
    return {
        catalog: state.catalogReducer.data,
        loading: state.catalogReducer.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCatalog: () => dispatch(getCatalog()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
