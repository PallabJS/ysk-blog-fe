import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";

import Postpage from "../postpage/Postpage";
import Sidecontent from "../../components/Sidecontent/Sidecontent";
import Recommendation from "../../components/recommendation/Recommendation";
import Page404 from "../Page404";

import { postApi } from "../../api/post/postapi";

import "./basepage.scss";
import Category from "../../components/category/Category";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";

let path = window.location.pathname;
let [category, postTitle] = path.slice(1).split("/");

const Basepage = (props) => {
    const { app, categories, admin } = props;

    const [postInfo] = useState({
        isPostPage: Boolean(postTitle),
        category: category,
        title: postTitle,
    });
    const [post, setPost] = useState({
        show: false,
        valid: false,
    });

    const getPostData = async () => {
        // Call get request to the getPost api
        try {
            let res = await postApi.getPost(postInfo.category, postInfo.title);
            if (!res.error) {
                setPost({ ...res.data, show: true, valid: true });
            } else {
                setPost({ valid: false, show: true });
            }
        } catch (e) {}
    };

    useEffect(() => {
        getPostData();
    }, []);

    return (
        <React.Fragment>
            <Navbar app={app} categories={categories} />
            <main className="basepage_container">
                {!postInfo.isPostPage ? (
                    <div className="main_flexbox">
                        <Category
                            app={app}
                            className="category_page"
                            category={postInfo.category}
                        />
                        <Recommendation
                            admin={admin}
                            className="post_recommandation_category_page"
                            category={postInfo.category}
                            isPostPage={postInfo.isPostPage}
                        />
                    </div>
                ) : null}
                <div className="main_flexbox">
                    {postInfo.isPostPage ? (
                        <div className="post_page_body">
                            {!post.show && <Loader className="post_container" />}
                            {post.show && post.valid ? (
                                <>
                                    <Postpage className="post_container" post={post} />
                                    <Sidecontent
                                        admin={admin}
                                        className="sidecontent_container"
                                        currentPostCategory={postInfo.category}
                                        currentPostTitle={postInfo.title}
                                        countToDisplay={10}
                                    />
                                </>
                            ) : post.show && !post.valid ? (
                                <Page404 />
                            ) : null}
                        </div>
                    ) : null}
                </div>
                {postInfo.isPostPage ? (
                    <Recommendation
                        admin={admin}
                        className="post_recommandation"
                        category={postInfo.category}
                        isPostPage={postInfo.isPostPage}
                    />
                ) : null}
            </main>
            <Footer app={app} />
        </React.Fragment>
    );
};

export default Basepage;
