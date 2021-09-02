import React from "react";
import parse from "html-react-parser";

const Postsection = (props) => {
    const { type, post } = props;
    return (
        <React.Fragment>
            {type === "intro" || type === "climax" ? (
                <>
                    <header className="pagetitle">
                        {post.title.replace(/-/g, " ").replace(post.title[0], post.title[0].toUpperCase())}
                        <span className="meta_info">
                            <span style={{ color: "gray" }}>Posted on</span> {post.date}
                        </span>
                    </header>

                    <p className="content">{parse(post.text)}</p>

                    <div className="img_container">
                        <img src={post.image} style={{ width: "100%", height: "auto" }} />
                    </div>
                </>
            ) : null}

            {type === "body" ? (
                <>
                    <header className="pagetitle">
                        {post.title.replace(/-/g, " ").replace(post.title[0], post.title[0].toUpperCase())}
                    </header>

                    <p className="content">{parse(post.text)}</p>

                    <div className="img_container">
                        <img src={post.image} style={{ width: "100%", height: "auto" }} />
                    </div>
                </>
            ) : null}
        </React.Fragment>
    );
};

export default Postsection;
