import React from "react";

import "./footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ul className="footer_about">
                <li>
                    <a> About </a>
                </li>
                <li>
                    <a> Feedback </a>
                </li>
                <li>
                    <a> Raise complaint </a>
                </li>
                <li>
                    <a> Advertise you product </a>
                </li>
            </ul>
            <div className="footer_policy">Website policies</div>
            <div className="footer_author">About the author</div>
        </footer>
    );
};

export default Footer;
