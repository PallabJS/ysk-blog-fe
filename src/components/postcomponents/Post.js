import React from "react";
import parse from "html-react-parser";

import { utils } from "../../utils";

export const Posttitle = (props) => {
    const { title, subtitle, date, className } = props;
    return (
        <React.Fragment>
            {title ? (
                <header className={className}>
                    {title.replace(/-/g, " ").replace(title[0], title[0].toUpperCase())}
                    <Subtitle subtitle={subtitle} className="subtitle" />
                    <Postdate date={date} className="meta_info" />
                </header>
            ) : null}
        </React.Fragment>
    );
};

export const Subtitle = ({ subtitle, className }) => {
    return (
        <>
            {subtitle ? (
                <div className={className}>
                    &nbsp; - {subtitle.replace(/-/g, " ").replace(subtitle[0], subtitle[0].toUpperCase())}
                </div>
            ) : null}
        </>
    );
};

export const Postdate = (props) => {
    const { date, className } = props;
    return (
        <React.Fragment>
            {date ? (
                <span className={className}>
                    <span style={{ color: "gray" }}> Posted on </span>
                    {date.toDateString()}
                    <span style={{ color: "gray" }}> ({utils.getTimeDifference(date)} ago)</span>
                </span>
            ) : null}
        </React.Fragment>
    );
};

export const Postimage = (props) => {
    const { url, className } = props;
    return (
        <>
            {url ? (
                <div className={className}>
                    <img src={url} style={{ width: "100%", height: "auto" }} />
                </div>
            ) : null}
        </>
    );
};

export const Postext = (props) => {
    const { text, className } = props;
    return <>{text ? <p className={className}>{parse(text)}</p> : null}</>;
};

export const PostCard = (props) => {
    const { className, post, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <h3>{post.title.replace(/-/g, " ").replace(post.title[0], post.title[0].toUpperCase())}</h3>
            <div> ({utils.getTimeDifference(new Date(post.date.replace("at", "")))} ago)</div>
            <p>"{parse(post.text.slice(0, 100))}"</p>
        </div>
    );
};

// export const demo = (props) => {
//     const { title } = props;
//     return <></>;
// };
