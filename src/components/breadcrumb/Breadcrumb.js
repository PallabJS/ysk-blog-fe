import React from "react";
import { appDomain } from "../../settings";

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
            <span key={0}>
                <GT />
                <a
                    href={`${appDomain}/${dirs.slice(0, 1).join("/")}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleRouting(`/${dirs.slice(0, 1).join("/")}`);
                    }}
                >
                    {dirs[0]}
                </a>
            </span>
            <span key={1}>
                <GT />
                <span
                // href={`/${dirs.slice(0, 2).join("/")}`}
                // onClick={(e) => {
                //     e.preventDefault();
                //     handleRouting(`/${dirs.slice(0, 2).join("/")}`);
                // }}
                >
                    {dirs[1].slice(0, 15) + "..."}
                </span>
            </span>
        </div>
    );
};

export default Breadcrumb;
