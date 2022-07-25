import React, {useState} from "react";
import "./catalogTree.css";

const CatalogTree = (props) => {
    const {catalog} = props;
    const [showItem, setShowItem] = useState(false);
    const [showC, setShowC] = useState(false);
    const [showImage, setShowImage] = useState(true);

    const baseUrl = "http://contest.elecard.ru/frontend_data/";

    const handleClick = () => {
        setShowItem(!showItem);
    };

    const handleClickC = (id, itemId) => {
        console.log(itemId);
        if (catalog[itemId].id) {
            setShowC(!showC);
        } else if (!catalog[itemId].id) {
            setShowC(showC);
        }
    };

    const onChangeImage = () => {
        setShowImage(!showImage);
    };

    return (
        <div className="tree-container">
            <span onClick={handleClick}>Root</span>
            <div className="tree-content">
                {showItem &&
                    catalog.map((item, index) => {
                        const date = new Date(item.timestamp);
                        const formatDate = new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }).format(date);

                        return (
                            <div key={item.id}>
                <span
                    onClick={() => {
                        handleClickC(item.id, index);
                    }}
                >
                  Item № {item.id}
                </span>
                                {showC && (
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
                                            <span className="tree-contentText">Date:</span> {formatDate}
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
