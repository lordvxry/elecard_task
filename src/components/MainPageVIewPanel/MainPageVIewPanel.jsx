import React from "react";
import "./mainPageViewPanel.css";

const MainPageViewPanel = (props) => {
  const { isClassicView, onChangedView } = props;

  return (
    <div className="mainPage-viewPanel">
      <div className="mainPage-viewPanel-text">
        {isClassicView ? "Sorting:" : ""}
      </div>
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
  );
};

export default MainPageViewPanel;
