import React, { useEffect, useState } from "react";

import Postpage from "../postpage/Postpage";
import Page404 from "../Page404";

import { postApi } from "../../api/post/postapi";

let path = window.location.pathname;
let [category, postTitle] = path.slice(1).split("/");

const Basepage = () => {
    const [postInfo, setPostInfo] = useState({
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
            <div style={{ width: "70%", border: "1px solid red", transform: "translate(20%, 50px)", padding: "20px" }}>
                {post.show && post.valid ? <Postpage post={post} /> : post.show && !post.valid ? <Page404 /> : ""}
            </div>
        </React.Fragment>
    );
};

export default Basepage;
