import React from "react";
import { useSelector } from "react-redux";

import "./pager.scss";

const Pager = (props) => {
    const app = useSelector((state) => state.appState);
    const { className, style, currentPage, hasPrevious, hasNext, onClick } = props;

    const buttonClickHandler = (e, action) => {
        e.target.value = action;
        onClick(e);
    };
    return (
        <div
            className={`pager ${className}`}
            style={
                (app.isMobile && {
                    width: "calc(100% - 1px)",
                    ...style,
                }) || { ...style }
            }
        >
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
