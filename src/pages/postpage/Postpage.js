import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { postApi } from "../../api/post/postapi";

import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import { appDomain } from "../../settings";
import { utils } from "../../utils";
import Postsection from "./Postsection";

const Postpage = (props) => {
    const { post } = props;

    const increasePostView = async () => {
        let res = await postApi.incrementPostView(post);
        if (res.ok) {
            console.log(await res.json());
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem("post_viewed") !== "true") {
            increasePostView();
        }
        // Set Page already viewed
        sessionStorage.setItem("post_viewed", "true");
    });

    return (
        <>
            <Helmet>
                <title>{utils.getPageTitle(post.title)}</title>
                <meta name="description" content={post.description} />
                <link rel="canonical" href={`${appDomain}/${post.meta.category}/${post.title}`} />
            </Helmet>

            <article className={props.className}>
                <Breadcrumb home="ysk" dirs={[post.meta.category, post.title]} />
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
                            return (
                                <Postsection
                                    type="body"
                                    post={post}
                                    index={index + 1}
                                    key={index}
                                />
                            );
                        })}
                    </section>
                ) : null}

                {post.climax ? (
                    <section className="post_climax_wrapper">
                        <Postsection type="climax" post={post.climax} />
                    </section>
                ) : null}
            </article>
        </>
    );
};

export default Postpage;
