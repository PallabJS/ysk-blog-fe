import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { userApi } from "../../api/user/userapi";

import "./subscription.scss";

const Subscription = (props) => {
    const categories = useSelector((state) => state.category.categories);

    const [state, setState] = useState({
        email: "",
    });

    const { enqueueSnackbar } = useSnackbar();

    const handleInput = (e, type) => {
        let value = e.target.value;
        setState({ ...state, [type]: value });
    };

    const handleSubscription = async () => {
        if (!state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gim)) {
            enqueueSnackbar("Oops! your email seems to be invalid", { variant: "warning" });
            return;
        }

        let res = await userApi.addToMailingList({
            email: state.email,
            categories: categories,
            active: true,
            registered: false,
        });
        if (!res.error) {
            enqueueSnackbar("You have been Subscribed", { variant: "success" });
            setState({ email: "" });
        } else enqueueSnackbar("There was a problem adding now, but your email will be added", { variant: "info" });
    };

    return (
        <>
            <div className="subscription_container">
                <div className="subscription">
                    <h3 className="header">Get Updated</h3>
                    <p className="intro_text">Drop your email and we will keep you updated on upcomming posts.</p>
                    <span>(Unsubscribe anytime)</span>
                    <div className="input_box">
                        <input
                            type="email"
                            value={state.email}
                            spellCheck="false"
                            autoComplete={false}
                            autoSave={false}
                            onChange={(e) => handleInput(e, "email")}
                        />
                        <input type="button" value={"I'M IN"} onClick={handleSubscription} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscription;
