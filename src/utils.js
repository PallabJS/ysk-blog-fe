export const utils = {
    getTimeDifference: (fromDate, toDate = new Date()) => {
        let from = fromDate.getTime();
        let to = toDate.getTime();

        console.log(fromDate);
        console.log(toDate);

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
        } else if (years <= 12) {
            returnTime = `${parseInt(years)} year`;
        }

        // Put plural measure
        if (returnTime === null) {
            returnTime = `${fromDate.toISOString().slice(0, 10)} at ${fromDate.toLocaleTimeString()}`;
        } else if (Number(returnTime.split(" ")[0]) > 1) {
            returnTime = returnTime + "s";
        }
        return returnTime;
    },
};
