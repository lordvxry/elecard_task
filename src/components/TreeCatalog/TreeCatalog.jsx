import React, {useState} from "react";
import "./treeCatalog.css";
import {baseUrl} from "../../global/constants";
import {getCurrentDate} from "../../global/functions";

const TreeCatalog = (props) => {
    const {catalog} = props;
    const [showItems, setShowItems] = useState(false);
    const [showImage, setShowImage] = useState([]);
    const [showObjects, setShowObjects] = useState([]);

    const onChangeHiddenItems = () => {
        setShowItems(!showItems);
    };

    const onChangeHiddenObjects = (id) => {
        let currentShowObjects;
        if (showObjects.includes(id)) {
            currentShowObjects = showObjects.filter(currentId => {
                return currentId !== id
            });
        } else {
            currentShowObjects = [...showObjects, id];
        }
        setShowObjects(currentShowObjects)
    };

    const onChangeImage = (id) => {
        let currentChangeImage;
        if (showImage.includes(id)) {
            currentChangeImage = showImage.filter(currentId => {
                return currentId !== id
            });
        } else {
            currentChangeImage = [...showImage, id];
        }
        setShowImage(currentChangeImage)
    };

    return (
        <div className="tree-container">
            <span className="tree-tumbler" onClick={onChangeHiddenItems}>{showItems ? "-" : "+"} <span
                className="tree-header">Root</span></span>
            <div className="tree-content">
                {showItems &&
                    catalog.map((item) => {
                        const itemId = item.id;
                        return (
                            <div key={itemId} className="tree-item">
                                <span className="tree-tumbler" onClick={() => {
                                    onChangeHiddenObjects(itemId)
                                }}>{showObjects.includes(itemId) ? "-" : "+"} <span
                                    className="tree-itemText"
                                >
                                   Item № {itemId}
                                </span></span>
                                {showObjects.includes(itemId) && (
                                    <div className="tree-content">
                                        <img
                                            className={showImage.includes(itemId) ? "tree-fullImg" : "tree-smallImg"}
                                            src={`${baseUrl}${item.image}`}
                                            onClick={() => onChangeImage(itemId)}
                                        />
                                        <div className="tree-contentField">
                                            <span className="tree-contentText">Category:</span> {item.category}
                                        </div>
                                        <div className="tree-contentField">
                                            <span className="tree-contentText">File size:</span> {item.filesize}
                                        </div>
                                        <div className="tree-contentField">
                                            <span
                                                className="tree-contentText">Date:</span> {getCurrentDate(item.timestamp)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default TreeCatalog;
