import React, { useEffect, useState } from "react";
import Subscription from "../subscription/Subscription";

import { postApi } from "../../api/post/postapi";
import { isProd } from "../../settings";
import { PostCard } from "../postcomponents/Post";

const Sidecontent = (props) => {
    const { admin, currentPostCategory, currentPostTitle, countToDisplay } = props;
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
            <Subscription />
            <h2 className="header">
                Recent posts in <i>{currentPostCategory}</i>
            </h2>
            <div className="side_cards">
                {latestPosts.map((post, index) => {
                    return <PostCard key={index} post={post} />;
                })}
            </div>
            {isProd && !admin.token && (
                <div className="ads_container">
                    <h3 className="header">Advertisements</h3>
                    <div className="ad_container" id="container-2aa8bbc42b63894dc8eb1f9ca5478995"></div>
                </div>
            )}
        </div>
    );
};

export default Sidecontent;
