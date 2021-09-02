import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/fontawesome-svg-core/";

import "./navbar.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [state, setState] = useState({
        searchText: "",
        searchTriggered: false,
    });

    const handleTextInput = (e) => {
        let value = e.target.value;
        setState({ ...state, searchText: value });
    };
    const checkForEnterKey = (e) => {
        if (e.key === "Enter") {
            searchButtonClick();
        }
    };

    const searchButtonClick = () => {
        console.log(state);
        if (!state.searchText) {
            // Take the focus to the search box
            document.getElementById("search-nav").focus();
            return;
        }
        let search = document.getElementById("search-nav-label");
        search.style.fontSize = "0.8rem";
        search.style.color = "red";
        setState({ ...state, searchTriggered: true });
    };
    return (
        <header className="head-container">
            <span className="logo">You Should Know</span>
            <div className="search-box-container">
                <div id="search-nav-label" onClick={searchButtonClick}>
                    <FontAwesomeIcon icon={faSearch} size="lg" spin={state.searchTriggered} />
                </div>
                <input
                    id="search-nav"
                    type="text"
                    spellCheck={false}
                    placeholder={"Search 'what' you should know"}
                    value={state.searchText}
                    onChange={handleTextInput}
                    onKeyUp={checkForEnterKey}
                />
            </div>
            <nav className="nav-bar">
                <ul className="nav-list">
                    <li className="nav-list-item" onClick={() => (window.location.href = "/science")}>
                        Science
                    </li>
                    <li className="nav-list-item" onClick={() => (window.location.href = "/tech")}>
                        Technology
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
