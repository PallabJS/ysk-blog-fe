import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Droplist from "../droplist/Droplist";

import "./navbar.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { postApi } from "../../api/post/postapi";

import { utils } from "../../utils";
import Navbarmobile from "./Navbarmobile";
import { appDomain } from "../../settings";

const Navbar = (props) => {
    const { app, categories } = props;
    const [state, setState] = useState({
        searchText: "",
        searchTriggered: false,
        droplist: null,
        showDropList: false,
    });

    const [searchText, setSearchText] = useState("");

    const searchBox = useRef();

    const handleTextInput = async (e) => {
        let value = e.target.value;
        setSearchText(value);
        if (!value) {
            setState({ ...state, droplist: [], showDropList: false });
        } else {
            let posts = await getMatchingPosts(value);
            setState({ ...state, droplist: posts, showDropList: true });
        }
    };
    const checkForEnterKey = (e) => {
        if (e.key === "Enter") {
            searchButtonClick();
        }
    };

    const handleRouting = (path) => {
        // Side effects
        sessionStorage.setItem("currentpage", 1);
        window.location.href = path;
    };

    const searchButtonClick = () => {
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

    // Fetches the matching posts asynchronoulsy
    const getMatchingPosts = async (searchText) => {
        return postApi.getMatchingPosts(searchText).then((res) => {
            if (!res.error) return res.data;
            else return [];
        });
    };

    // Switch focus to searchbox when "/" is pressed
    const switchFocusToSearch = (e) => {
        if (e.key === "/") {
            document.getElementById("search-nav").focus();
        }
        if (e.key == "Escape") {
            document.getElementById("search-nav").blur();
            setState({ ...state, droplist: [], searchText: "" });
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", switchFocusToSearch);
        return () => {
            window.removeEventListener("keyup", switchFocusToSearch);
        };
    }, []);

    return (
        <>
            <header className="head-container">
                {app.isMobile ? <span className="logo">YSK</span> : <span className="logo">You Should Know</span>}
                <div className="search-box-container" ref={searchBox}>
                    <div id="search-nav-label" onClick={searchButtonClick}>
                        <FontAwesomeIcon icon={faSearch} size="lg" spin={state.searchTriggered} />
                    </div>
                    <input
                        id="search-nav"
                        type="text"
                        autoComplete="false"
                        autoSave="false"
                        spellCheck={false}
                        placeholder={"Press '/'"}
                        value={searchText}
                        onChange={handleTextInput}
                        onKeyUp={checkForEnterKey}
                        onFocus={(e) => {
                            e.target.setAttribute("placeholder", "Just give me the 'term' buddy");
                        }}
                        onBlur={(e) => {
                            e.target.setAttribute("placeholder", "Press '/'");
                            setTimeout(() => {
                                setState({ ...setState, droplist: [], showDropList: false });
                            }, 200);
                        }}
                    />
                </div>
                {app.screenSizeMedium ? (
                    <Navbarmobile categories={categories} handleRouting={handleRouting} />
                ) : (
                    <nav className="navbar">
                        <ul className="navlist">
                            <li style={{ width: "80px" }} className="nav-list-item" onClick={() => handleRouting("/")}>
                                <a href={`${appDomain}`}>Home</a>
                            </li>
                            {categories.map((categoryName, index) => {
                                return (
                                    <li
                                        style={{ width: categoryName.length * 15 + "px" }}
                                        key={index}
                                        className="nav-list-item"
                                    >
                                        <a
                                            href={`${appDomain}/${categoryName}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleRouting(`/${categoryName}`);
                                            }}
                                        >
                                            {utils.parseTitle(categoryName)}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                )}
            </header>
            <Droplist
                show={state.showDropList}
                droplist={state.droplist}
                anchorElement={searchBox.current}
                searchText={searchText}
            />
        </>
    );
};

export default Navbar;
