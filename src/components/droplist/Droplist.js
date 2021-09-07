import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./droplist.scss";

import { CATEGORY } from "../../appspecs/routes";
import { faBinoculars } from "@fortawesome/free-solid-svg-icons";
import { faMehBlank } from "@fortawesome/free-regular-svg-icons";

const Droplist = (props) => {
    const { className, style = {}, show, droplist, anchorElement, searchText } = props;
    const element = useRef();
    const [pos, setPos] = useState({
        top: 0,
        left: 0,
    });

    useEffect(() => {
        if (anchorElement && element.current) {
            setTimeout(() => {
                try {
                    element.current.style.opacity = 1;
                } catch (e) {}
            }, 100);

            setPos({
                top: parseFloat(anchorElement.offsetTop) + parseFloat(anchorElement.clientHeight),
                left: parseFloat(anchorElement.offsetLeft),
            });
        }
    }, [droplist]);
    return (
        <>
            {show ? (
                <div
                    ref={element}
                    style={{
                        ...style,
                        position: "absolute",
                        border: "1px solid red !important",
                        top: pos.top + "px",
                        left: pos.left + "px",
                        zIndex: 1,
                    }}
                    className={`droplist ${className}`}
                >
                    {droplist.length > 0 ? (
                        <>
                            <div className="droplist_title">
                                <FontAwesomeIcon icon={faBinoculars} size="lg" color="green" />
                                &nbsp; Look what I have found for you.
                            </div>
                            <ul>
                                {droplist.map((post, index) => {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                window.location.href = `/${CATEGORY[post.meta.category]}/${post.title}`;
                                            }}
                                        >
                                            {post.title
                                                .replace(/-/g, " ")
                                                .replace(post.title[0], post.title[0].toUpperCase())}
                                            <span style={{ fontSize: "0.9rem", float: "right" }}>
                                                &nbsp;({new Date(post.date).toDateString().slice(4)})
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : (
                        <div className="droplist_title">
                            <FontAwesomeIcon icon={faMehBlank} size="lg" color="red" />
                            &nbsp; What is that!
                            <a
                                style={{ float: "right", color: "white", textDecoration: "none" }}
                                href={`https://google.com/search?q=${searchText.replace(/ /g, "+")}`}
                                target="_blank"
                            >
                                Use google
                            </a>
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default Droplist;
