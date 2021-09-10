import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NotiProvider, { SnackbarProvider } from "notistack";

import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import Basepage from "./pages/basepage/Basepage";
import Footer from "./components/footer/Footer";
import Version from "./components/version/Version";

import Admin from "./pages/admin/Admin";

import { categoryRoutes } from "./appspecs/routes";
import Offline from "./components/offline/Offline";
import { serverUrl } from "./settings";

const App = () => {
    const [showApp, setShowApp] = useState(false);
    const [appState, setAppState] = useState({
        internetConnected: true,
        serverActive: true,
        platform: "desktop",
        clientIP: null,
    });

    // Manage app state
    const initializeAppState = async () => {
        let isOnline = window.navigator.onLine;
        let isServerRunning = (await getServerState()).success;
        setAppState({
            internetConnected: isOnline,
            serverActive: isServerRunning,
        });
        setShowApp(true);
    };

    const getServerState = async () => {
        try {
            let res = await fetch(serverUrl + "/server_state", { method: "get" });
            if (res.ok) return res.json();
            else return { success: true };
        } catch (e) {
            return { success: false };
        }
    };

    useEffect(() => {
        initializeAppState();
        window.addEventListener("online", initializeAppState);
        return () => {
            window.removeEventListener("online", initializeAppState);
        };
    }, []);

    return (
        <React.Fragment>
            <SnackbarProvider
                maxSnack={1}
                autoHideDuration={4000}
                style={{
                    fontSize: "1rem",
                    padding: "0px 10px",
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    minWidth: "400px",
                }}
            >
                {showApp ? (
                    <React.Fragment>
                        <Version />
                        <Navbar />
                        {!appState.internetConnected ? (
                            <Offline />
                        ) : appState.serverActive ? null : (
                            <div>Our server is under maintainence, please come after 24 hrs</div>
                        )}
                        {!appState.internetConnected ? <Offline /> : null}
                        <React.Fragment>
                            {appState.internetConnected && appState.serverActive ? (
                                <>
                                    <Router>
                                        <Switch>
                                            <Route exact path="/">
                                                <Homepage />
                                            </Route>
                                            {Object.values(categoryRoutes).map((route, index) => {
                                                return (
                                                    <Route path={route} key={index}>
                                                        <Basepage />
                                                    </Route>
                                                );
                                            })}
                                            <Route path="/admin">
                                                <Admin />
                                            </Route>
                                            <Route path="/">
                                                <Redirect to="/" />
                                            </Route>
                                        </Switch>
                                    </Router>
                                    <Footer />
                                </>
                            ) : null}
                        </React.Fragment>
                    </React.Fragment>
                ) : null}
            </SnackbarProvider>
        </React.Fragment>
    );
};

export default App;
