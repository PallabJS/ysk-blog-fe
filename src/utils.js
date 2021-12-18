import { store } from "./redux/redux";

const getApp = () => {
    return store.getState().appState;
};

export const utils = {
    // URLS
    noImageLink: "https://i.imgur.com/TZ2rh2Qt.png",

    numerize: (pixel) => {
        return parseInt(pixel.replace("px", ""));
    },
    pixelize: (value) => {
        return value + "px";
    },
    parseTitle: (title) => {
        if (title) return title.replace(/-/g, " ").replace(title[0], title[0].toUpperCase());
        else return title;
    },
    urlizeTitle: (title) => {
        if (title) return title.replace(/ /g, "-").toLowerCase();
        else return title;
    },

    setPageTitle: (title) => {
        let composedTitle = "YSK";
        if (title) {
            let parsedTitle = utils.parseTitle(title);
            parsedTitle = parsedTitle.split(":")[0];
            composedTitle = composedTitle + " | " + parsedTitle;
        } else {
            composedTitle = composedTitle + " | Homepage";
        }
        document.title = composedTitle;
    },
    getPageTitle: (title) => {
        let composedTitle = "YSK";
        if (title) {
            let parsedTitle = utils.parseTitle(title);
            parsedTitle = parsedTitle.split(":")[0];
            composedTitle = composedTitle + " | " + parsedTitle;
        } else {
            composedTitle = composedTitle + " | Homepage";
        }
        return composedTitle;
    },

    composeImageLink: (link) => {
        let app = getApp();
        return link.replace(".png", "l.png");

        if (app.isMobile) {
            return link.replace(".png", "m.png");
        } else {
            return link.replace(".png", "l.png");
        }
    },

    getRandomizedArray: (arr) => {
        arr.forEach((item, index) => {
            let value1 = Math.floor(Math.random() * arr.length);
            let temp = arr[value1];
            arr[value1] = arr[index];
            arr[index] = temp;
        });
        return arr;
    },
    getTimeDifference: (fromDate, toDate = new Date()) => {
        try {
            let from = fromDate.getTime();
            let to = toDate.getTime();

            let secs = (to - from) / 1000;
            let minutes = secs / 60;
            let hours = minutes / 60;
            let days = hours / 24;
            let weeks = days / 7;
            let months = parseInt(weeks / 4.2);
            let years = months / 12;

            let returnTime = null;

            if (minutes <= 60) {
                returnTime = `${parseInt(minutes)} minute`;
            } else if (hours <= 24) {
                returnTime = `${parseInt(hours)} hour`;
            } else if (days <= 7) {
                returnTime = `${parseInt(days)} day`;
            } else if (weeks <= 4) {
                returnTime = `${parseInt(weeks)} week`;
            } else if (months <= 12) {
                returnTime = `${parseInt(months)} month`;
            } else if (years <= 12) {
                returnTime = `${parseInt(years)} year`;
            } else {
            }

            // Put plural measure
            if (returnTime === null) {
                returnTime = `${fromDate
                    .toISOString()
                    .slice(0, 10)} at ${fromDate.toLocaleTimeString()}`;
            } else if (Number(returnTime.split(" ")[0]) > 1) {
                returnTime = returnTime + "s";
            }
            return returnTime;
        } catch (e) {
            return "";
        }
    },

    sliceParsedJSX: (text, length) => {
        let output = "";
        if (typeof text === "string") {
            output = text.slice(0, length);
        } else if (Array.isArray(text)) {
            let count = 0;
            text.forEach((t) => {
                if (count >= length) {
                    return;
                }
                if (typeof t === "string") {
                    let avalableLength = length - output.length;
                    if (avalableLength <= t.length) {
                        output = output + t.slice(0, avalableLength);
                        count = count + avalableLength;
                    } else {
                        count = count + t.length;
                        output = output + t;
                    }
                } else {
                    let rawText = t.props.children;
                    if (!t.props.children) rawText = "";
                    let availableLength = length - output.length;
                    if (availableLength <= rawText.length) {
                        output = output + rawText.slice(0, availableLength);
                        count = count + availableLength;
                    } else {
                        output = output + rawText;
                        count = count + rawText.length;
                    }
                }
            });
        } else {
            output = text;
        }
        return output;
    },
};
