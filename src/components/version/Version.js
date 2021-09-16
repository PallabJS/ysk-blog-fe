import React from "react";

const appVersion = process.env.REACT_APP_VERSION;

const Version = () => {
    return (
        <>
            {appVersion ? (
                <div
                    style={{
                        position: "absolute",
                        zIndex: 100,
                        left: "50%",
                        transform: "translate(-50%)",
                        bottom: "20px",
                        letterSpacing: "1.5px",
                        fontSize: "0.67rem",
                        width: "fit-content",
                        padding: "2px 20px",
                        opacity: 0.8,
                        color: "wheat",
                    }}
                >
                    VERSION: <span style={{ fontWeight: 1000 }}>{appVersion}</span>
                </div>
            ) : null}
        </>
    );
};

export default Version;
