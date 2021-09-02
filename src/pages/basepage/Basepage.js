import React, { useEffect, useState } from "react";

import Postpage from "../postpage/Postpage";
import Page404 from "../Page404";
import Sidecontent from "../../components/Sidecontent/Sidecontent";

import { postApi } from "../../api/post/postapi";

import "./basepage.scss";

let path = window.location.pathname;
let [category, postTitle] = path.slice(1).split("/");

const Basepage = () => {
    const [postInfo, setPostInfo] = useState({
        isPostPage: Boolean(postTitle),
        category: category,
        title: postTitle,
    });

    const [post, setPost] = useState({
        show: false,
        valid: true,
    });

    const getPostData = async () => {
        // Call get request to the getPost api
        try {
            let res = await postApi.getPost(postInfo.category, postInfo.title);
            if (!res.error) {
                setPost({ ...res.data, show: true, valid: true });
            } else {
                setPost({ ...post, valid: false, show: true });
            }
        } catch (e) {}
    };

    useEffect(() => {
        getPostData();
    }, []);

    return (
        <React.Fragment>
            <main className="basepage_container">
                {postInfo.isPostPage ? (
                    <>
                        {post.show && post.valid ? (
                            <>
                                <Postpage className="post_container" post={post} />
                                <Sidecontent className="sidecontent_container" />
                            </>
                        ) : post.show && !post.valid ? (
                            <Page404 />
                        ) : null}
                    </>
                ) : (
                    <>
                        <div>THIS IS CATEGORY PAGE</div>
                    </>
                )}
            </main>
        </React.Fragment>
    );
};

export default Basepage;
