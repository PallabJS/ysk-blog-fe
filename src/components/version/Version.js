import React from "react";

const appVersion = process.env.REACT_APP_VERSION;

const Version = () => {
    return (
        <div
            style={{
                position: "absolute",
                bottom: "5px",
                left: "10px",
                letterSpacing: "1.5px",
                width: "fit-content",
                backgroundColor: "gray",
                padding: "2px 20px",
                color: "wheat",
            }}
        >
            VERSION: <span style={{ fontWeight: 1000 }}>{appVersion}</span>
        </div>
    );
};

export default Version;
