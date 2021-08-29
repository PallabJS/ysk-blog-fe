import React from "react";
import parse from "html-react-parser";

import "./postpage.scss";

const Postpage = (props) => {
    const { post } = props;

    return (
        <React.Fragment>
            <header className="pagetitle">
                asdasd
                {post.title.replace(/-/g, " ").replace(post.title[0], post.title[0].toUpperCase())}
                <data style={{ display: "block", marginLeft: "2px", fontSize: "1.1rem" }}>post-date: {post.date}</data>
            </header>

            <p style={{ fontSize: "1.2rem", marginBottom: "50px", lineHeight: "25px" }}>{parse(post.text)}</p>

            <div style={{ textAlign: "center" }}>
                <img src="/top-programming-languages-to-learn-in-2022.jpg" style={{ width: "60%", height: "auto" }} />
            </div>
        </React.Fragment>
    );
};

export default Postpage;
