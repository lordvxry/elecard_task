import React, {useState} from "react";
import "./catalogTree.css";

const CatalogTree = (props) => {
    const {catalog} = props;
    const [showItem, setShowItem] = useState(false);
    const [showImage, setShowImage] = useState(true);
    const [openedObjects, setOpenedObjects] = useState([]);

    const baseUrl = "http://contest.elecard.ru/frontend_data/";

    const handleClick = () => {
        setShowItem(!showItem);
    };

    const handleClickC = (id) => {
        let currentOpenedObjects = [];

        if (openedObjects.includes(id)) {
             currentOpenedObjects = openedObjects.filter(curentId => {return curentId !== id});
        } else {
             currentOpenedObjects = [...openedObjects, id];
        }

        setOpenedObjects(currentOpenedObjects)
    };

    const onChangeImage = () => {
        setShowImage(!showImage);
    };

    const getCurrentDate = (timestamp) => {
        if (!timestamp) return '';

        const date = new Date(timestamp);
        const formatDate = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(date);

        return formatDate;
    }

    return (
        <div className="tree-container">
            <span onClick={handleClick}>Root</span>
            <div className="tree-content">
                {showItem &&
                    catalog.map((item, index) => {
                        const itemId = item.id;

                        return (
                            <div key={itemId}>
                                <span
                                    onClick={() => {
                                        handleClickC(itemId);
                                    }}
                                >
                                   Item № {itemId}
                                </span>
                                
                                {openedObjects.includes(itemId) && (
                                    <div className="tree-content">
                                        <img
                                            className={showImage ? "tree-smallImg" : "tree-fullImg"}
                                            src={`${baseUrl}${item.image}`}
                                            onClick={() => onChangeImage()}
                                        />
                                        <div>
                                            <span className="tree-contentText">Category:</span> {item.category}
                                        </div>
                                        <div>
                                            <span className="tree-contentText">File size:</span> {item.filesize}
                                        </div>
                                        <div>
                                            <span className="tree-contentText">Date:</span> {getCurrentDate(item.timestamp)}
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

export default CatalogTree;
