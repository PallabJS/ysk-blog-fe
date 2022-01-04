import React, { useEffect, useState } from "react";

import { postApi } from "../../api/post/postapi";
import Card from "../card/Card";
import Subscription from "../subscription/Subscription";

import "./recommendation.scss";
import { utils } from "../../utils";
import { isProd } from "../../settings";

const Recommendation = ({ className, category, isPostPage, admin, ...props }) => {
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
            {!isPostPage && <Subscription />}
            <h2 className="recommandation_header"> Recommended posts </h2>
            {popularPosts.map((post, index) => {
                return (
                    <React.Fragment key={index}>
                        <Card
                            animation={true}
                            title={post.title}
                            subtitle={post.meta.category}
                            image={post.image}
                            text={post.text}
                            meta={{ views: post.meta.views }}
                        />
                    </React.Fragment>
                );
            })}

            {isProd && !isPostPage && !admin.token && (
                <div className="ads_container" style={{ marginTop: "50px" }}>
                    <h3 className="header">Advertisements</h3>
                    <div
                        className="ad_container"
                        id="container-2aa8bbc42b63894dc8eb1f9ca5478995"
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Recommendation;
