import React from "react";
import { Posttitle, Postimage, Postext } from "../../components/postcomponents/Post";

const Postsection = (props) => {
    const { type, post, index } = props;
    return (
        <React.Fragment>
            <div className="post_section">
                {/* ============ THIS SECTIONS RENDERS INTRO AND CONCLUSION OF THE POST ============ */}
                {type === "intro" || type === "climax" ? (
                    <>
                        <Posttitle
                            title={post.title}
                            subtitle={post.subtitle}
                            date={post.date ? new Date(post.date) : null}
                            className={`pagetitle ${type === "climax" ? "climax_title" : ""}`}
                        />
                        <Postext text={post.text} className="content" />
                        <Postimage url={post.image} className="img_container" />
                    </>
                ) : null}

                {/* ============ THIS SECTION RENDERS INTRO OF THE BODY ================== */}
                {type === "bodyintro" ? (
                    <>
                        <Posttitle title={post.title} className="section_title" />
                        <Postext text={post.text} className="content" />
                        <Postimage url={post.image} className="img_container" />
                    </>
                ) : null}

                {/* ============ THIS SECTION RENDERS ITEMS OF THE BODY ================== */}
                {type === "body" ? (
                    <>
                        <Posttitle title={`0${index}. ${post.title}`} className="section_title" />
                        <Postext text={post.text} className="content" />
                        <Postimage url={post.image} className="img_container" />
                    </>
                ) : null}
            </div>
        </React.Fragment>
    );
};

export default Postsection;
