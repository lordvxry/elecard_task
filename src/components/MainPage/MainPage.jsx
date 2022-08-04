import React, {useEffect, useState} from "react";
import {getCatalog} from "../../redux/actions/catalogActions";
import "./mainPage.css";
import {connect} from "react-redux";
import TreeCatalog from "../TreeCatalog/TreeCatalog";
import ClassicCatalog from "../ClassicCatalog/ClassicCatalog";
import MainPageViewPanel from "../MainPageVIewPanel/MainPageVIewPanel";
import {baseClosedCardIds} from "../../global/constants";

const MainPage = (props) => {
    const {catalog, loading, getCatalog} = props;
    const [isClassicView, setClassicView] = useState(true);
    const catalogCopy = JSON.parse(JSON.stringify(catalog));
    const [closedCardIds, updateClosedCardIds] = useState(baseClosedCardIds);

    useEffect(() => {
        getCatalog();
    }, []);

    const onChangedView = (value) => {
        value === "classic" ? setClassicView(true) : setClassicView(false);
    };

    return (
        <div className="mainPage-container">
            <MainPageViewPanel
                isClassicView={isClassicView}
                onChangedView={onChangedView}
            />
            <div className="mainPage-content">
                {loading ? (
                    <div className="loading"/>
                ) : isClassicView ? (
                    <ClassicCatalog catalog={catalog} closedCardIds={closedCardIds}
                                    updateClosedCardIds={updateClosedCardIds}/>
                ) : (
                    <TreeCatalog catalog={catalogCopy}/>
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
