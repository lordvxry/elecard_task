import React, { useState } from "react";
import "./treeCatalog.css";
import TreeCatalogItems from "../TreeCatalogItems/TreeCatalogItems";

const TreeCatalog = (props) => {
  const { catalog } = props;
  const categories = [...new Set(catalog.map((item) => item.category))];
  const [showItems, setShowItems] = useState(false);
  const [showCategories, setShowCategories] = useState([]);

  const onChangeHiddenItems = () => {
    setShowItems(!showItems);
  };

  const onChangeHiddenCategories = (index) => {
    let currentShowCategories;
    if (showCategories.includes(index)) {
      currentShowCategories = showCategories.filter((currentIndex) => {
        return currentIndex !== index;
      });
    } else {
      currentShowCategories = [...showCategories, index];
    }
    setShowCategories(currentShowCategories);
  };

  return (
    <div className="tree-container">
      <div className="tree-tumbler" onClick={onChangeHiddenItems}>
        {showItems ? "-" : "+"} <span className="tree-header">Categories</span>
      </div>
      <div>
        {showItems &&
          categories.map((category, index) => {
            return (
              <div className="tree-content" key={index}>
                <div
                  onClick={() => onChangeHiddenCategories(index)}
                  className="tree-tumbler"
                >
                  {showCategories.includes(index) ? "-" : "+"} {category}
                </div>
                <div className="tree-content">
                  {showCategories.includes(index) &&
                    catalog
                      .filter((item) => item.category.includes(category))
                      .map((item) => {
                        return <TreeCatalogItems key={item.id} item={item} />;
                      })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TreeCatalog;
