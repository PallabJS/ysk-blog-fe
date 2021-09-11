import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";

import Pager from "../pager/Pager";

import "./category.scss";

import { postApi } from "../../api/post/postapi";

import { utils } from "../../utils";

let postPerPage = 10;

const Category = (props) => {
    const { className, category } = props;

    const categoryPage = useRef();

    const [state, setState] = useState({
        entireList: [],
        currentPage: sessionStorage.getItem("currentpage") ? parseInt(sessionStorage.getItem("currentpage")) : 1,
        hasNext: true,
        hasPrevious: false,
    });

    const clickHandler = (e) => {
        let action = e.target.value;

        if (action === "next") {
            let remainingPost = state.entireList.length - state.currentPage * postPerPage;
            if (remainingPost <= 0) {
                setState({ ...state, hasNext: false });
                return;
            }
        }
        if (action === "previous") {
            if (state.currentPage === 1) {
                setState({ ...state, hasPrevious: false });
                return;
            }
        }
        let updatedCurrentPage = action === "next" ? parseInt(state.currentPage) + 1 : parseInt(state.currentPage) - 1;

        let remainingPostOnNextPage = state.entireList.length - updatedCurrentPage * postPerPage;

        setState({
            ...state,
            currentPage: updatedCurrentPage,
            hasNext: remainingPostOnNextPage > 0,
            hasPrevious: updatedCurrentPage !== 1,
        });

        sessionStorage.setItem("currentpage", updatedCurrentPage);

        // Scroll the page window to top
        window.scrollTo({ top: 0 });
    };

    const getUpdatedList = (mainList, currentPage, length) => {
        let currentPageIndex = currentPage - 1;
        let tempCurrentLlist = mainList.slice(currentPageIndex * length, currentPageIndex * length + length);
        return tempCurrentLlist;
    };

    const getAllPostAndSetStartList = () => {
        // getting entire list
        postApi.getLatestPosts(category).then((res) => {
            if (!res.error) {
                let dateSortedList = res.data.sort((posta, postb) => {
                    return new Date(postb.date) - new Date(posta.date);
                });
                // page initialization
                setState({
                    ...state,
                    entireList: dateSortedList,
                    hasNext: !(state.currentPage * postPerPage + postPerPage > res.data.length),
                    hasPrevious: !(state.currentPage === 1),
                });
            }
        });
    };

    useEffect(() => {
        getAllPostAndSetStartList();
    }, []);

    return (
        <div className={className} ref={categoryPage}>
            <h3 className="header"> Latest topics on {category} </h3>
            <br />

            <Pager
                currentPage={state.currentPage}
                hasPrevious={state.hasPrevious}
                hasNext={state.hasNext}
                onClick={clickHandler}
            />

            <ul className="main-ul">
                {getUpdatedList(state.entireList, state.currentPage, postPerPage).map((post, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                window.location.href = `/${category}/${post.title}`;
                            }}
                        >
                            <div className="list_wrapper">
                                <div className="img_container">
                                    <img src={post.image} alt="" />
                                </div>
                                <div className="text">
                                    <h3>
                                        {post.title
                                            .replace(/-/g, " ")
                                            .replace(post.title[0], post.title[0].toUpperCase())}{" "}
                                    </h3>
                                    <span className="text_meta">{utils.getTimeDifference(new Date(post.date))}</span>
                                    <p className="text_body">{parse(post.text.slice(0, 150))} ... </p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <Pager
                style={{ position: "absolute", width: "calc(100% - 40px)", bottom: "20px" }}
                currentPage={state.currentPage}
                hasPrevious={state.hasPrevious}
                hasNext={state.hasNext}
                onClick={clickHandler}
            />
        </div>
    );
};

export default Category;
