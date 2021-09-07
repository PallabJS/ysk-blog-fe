import React from "react";

import "./breadcrumb.scss";

const Breadcrumb = (props) => {
    const { home, dirs } = props;

    const GT = () => {
        return <span style={{ color: "gray" }}>&nbsp;&gt;&nbsp;</span>;
    };

    const handleRouting = (path) => {
        // Side effects
        sessionStorage.setItem("currentpage", 1);
        window.location.href = path;
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
                        <a onClick={() => handleRouting(`/${route}`)}>{dir.toUpperCase()}</a>
                        {/* <a href={`/${route}`}>{dir}</a> */}
                    </span>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
