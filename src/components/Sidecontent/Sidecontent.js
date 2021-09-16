import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

import { postApi } from "../../api/post/postapi";
import { PostCard } from "../postcomponents/Post";

let atOptions = {
    key: "416a4fdc0fb0ae6d08db33ffd7c4eaca",
    format: "iframe",
    height: 250,
    width: 300,
    params: {},
};

const Sidecontent = (props) => {
    const { currentPostCategory, currentPostTitle, countToDisplay } = props;
    const [latestPosts, setLatestPosts] = useState([]);

    const getLatestPosts = async () => {
        postApi.getLatestPosts(currentPostCategory).then((res) => {
            if (res.success) {
                let posts = res.data.filter((post) => post.title !== currentPostTitle);
                posts = posts.reverse().slice(0, countToDisplay);
                setLatestPosts(posts);
            }
        });
    };

    useEffect(() => {
        getLatestPosts();
    }, []);

    return (
        <div className={props.className}>
            <h2 className="header">
                Recent posts in <i>{currentPostCategory}</i>
            </h2>
            <div className="side_cards">
                {latestPosts.map((post, index) => {
                    return (
                        <>
                            <PostCard
                                key={index}
                                className={"post_card"}
                                post={post}
                                onClick={() => (window.location.href = `/${currentPostCategory}/${post.title}`)}
                            />
                        </>
                    );
                })}
            </div>
            <div className="ads_container">
                <h3 className="header">Advertisements</h3>
                <div className="ad_container" id="container-2aa8bbc42b63894dc8eb1f9ca5478995"></div>
            </div>
        </div>
    );
};

export default Sidecontent;
