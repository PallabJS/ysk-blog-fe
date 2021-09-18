import React, { useEffect, useState } from "react";
import "./actions.scss";

import { utils } from "../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { adminApi } from "../api";

import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { dashboardAction } from "../../../redux/reducers/dashboard";
import Nodata from "../../../components/Nodata";
import Modal from "../../../components/modal/Modal";

import { postAction } from "../../../redux/reducers/addpost";

const Actions = (props) => {
    const { posts, dashboard, reloadDashboard } = props;

    const [state, setState] = useState({
        category: dashboard.currentCategory,
        currentList: [],
    });

    const [modal, setModal] = useState({
        active: false,
        data: {},
    });

    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const updateCurrentList = () => {
        let category = state.category || dashboard.currentCategory || Object.keys(posts)[0];

        if (category === "all") {
            let allPosts = [];
            Object.keys(posts).forEach((category) => {
                posts[category].forEach((post) => {
                    allPosts.push(post);
                });
            });
            setState({ ...state, category: category, currentList: allPosts });
        } else {
            setState({ ...state, category: category, currentList: posts[category] });
        }
    };

    const changeCategory = (e) => {
        const value = e.target.value;
        dispatch(dashboardAction.setCurrentCategory(value));
        setState({ ...state, category: value });
    };

    const promptConfirmation = (post) => {
        setModal({ active: true, data: post });
    };

    const handlePostDelete = (postToDelete) => {
        adminApi.deletePost(postToDelete).then((res) => {
            if (!res.error) {
                enqueueSnackbar("Post was deleted successfully", { variant: "success" });
                reloadDashboard();
            } else {
                enqueueSnackbar(res.msg, { variant: "error" });
            }
        });
    };
    const handlePostEdit = (post) => {
        dispatch(postAction.setPost(post));
        setTimeout(() => {
            dispatch(dashboardAction.setPostOnEdit(post));
        }, 100);
    };

    useEffect(() => {
        if (Object.keys(posts).length > 0) {
            updateCurrentList();
        }
    }, [state.category, posts]);

    return (
        <>
            <Modal
                active={modal.active}
                setModal={setModal}
                data={modal.data}
                title="Delete confirmation"
                text={` Do you want to proceed deleting `}
                postText={modal.data.title + "?"}
                confirmHandler={handlePostDelete}
            />
            <div className="dashboard_actions">
                <h2 className="header">DASHBOARD</h2>
                <div className="main">
                    <div className="category_selector">
                        <div
                            className="create_post_button"
                            onClick={() => {
                                window.location.href = "/admin/add_post";
                            }}
                        >
                            Create a new post
                        </div>
                        <select value={state.category} onChange={changeCategory}>
                            <option value={"all"}>All</option>;
                            {Object.keys(posts).map((category, index) => {
                                return (
                                    <option key={index} value={category}>
                                        {utils.parseTitle(category)}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="posts_maps">
                        {state.currentList.map((post, index) => {
                            return (
                                <div key={index} className="post">
                                    <div className="content">
                                        <h4 className="header">
                                            {index + 1}. {post.title.slice(0, 30)} <br />[{post.meta.category}]
                                        </h4>
                                        <div className="date">Date: {new Date(post.date).toDateString()}</div>
                                    </div>
                                    <div className="controls">
                                        <div className="icon_delete" onClick={() => promptConfirmation(post)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </div>
                                        <div className="icon_edit" onClick={() => handlePostEdit(post)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {state.currentList.length === 0 ? <Nodata text="No data to display" /> : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Actions;
