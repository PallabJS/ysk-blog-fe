import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import Helmet from "react-helmet";

import Pager from "../pager/Pager";
import Nodata from "../Nodata";

import "./category.scss";

import { postApi } from "../../api/post/postapi";

import { utils } from "../../utils";
import { appDomain } from "../../settings";

let postPerPage = 10;

const Category = (props) => {
    const { app, className, category } = props;

    const [show, setShow] = useState(false);

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
            console.log(remainingPost);
            if (remainingPost <= 0) {
                setState({ ...state, hasNext: false });
                return false;
            }
        }
        if (action === "previous") {
            if (state.currentPage === 1) {
                setState({ ...state, hasPrevious: false });
                return false;
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

        setTimeout(() => {
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
                    setShow(true);
                }
            });
        }, 1000);
    };

    useEffect(() => {
        getAllPostAndSetStartList();
    }, []);

    return (
        <>
            <Helmet>
                <title>{utils.getPageTitle(category)}</title>
                <link rel="canonical" href={`${appDomain}/${category}`} />
            </Helmet>

            <div className={className} ref={categoryPage}>
                <h3 className="header"> Latest topics on {category} </h3>

                {show ? (
                    <>
                        {state.currentPage.length > 0 ? (
                            <Pager
                                currentPage={state.currentPage}
                                hasPrevious={state.hasPrevious}
                                hasNext={state.hasNext}
                                onClick={clickHandler}
                            />
                        ) : null}

                        {state.entireList.length === 0 && <Nodata text="No post yet" color="black" />}

                        <ul className="main-ul">
                            {getUpdatedList(state.entireList, state.currentPage, postPerPage).map((post, index) => {
                                return (
                                    <li key={index} style={app.isMobile ? { minHeight: "400px" } : {}}>
                                        <div className="list_wrapper">
                                            <div
                                                className="img_container"
                                                style={
                                                    (app.isMobile && {
                                                        width: "100%",
                                                    }) ||
                                                    {}
                                                }
                                            >
                                                <img src={utils.compostImageLink(post.image)} alt={utils.noImageLink} />
                                            </div>
                                            <div className="text">
                                                <h3 className="post_title">
                                                    <a href={`/${category}/${post.title}`}>
                                                        {post.title
                                                            .replace(/-/g, " ")
                                                            .replace(post.title[0], post.title[0].toUpperCase())}
                                                    </a>
                                                </h3>
                                                <span className="text_meta">
                                                    Posted {utils.getTimeDifference(new Date(post.date))} ago
                                                </span>
                                                <p className="text_body">
                                                    {app.isMobile
                                                        ? parse(post.text.slice(0, 100))
                                                        : parse(post.text.slice(0, 150))}
                                                    ...
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        {state.currentPage.length > 0 ? (
                            <Pager
                                style={{ position: "absolute", width: "calc(100% - 40px)", bottom: "20px" }}
                                currentPage={state.currentPage}
                                hasPrevious={state.hasPrevious}
                                hasNext={state.hasNext}
                                onClick={clickHandler}
                            />
                        ) : null}
                    </>
                ) : null}
            </div>
        </>
    );
};

export default Category;
