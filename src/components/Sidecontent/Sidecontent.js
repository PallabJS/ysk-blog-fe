import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

import { postApi } from "../../api/post/postapi";
import { PostCard } from "../postcomponents/Post";

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
                    <PostCard
                        key={index}
                        className={"post_card"}
                        post={post}
                        onClick={() => (window.location.href = `/${currentPostCategory}/${post.title}`)}
                    />
                );
            })}
        </div>
    );
};

export default Sidecontent;
