import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Addpost from "./components/Addpost";
import Dashboard from "./components/Dashboard";
import Postpreview from "./components/Postpreview";

const Admin = () => {
    const categories = useSelector((state) => state.category.categories);

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
                    <Route path="/admin/dashboard">
                        <Dashboard categories={categories} />
                    </Route>
                    <Route path="/admin/add_post">
                        <Addpost categories={categories} />
                    </Route>
                    <Route path="/admin/preview_post">
                        <Postpreview className="post_container" />
                    </Route>

                    <Route path="/admin">
                        <Redirect to="/admin/dashboard" />
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default Admin;
