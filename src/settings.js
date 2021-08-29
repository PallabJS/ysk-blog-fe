// Setting global variables
window.displayConsoleLog = true;
window.log = (logMsg) => {
    if (window.displayConsoleLog) {
        console.log(logMsg);
    }
};

export const serverUrl = process.env.REACT_APP_SERVER_URL;
