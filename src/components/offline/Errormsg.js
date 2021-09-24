import React, { useEffect } from "react";
import { serverUrl } from "../../settings";

import "./errormsg.scss";

const Errormsg = (props) => {
    useEffect(async () => {
        await fetch(serverUrl + "/404", { method: "get" });
    }, []);
    return (
        <div className="offline">
            <h1>{props.title}</h1>
            <p>&nbsp;{props.text}</p>
        </div>
    );
};

export default Errormsg;
