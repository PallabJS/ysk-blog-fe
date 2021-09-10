import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

import Recommendation from "../../components/recommendation/Recommendation";

import "./homepage.scss";

import { postApi } from "../../api/post/postapi";
import { utils } from "../../utils";
import { CATEGORY } from "../../appspecs/routes";

const Homepage = () => {
    const [data, setData] = useState({});

    const loadHomepage = async () => {
        let res = await postApi.getHomepageData(7);
        if (!res.error) {
            setData(res.data);
        }
    };

    useEffect(() => {
        loadHomepage();
    }, []);

    return (
        <div className="homepage">
            <div className="main">
                {Object.keys(data).map((category, index) => {
                    return (
                        <section className="homepage_category_section">
                            <h2 className="header">{category.toUpperCase()}</h2>
                            <div className="content">
                                {data[category].map((post, index) => {
                                    return (
                                        <div className="homepage_category_post_section_container">
                                            <section
                                                className="homepage_category_post_section"
                                                onClick={() => {
                                                    window.location.href = `/${CATEGORY[post.meta.category]}/${
                                                        post.title
                                                    }`;
                                                }}
                                            >
                                                <div className="image_container">
                                                    {index % 2 == 0 ? (
                                                        <img src={post.image} />
                                                    ) : (
                                                        <img src="https://i.imgur.com/szEUmhE.png" />
                                                    )}
                                                </div>
                                                <h3 className="title">{utils.parseTitle(post.title)}</h3>
                                                <p className="text">
                                                    {utils.sliceParsedJSX(parse(post.text), 80)}. . .
                                                </p>
                                            </section>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}
            </div>
            <div className="homepage_aside_section"> Adds </div>
        </div>
    );
};

export default Homepage;
