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
            <h2 className="header">Most recent posts in '{currentPostCategory}'</h2>
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
    );
};

export default Sidecontent;
