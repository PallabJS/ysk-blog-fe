import React, { useEffect, useState } from "react";

import { userApi } from "../../api/user/userapi";

import "./footer.scss";

const Footer = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 5000);
    }, []);

    return (
        <footer className="footer">
            {show && (
                <div className="footer_copyright">
                    Youshouldknow.live &copy; {new Date().getFullYear()}
                </div>
            )}
        </footer>
    );
};

export default Footer;
