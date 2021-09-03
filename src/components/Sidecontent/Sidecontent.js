import React from "react";
import parse from "html-react-parser";
import { useEffect, useState } from "react/cjs/react.development";

import { postApi } from "../../api/post/postapi";
import { PostCard } from "../postcomponents/Post";

const Sidecontent = (props) => {
    const { category } = props;
    const [latestPosts, setLatestPosts] = useState([]);

    const getLatestPosts = async () => {
        postApi.getLatestPosts(category).then((res) => {
            console.log(res);
            if (res.success) {
                setLatestPosts(res.data.reverse());
            }
        });
    };

    useEffect(() => {
        getLatestPosts();
    }, []);

    return (
        <div className={props.className}>
            <h2 className="header">Most recent posts in '{category}'</h2>
            {latestPosts.map((post, index) => {
                return (
                    <PostCard
                        className={"post_card"}
                        post={post}
                        onClick={() => (window.location.href = `/${post.meta.category}/${post.title}`)}
                    />
                );
            })}
        </div>
    );
};

export default Sidecontent;
