import React from "react";

import "./errormsg.scss";

const Errormsg = (props) => {
    return (
        <div className="offline">
            <h1>{props.title}</h1>
            <p>&nbsp;{props.text}</p>
        </div>
    );
};

export default Errormsg;
