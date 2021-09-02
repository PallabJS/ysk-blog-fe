import React from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Postsection from "./Postsection";

const Postpage = (props) => {
    const { post } = props;

    return (
        <article className={props.className}>
            <Breadcrumb home="ysk" dirs={[post.meta.category, post.title]} />
            <section className="post_intro_wrapper">
                <Postsection
                    type="intro"
                    post={{
                        title: post.title,
                        date: post.date,
                        text: post.text,
                        image: post.image,
                    }}
                />
            </section>
            <section className="post_body_wrapper">
                {post.body.map((post, index) => {
                    return <Postsection type="body" post={post} key={index} />;
                })}
            </section>
            <section className="post_climax_wrapper">
                <Postsection type="climax" post={post.climax} />
            </section>
        </article>
    );
};

export default Postpage;
