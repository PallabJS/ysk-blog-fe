import React from "react";

import "./breadcrumb.scss";

const Breadcrumb = (props) => {
    const { home, dirs } = props;

    const GT = () => {
        return <span style={{ color: "gray" }}>&nbsp;&gt;&nbsp;</span>;
    };
    return (
        <div className="breadcrumb">
            <a href="/" className="home">
                {home}
            </a>
            {dirs.map((dir, index) => {
                let route = dirs.slice(0, index + 1).join("/");
                return (
                    <span key={index}>
                        <GT />
                        <a href={`/${route}`}>{dir}</a>
                    </span>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
