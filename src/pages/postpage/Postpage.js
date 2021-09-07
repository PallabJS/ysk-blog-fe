import React from "react";
import { CATEGORY } from "../../appspecs/routes";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Postsection from "./Postsection";

const Postpage = (props) => {
    const { post } = props;

    return (
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
    );
};

export default Postpage;
