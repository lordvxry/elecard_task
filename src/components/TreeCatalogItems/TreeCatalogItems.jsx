import React, {useState} from 'react';
import {baseUrl} from "../../global/constants";
import {getCurrentDate} from "../../global/functions";

const TreeCatalogItems = (props) => {
    const {item} = props
    const itemId = item.id;
    const [showImage, setShowImage] = useState([]);
    const [showObjects, setShowObjects] = useState([]);

    const onChangeHiddenObjects = (id) => {
        let currentShowObjects;
        if (showObjects.includes(id)) {
            currentShowObjects = showObjects.filter((currentId) => {
                return currentId !== id;
            });
        } else {
            currentShowObjects = [...showObjects, id];
        }
        setShowObjects(currentShowObjects);
    };

    const onChangeImage = (id) => {
        let currentChangeImage;
        if (showImage.includes(id)) {
            currentChangeImage = showImage.filter((currentId) => {
                return currentId !== id;
            });
        } else {
            currentChangeImage = [...showImage, id];
        }
        setShowImage(currentChangeImage);
    };


    return (
        <div className="tree-item">
                              <div
                                  className="tree-tumbler"
                                  onClick={() => {
                                      onChangeHiddenObjects(itemId);
                                  }}
                              >
                                {showObjects.includes(itemId) ? "-" : "+"}{" "}
                                  <span className="tree-itemText">{item.name}</span>
                              </div>
            {showObjects.includes(itemId) && (
                <div className={`tree-content${" items"}`}>
                    <img
                        className={
                            showImage.includes(itemId)
                                ? "tree-fullImg"
                                : "tree-smallImg"
                        }
                        src={`${baseUrl}${item.image}`}
                        onClick={() => onChangeImage(itemId)}
                    />
                    <div className="tree-contentField">
                        <span className="tree-contentText">File size:</span>{" "}
                        {item.filesize}
                    </div>
                    <div className="tree-contentField">
                        <span className="tree-contentText">Date:</span>{" "}
                        {getCurrentDate(item.timestamp)}
                    </div>
                </div>
            )}
        </div>
    );
};


export default TreeCatalogItems;