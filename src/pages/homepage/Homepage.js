import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

import "./homepage.scss";

import { postApi } from "../../api/post/postapi";
import { utils } from "../../utils";

const Homepage = (props) => {
    const { categories } = props;

    const [data, setData] = useState({});

    const loadHomepage = async () => {
        let res = await postApi.getHomepageData(6);
        if (!res.error) {
            setData(res.data);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            loadHomepage();
        }, 1000);
    }, []);

    return (
        <div className="homepage">
            <div className="main">
                {Object.keys(data).map((category, index) => {
                    return (
                        <section key={index} className="homepage_category_section">
                            <h2 className="header">{category.toUpperCase()}</h2>
                            <div className="content">
                                {data[category].map((post, index) => {
                                    return (
                                        <div key={index} className="homepage_category_post_section_container">
                                            <section
                                                className="homepage_category_post_section"
                                                onClick={() => {
                                                    window.location.href = `/${post.meta.category}/${post.title}`;
                                                }}
                                            >
                                                <div className="image_container">
                                                    {index % 2 === 0 ? (
                                                        <img src={post.image} alt="" />
                                                    ) : (
                                                        <img src="https://i.imgur.com/szEUmhE.png" alt="" />
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
