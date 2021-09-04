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
        console.log(data);
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
            <button className="submit_button" onClick={addToMailingList}>
                Subscribe
            </button>
            <input
                type="email"
                placeholder="Email address"
                onChange={(e) => {
                    setEmailAddress(e.target.value);
                }}
            />
            <div className="subscription_group">
                {Object.keys(subscriptions).map((category, index) => {
                    return (
                        <span key={index}>
                            <input
                                id={category}
                                type="checkbox"
                                value={category}
                                checked={subscriptions[category]}
                                onChange={handleSubsToggle}
                            />
                            <label htmlFor={category}>{category.toUpperCase()}</label>
                        </span>
                    );
                })}
            </div>

            <span style={{ color: "lightskyblue", fontWeight: 100, margin: "0px 10px" }}>|</span>

            <a>Contact us</a>
            <div className="footer_copyright">
                <i>youshouldknow.site</i> &copy; {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
