import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAction } from "../../../redux/reducers/admin";
import { adminApi } from "../api";

import Actions from "./Actions";
import Context from "./Context";

import "./dashboard.scss";

const Dashboard = (props) => {
    const { categories } = props;
    const [posts, setPosts] = useState({});
    const dashboard = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    const initializeDashboard = () => {
        adminApi.getDashboardData().then((res) => {
            if (!res.error) {
                setPosts(res.data);
            } else if (res.msg === "Unauthorized") {
                dispatch(adminAction.setToken(""));
            }
        });
    };
    useEffect(() => {
        initializeDashboard();
    }, []);
    return (
        <div className="dashboard">
            <Actions posts={posts} dashboard={dashboard} reloadDashboard={initializeDashboard} />
            <Context categories={categories} reloadDashboard={initializeDashboard} />
        </div>
    );
};

export default Dashboard;
