import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import Basepage from "./pages/basepage/Basepage";
import Footer from "./components/footer/Footer";
import Errormsg from "./components/offline/Errormsg";

import Admin from "./pages/admin/Admin";

import { categoryAction } from "./redux/reducers/category";

import { appDomain, serverUrl } from "./settings";
import { useDispatch, useSelector } from "react-redux";
import { appAction } from "./redux/reducers/app";

const App = () => {
    const [showApp, setShowApp] = useState(false);
    const [appState, setAppState] = useState({
        internetConnected: true,
        serverActive: true,
        platform: "desktop",
        clientIP: null,
    });
    const admin = useSelector((state) => state.admin);
    const app = useSelector((state) => state.appState);
    const categories = useSelector((state) => state.category.categories);
    const dispatch = useDispatch();

    const getCategories = async () => {
        let res = await fetch(serverUrl + "/get_categories", { method: "get" });
        if (res.ok) {
            res = await res.json();
            dispatch(categoryAction.setCategories(res.data));
        }
    };

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

    const updateScreenSize = (e) => {
        if (window.innerWidth <= 1024) dispatch(appAction.setScreenSizeMedium(true));
        else dispatch(appAction.setScreenSizeMedium(false));
    };

    useEffect(() => {
        initializeAppState();
        getCategories();

        // // detect mobile/desktop
        if (window.navigator.userAgent.search(/\biphone\b|\bandroid\b/gim) != -1) {
            dispatch(appAction.setMobile());
        } else dispatch(appAction.setDesktop());

        window.addEventListener("resize", updateScreenSize);
        window.addEventListener("online", initializeAppState);
        return () => {
            window.removeEventListener("resize", updateScreenSize);
            window.removeEventListener("online", initializeAppState);
        };
    }, []);

    const openAdminPage = (e) => {
        console.log(e);
        if (e.ctrlKey && e.shiftKey && e.keyCode === 1) {
            window.location.href = appDomain + "/admin";
        }

        if (e.ctrlKey && e.shiftKey && e.keyCode === 17) {
            window.location.href = appDomain;
        }
    };

    useEffect(() => {
        window.addEventListener("keypress", openAdminPage);
        return () => {
            window.removeEventListener("keypress", openAdminPage);
        };
    }, []);

    return (
        <React.Fragment>
            <SnackbarProvider
                maxSnack={1}
                autoHideDuration={3000}
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
                        {!appState.internetConnected ? (
                            <Errormsg title="Oops!" text="Looks like you're offline" />
                        ) : appState.serverActive ? null : (
                            <Errormsg title="" text="Server is under maintainence, it will be back online soon!" />
                        )}
                        {!appState.internetConnected ? (
                            <Errormsg title="Oops!" text="Looks like you're offline" />
                        ) : null}
                        <React.Fragment>
                            {appState.internetConnected && appState.serverActive ? (
                                <>
                                    <Router>
                                        <Switch>
                                            <Route exact path="/">
                                                <Homepage app={app} categories={categories} admin={admin} />
                                            </Route>
                                            {categories.map((route, index) => {
                                                return (
                                                    <Route path={`/${route}`} key={index}>
                                                        <Basepage app={app} categories={categories} admin={admin} />
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
