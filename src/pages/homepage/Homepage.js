import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import parse from "html-react-parser";

import Nodata from "../../components/Nodata";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

import "./homepage.scss";

import { appDomain, isProd, serverUrl } from "../../settings";
import { postApi } from "../../api/post/postapi";
import { utils } from "../../utils";
import Accessibility from "../../components/accesibility/Accessibility";
import Subscription from "../../components/subscription/Subscription";
import Loader from "../../components/loader/Loader";

const Homepage = (props) => {
    const { app, categories, admin } = props;

    const [appLoader, setApploader] = useState(true);

    const [data, setData] = useState({});

    const loadHomepage = async () => {
        let res = await postApi.getHomepageData(6);
        if (!res.error) {
            setApploader(false);
            setData(res.data);
        }
    };

    useEffect(() => {
        loadHomepage();
    }, []);

    return (
        <>
            <Helmet>
                <title>{utils.getPageTitle()}</title>
                <meta
                    name="description"
                    content="A place for non-aliens where information about many aspects like technology, science, howto's and much more is delivered and discussed. We know that people love to learn with support and simplicity, and that is one big 'why' youshouldknow started existing."
                />
                <link rel="canonical" href={`${appDomain}`} />
            </Helmet>

            {/* {!app.isMobile && <Accessibility />} */}

            <Navbar app={app} categories={categories} />

            <div className="homepage">
                <div className="main">
                    <div className="page_header">
                        <img
                            width={"100%"}
                            height={"100%"}
                            src="pwa_icon_dark.png"
                            alt="brand logo"
                        />
                        <h1 className="header">
                            {app.isMobile ? (
                                <>
                                    A new-born <q>open</q> blog for <q>anyone</q> who love to read
                                    and learn new
                                    <q>cool</q>
                                    stuffs.
                                    <br />
                                </>
                            ) : (
                                <>
                                    A new-born <q>open</q> blog for <q>anyone</q> who love to read
                                    and learn new
                                    <q>cool</q>
                                    stuffs.
                                    <br />
                                </>
                            )}
                            <span>We deliver contents - that you love to read.</span>
                        </h1>
                    </div>

                    <div className="homepage_category_section_container">
                        {appLoader ? (
                            <Loader className="homepage_category_section_container" />
                        ) : (
                            Object.keys(data).map((category, index) => {
                                return (
                                    <section key={index} className="homepage_category_section">
                                        <h2 className="header">{category.toUpperCase()}</h2>
                                        <div className="content">
                                            {data[category].length === 0 && (
                                                <Nodata
                                                    text="No posts on this category yet"
                                                    style={{
                                                        padding: "10px",
                                                    }}
                                                />
                                            )}
                                            {data[category].map((post, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="homepage_category_post_section_container"
                                                    >
                                                        <section className="homepage_category_post_section">
                                                            <div className="image_container">
                                                                <img
                                                                    width={"1000%"}
                                                                    height={"100%"}
                                                                    src={utils.composeImageLink(
                                                                        post.image
                                                                    )}
                                                                    alt={utils.noImageLink}
                                                                />
                                                            </div>
                                                            <h3 className="title">
                                                                <a
                                                                    href={`${appDomain}/${post.meta.category}/${post.title}`}
                                                                >
                                                                    {utils.parseTitle(post.title)}
                                                                </a>
                                                            </h3>
                                                            <div className="date">
                                                                Post is{" "}
                                                                {utils.getTimeDifference(
                                                                    new Date(post.date)
                                                                )}{" "}
                                                                old
                                                            </div>
                                                            <p className="text">
                                                                {app.isMobile
                                                                    ? utils.sliceParsedJSX(
                                                                          parse(post.text),
                                                                          200
                                                                      )
                                                                    : utils.sliceParsedJSX(
                                                                          parse(post.text),
                                                                          80
                                                                      )}
                                                                . . .
                                                            </p>
                                                        </section>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="homepage_aside_section">
                    <Subscription />
                    {isProd && (
                        <div className="ad_container">
                            <h3 className="homepage_ad_header">ADVERTISEMENTS</h3>
                            <div
                                className="homepage_ad_container"
                                id="container-2aa8bbc42b63894dc8eb1f9ca5478995"
                            ></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Homepage;
