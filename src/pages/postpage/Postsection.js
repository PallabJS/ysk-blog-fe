import React from "react";
import parse from "html-react-parser";

import { Posttitle, Postimage, Postext } from "../../components/postcomponents/Post";

const Postsection = (props) => {
    const { type, post, index } = props;
    return (
        <React.Fragment>
            {/* ============ THIS SECTIONS RENDERS INTRO AND CONCLUSION OF THE POST ============ */}
            {type === "intro" || type === "climax" ? (
                <>
                    <Posttitle title={post.title} subtitle={post.subtitle} date={post.date} className="pagetitle" />
                    <Postext text={post.text} className="content" />
                    <Postimage url={post.image} className="img_container" />
                </>
            ) : null}

            {/* ============ THIS SECTION RENDERS INTRO OF THE BODY ================== */}
            {type === "bodyintro" ? (
                <>
                    <Posttitle title={post.title} date={post.date} className="section_title" />
                    <Postext text={post.text} className="content" />
                    <Postimage url={post.image} className="img_container" />
                </>
            ) : null}

            {/* ============ THIS SECTION RENDERS ITEMS OF THE BODY ================== */}
            {type === "body" ? (
                <>
                    <Posttitle title={`${index}. ${post.title}`} date={post.date} className="section_title" />
                    <Postext text={post.text} className="content" />
                    <Postimage url={post.image} className="img_container" />
                </>
            ) : null}
        </React.Fragment>
    );
};

export default Postsection;