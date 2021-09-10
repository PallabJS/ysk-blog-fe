import React from "react";

import "./breadcrumb.scss";

const Breadcrumb = (props) => {
    const { home, dirs } = props;

    console.log(dirs);

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
            <span key={0}>
                <GT />
                <a onClick={() => handleRouting(`/${dirs.slice(0, 0).join("/")}`)}>{dirs[0]}</a>
            </span>
            <span key={1}>
                <GT />
                <a onClick={() => handleRouting(`/${dirs.slice(0, 1).join("/")}`)}>{dirs[1].slice(0, 15) + "..."}</a>
            </span>
        </div>
    );
};

export default Breadcrumb;
