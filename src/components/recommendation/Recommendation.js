import React, { useEffect, useState } from "react";

import { postApi } from "../../api/post/postapi";
import Card from "../card/Card";

import { CATEGORY } from "../../appspecs/routes";

import "./recommendation.scss";
import { utils } from "../../utils";

const Recommendation = (props) => {
    const { className, category } = props;

    // These stores un-categorized posts
    const [popularPosts, setPopularPosts] = useState([]);

    const getRecommandations = () => {
        postApi.getRecommendedPosts(category).then((res) => {
            if (!res.error) {
                let posts = [];
                res.data.forEach((postItem) => {
                    posts = posts.concat(postItem.popular_posts);
                });
                setPopularPosts(utils.getRandomizedArray(posts));
            }
        });
    };

    useEffect(() => {
        getRecommandations();
    }, []);

    return (
        <div className={className}>
            <h2 className="recommandation_header"> Recommended posts </h2>
            {popularPosts.map((post, index) => {
                return (
                    <Card
                        key={index}
                        animation={true}
                        title={post.title}
                        subtitle={post.meta.category}
                        image={post.image}
                        text={post.text.slice(0, 100) + " ..."}
                        meta={{
                            views: post.meta.views,
                        }}
                        onClick={() => {
                            window.location.href = `/${post.meta.category}/${post.title}`;
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Recommendation;
