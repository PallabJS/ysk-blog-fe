import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import Basepage from "./pages/basepage/Basepage";
import Footer from "./components/footer/Footer";
import Version from "./components/version/Version";
import Errormsg from "./components/offline/Errormsg";

import Admin from "./pages/admin/Admin";

import { categoryAction } from "./redux/reducers/category";

import { serverUrl } from "./settings";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
    const [showApp, setShowApp] = useState(false);
    const [appState, setAppState] = useState({
        internetConnected: true,
        serverActive: true,
        platform: "desktop",
        clientIP: null,
    });
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

    useEffect(() => {
        initializeAppState();
        getCategories();
        window.addEventListener("online", initializeAppState);
        return () => {
            window.removeEventListener("online", initializeAppState);
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
                        <Version />
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
                                        <Navbar categories={categories} />
                                        <Switch>
                                            <Route exact path="/">
                                                <Homepage />
                                            </Route>
                                            {categories.map((route, index) => {
                                                return (
                                                    <Route path={`/${route}`} key={index}>
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
