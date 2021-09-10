import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Addpost from "./components/Addpost";
import Postpreview from "./components/Postpreview";

import "./components/style.scss";

const Admin = () => {
    useEffect(() => {
        // HIDE NAVBAR
        document.getElementsByClassName("head-container")[0].style.display = "none";
        // HIDE GOOTER
        document.getElementsByClassName("footer")[0].style.display = "none";
    }, []);
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/admin/add_post">
                        <Addpost />
                    </Route>
                    <Route path="/admin/preview_post">
                        <Postpreview className="post_container" />
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default Admin;
