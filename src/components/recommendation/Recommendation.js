import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

import { postApi } from "../../api/post/postapi";
import Card from "../card/Card";

import { CATEGORY } from "../../appspecs/routes";

const Recommendation = (props) => {
    const { className } = props;

    // These stores un-categorized posts
    const [latestPosts, setLatestPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    const getRecommandations = () => {
        postApi.getRecommendedPosts().then((res) => {
            if (!res.error) {
                let posts = [];
                res.data.forEach((postItem) => {
                    posts = posts.concat(postItem.popular_posts);
                });
                setPopularPosts(posts);
            }
        });
    };

    useEffect(() => {
        getRecommandations();
    }, []);

    return (
        <div className={className || "post_recommandation"}>
            <h2 className="recommandation_header"> Recommended posts by YouShouldKnow </h2>
            {popularPosts.map((post, index) => {
                return (
                    <Card
                        key={index}
                        title={post.title}
                        subtitle={post.meta.category}
                        text={post.text.slice(0, 100) + " ..."}
                        meta={{
                            views: post.meta.views,
                        }}
                        onClick={() => {
                            window.location.href = `/${CATEGORY[post.meta.category]}/${post.title}`;
                        }}
                    />
                );
            })}
            <footer className="bottom_line"> - - - &nbsp; Powered to you by ysk-algo &nbsp; - - - </footer>
        </div>
    );
};

export default Recommendation;
