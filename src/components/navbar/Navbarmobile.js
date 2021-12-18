import { faBars, faBox, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import Version from "../version/Version";
import { utils } from "../../utils";

import "./navbarmobile.scss";

const Navbarmobile = (props) => {
    const { categories, handleRouting } = props;

    const [navbar, setNavbar] = useState({
        expanded: false,
    });

    // Screen click handler
    const clickEvent = (e) => {
        if (e.currentTarget.id === "navbar_mobile_expander") {
            document.body.style.overflowY = navbar.expanded ? "unset" : "hidden";
            setNavbar({ ...navbar, expanded: !navbar.expanded });
        } else if (e.currentTarget.id === "accessibility_toggler") {
            // Do nothing for clicks on accessibility_toggler button
        } else if (e.currentTarget.id === "accessibility_box") {
            // Do nothing for clicks on accesibility box
        } else {
            setNavbar({ ...navbar, expanded: false });
            document.body.style.overflowY = "unset";
        }
        e.stopPropagation();
    };

    useEffect(() => {
        window.addEventListener("click", clickEvent);

        return () => {
            window.removeEventListener("click", clickEvent);
        };
    }, []);

    return (
        <nav className="navbar_mobile">
            <div id="navbar_mobile_expander" onClick={clickEvent}>
                {navbar.expanded ? (
                    <FontAwesomeIcon icon={faBoxOpen} size="2x" style={{ fontSize: "33px" }} />
                ) : (
                    <FontAwesomeIcon icon={faBox} size="2x" style={{ fontSize: "33px" }} />
                )}
            </div>

            <ul
                className="navbar_mobile_list"
                style={navbar.expanded ? { opacity: 1, marginRight: "0px" } : {}}
            >
                <li className="navbar_mobile_list_item" onClick={() => handleRouting("/")}>
                    Home
                </li>

                <li className="section_item">
                    <label>Categories</label>
                </li>

                {categories.map((categoryName, index) => {
                    return (
                        <li
                            key={index}
                            className="navbar_mobile_list_item"
                            onClick={() => handleRouting(`/${categoryName}`)}
                        >
                            {utils.parseTitle(categoryName)}
                        </li>
                    );
                })}
                <li>
                    <Version />
                </li>
            </ul>
        </nav>
    );
};

export default Navbarmobile;
