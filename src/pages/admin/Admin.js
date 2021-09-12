import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Addpost from "./components/Addpost";
import Dashboard from "./components/Dashboard";
import Postpreview from "./components/Postpreview";

import Modal from "../../components/modal/Modal";
import { adminApi } from "./api";

import { adminAction } from "../../redux/reducers/admin";

const Admin = () => {
    const categories = useSelector((state) => state.category.categories);
    const dispatch = useDispatch();

    const admin = useSelector((state) => state.admin);

    const [modal, setModal] = useState({
        active: !Boolean(admin.token),
        data: null,
    });

    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        let res = await adminApi.login({ username: "admin", password: password });
        console.log(res);
        if (!res.error) {
            dispatch(adminAction.setToken(res.data.token));
        }
        return res;
    };

    useEffect(() => {
        try {
            // HIDE NAVBAR
            document.getElementsByClassName("head-container")[0].style.display = "none";
            // HIDE GOOTER
            document.getElementsByClassName("footer")[0].style.display = "none";
        } catch (e) {}
    }, []);

    return (
        <>
            <Modal
                className={""}
                style={{}}
                active={modal.active}
                data={modal.data}
                setModal={setModal}
                type="prompt"
                text="Enter admin password"
                promptValue={password}
                setPromptValue={setPassword}
                confirmHandler={handleLogin}
            />
            {admin.token ? (
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
            ) : null}
        </>
    );
};

export default Admin;
