import React from "react";

const Nodata = (props) => {
    return (
        <div style={{ width: "100%", padding: "20px 10px" }}>
            <header
                style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    color: props.color || "rgb(200, 80, 100)",
                    fontWeight: 500,
                }}
            >
                {props.text}
            </header>
        </div>
    );
};

export default Nodata;
