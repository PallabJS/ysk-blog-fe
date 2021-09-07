import React from "react";

import "./pager.scss";

const Pager = (props) => {
    const { className, style, currentPage, hasPrevious, hasNext, onClick } = props;

    const buttonClickHandler = (e, action) => {
        e.target.value = action;
        onClick(e);
    };
    return (
        <div className={`pager ${className}`} style={style}>
            <button
                className="previous_button"
                onClick={(e) => buttonClickHandler(e, "next")}
                style={hasNext ? {} : { backgroundColor: "gray" }}
            >
                Next
            </button>
            <div className="current_page">{currentPage}</div>
            <button
                className="next_button"
                onClick={(e) => buttonClickHandler(e, "previous")}
                style={hasPrevious ? {} : { backgroundColor: "gray" }}
            >
                Previous
            </button>
        </div>
    );
};

export default Pager;
