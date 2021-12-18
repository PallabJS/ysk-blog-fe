import React, { useEffect, useState } from "react";

const screenSizes = [
    {
        size: "xs",
        range: [0, 600],
    },
    {
        size: "sm",
        range: [601, 900],
    },
    {
        size: "md",
        range: [901, 1200],
    },
    {
        size: "lg",
        range: [1201, 1500],
    },
    {
        size: "xl",
        range: [1500, Infinity],
    },
];

const getScreenSize = (sizeInPixel) => {
    let size = 0;
    for (let i = 0; i < screenSizes.length; i++) {
        if (screenSizes[i].range[0] <= sizeInPixel && sizeInPixel < screenSizes[i].range[1]) {
            size = screenSizes[i].size;
            break;
        }
    }
    return size;
};

const useScreenSize = (size) => {
    const [screenSize, setScreenSize] = useState(size || window.innerWidth);
    const updateScreenSize = (e) => {
        setScreenSize(getScreenSize(window.innerWidth));
    };

    useEffect(() => {
        window.addEventListener("resize", updateScreenSize);
        return () => {
            window.removeEventListener("resize", updateScreenSize);
        };
    });

    return screenSize;
};

export default useScreenSize;
