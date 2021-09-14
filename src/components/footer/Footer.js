import React, { useState } from "react";

import { userApi } from "../../api/user/userapi";

import "./footer.scss";

const Footer = () => {
    const [subscriptions, setSubscriptions] = useState({
        tech: false,
        science: false,
        news: false,
    });
    const [emailAddress, setEmailAddress] = useState("");

    const handleSubsToggle = (e) => {
        let category = e.target.value;
        setSubscriptions({ ...subscriptions, [category]: !subscriptions[category] });
    };

    const addToMailingList = () => {
        let data = {
            email: emailAddress,
            subscriptions: Object.keys(subscriptions).filter((category) => subscriptions[category]),
        };
        userApi.addToMailingList(data).then((res) => {
            if (res.error) {
                window.alert(res.msg);
            } else {
                window.alert("You are subscribed to newsletter, Congrats!");
            }
        });
    };

    return (
        <footer className="footer">
            <div className="footer_copyright">
                <i>youshouldknow.site</i> &copy; {new Date().getFullYear()}
            </div>

            {/* <span style={{ color: "lightskyblue", fontWeight: 100, margin: "0px 10px" }}>|</span>

            <a className="contact_us">Contact us</a> */}
        </footer>
    );
};

export default Footer;
