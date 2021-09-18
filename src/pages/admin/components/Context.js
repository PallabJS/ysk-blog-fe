import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardAction } from "../../../redux/reducers/dashboard";
import { adminApi } from "../api";
import Addpost from "./Addpost";

import { useSnackbar } from "notistack";
import "./context.scss";

const Context = (props) => {
    const { categories, reloadDashboard } = props;
    const editingPost = useSelector((state) => state.dashboard.postOnEdit);
    const updatingPost = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const handleAction = (action) => {
        if (action === "confirm") {
            adminApi.editPost(updatingPost).then((res) => {
                if (!res.error) {
                    enqueueSnackbar(res.msg, { variant: "success" });
                    dispatch(dashboardAction.setPostOnEdit(null));
                    reloadDashboard();
                }
            });
        }
        if (action === "cancel") {
            dispatch(dashboardAction.setPostOnEdit(null));
        }
    };

    return (
        <div className="dashboard_context">
            <h2 className="header">CURRENT CONTEXT</h2>
            <div className="main">
                {editingPost ? (
                    <div className="editpost">
                        <div className="action_buttons">
                            <button className="confirm" onClick={() => handleAction("confirm")}>
                                Submit
                            </button>
                            <button className="cancel" onClick={() => handleAction("cancel")}>
                                Cancel
                            </button>
                        </div>
                        <Addpost style={{ width: "100%" }} categories={categories} disableButtons={true} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Context;
