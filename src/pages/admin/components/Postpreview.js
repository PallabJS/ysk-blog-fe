import React, { startTransition } from "react";
import { useSelector } from "react-redux";

import { CATEGORY } from "../../../appspecs/routes";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import Postsection from "../../../pages/postpage/Postsection";
import Sidecontent from "../../../components/Sidecontent/Sidecontent";

import "../../basepage/basepage.scss";

const Postpreview = (props) => {
    const post = useSelector((state) => state.post);

    console.log("this: ", post.meta);
    return (
        <>
            <button
                id="preview_done_button"
                onClick={(e) => {
                    e.target.classList.add("preview_done_button_active");
                    setTimeout(() => {
                        window.location.href = "/admin/add_post";
                    }, 400);
                }}
            >
                DONE
            </button>
            <main className="basepage_container">
                <div className="main_flexbox">
                    <article className={props.className}>
                        <Breadcrumb home="ysk" dirs={[CATEGORY[post.meta.category], post.title]} />
                        <section className="post_intro_wrapper">
                            <Postsection
                                type="intro"
                                post={{
                                    title: post.title,
                                    subtitle: post.subtitle,
                                    date: post.date,
                                    text: post.text,
                                    image: post.image,
                                }}
                            />
                        </section>

                        {post.body && post.body.intro ? (
                            <section>
                                <Postsection
                                    type="bodyintro"
                                    post={{
                                        title: post.body.intro.title,
                                        date: post.body.intro.date,
                                        text: post.body.intro.text,
                                        image: post.body.intro.image,
                                    }}
                                />
                            </section>
                        ) : null}

                        {post.body && post.body.list ? (
                            <section className="post_body_wrapper">
                                {post.body.list.map((post, index) => {
                                    return <Postsection type="body" post={post} index={index + 1} key={index} />;
                                })}
                            </section>
                        ) : null}

                        {post.climax ? (
                            <section className="post_climax_wrapper">
                                <Postsection type="climax" post={post.climax} />
                            </section>
                        ) : null}
                    </article>
                    <Sidecontent
                        className="sidecontent_container"
                        currentPostCategory={CATEGORY[post.meta.category]}
                        currentPostTitle={post.title}
                        countToDisplay={10}
                    />
                </div>
            </main>
        </>
    );
};

export default Postpreview;
