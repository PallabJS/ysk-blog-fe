import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { adminApi } from "../api";

import Actions from "./Actions";
import Context from "./Context";

import "./dashboard.scss";

const Dashboard = () => {
    const [posts, setPosts] = useState({});

    const dashboard = useSelector((state) => state.dashboard);

    const initializeDashboard = () => {
        adminApi.getDashboardData().then((res) => {
            if (!res.error) {
                setPosts(res.data);
            }
        });
    };
    useEffect(() => {
        initializeDashboard();
    }, []);
    return (
        <div className="dashboard">
            <Actions posts={posts} dashboard={dashboard} reloadDashboard={initializeDashboard} />
            <Context />
        </div>
    );
};

export default Dashboard;
