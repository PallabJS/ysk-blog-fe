import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

import "./homepage.scss";

import { postApi } from "../../api/post/postapi";
import { utils } from "../../utils";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const Homepage = (props) => {
    const { app, categories } = props;

    const [data, setData] = useState({});

    const loadHomepage = async () => {
        let res = await postApi.getHomepageData(6);
        if (!res.error) {
            setData(res.data);
        }
    };

    useEffect(() => {
        loadHomepage();
    }, []);

    return (
        <>
            <Navbar app={app} categories={categories} />
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
                                                        <img
                                                            src={utils.compostImageLink(post.image)}
                                                            alt={utils.noImageLink}
                                                        />
                                                    </div>
                                                    <h3 className="title">{utils.parseTitle(post.title)}</h3>
                                                    <div className="date">
                                                        Post is {utils.getTimeDifference(new Date(post.date))} old
                                                    </div>
                                                    <p className="text">
                                                        {app.isMobile
                                                            ? utils.sliceParsedJSX(parse(post.text), 200)
                                                            : utils.sliceParsedJSX(parse(post.text), 80)}
                                                        . . .
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
                <div className="homepage_aside_section">
                    <div className="ad_container">
                        <h3 className="homepage_ad_header">ADVERTISEMENTS</h3>
                        <div className="homepage_ad_container" id="container-2aa8bbc42b63894dc8eb1f9ca5478995"></div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Homepage;
