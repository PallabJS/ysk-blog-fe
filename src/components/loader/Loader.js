import React, { useEffect, useState } from "react";

import "./loader.scss";

const Loader = (props) => {
    const { speed = 5, className } = props;

    const [animState, setAnimState] = useState([
        {
            id: 1,
            style: { backgroundColor: "grey", opacity: 0 },
        },
        {
            id: 2,
            style: { backgroundColor: "grey", opacity: 0.5 },
        },
        {
            id: 3,
            style: { backgroundColor: "grey", opacity: 1 },
        },
    ]);

    const startAnimation = () => {
        let nextState = animState.map((item) => {
            return {
                id: item.id,
                style: {
                    ...item.style,
                    opacity: item.style.opacity === 0 ? 0.5 : item.style.opacity === 0.5 ? 1 : 0,
                },
            };
        });

        setAnimState(nextState);
    };

    useEffect(() => {
        let animId = setInterval(() => {
            startAnimation();
        }, 1000 / speed);

        return () => {
            clearInterval(animId);
        };
    });

    return (
        <div className={`loader_container ${className}`}>
            <div className="loader_box">
                {animState.map((item) => {
                    return <div key={item.id} style={item.style} className="box"></div>;
                })}
                <div className="loading_text">Loading please hold on</div>
            </div>
        </div>
    );
};

export default Loader;
