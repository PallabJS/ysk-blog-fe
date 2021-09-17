import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Textfield } from "./components";

import { postAction } from "../../../redux/reducers/addpost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

import { adminApi } from "../api";
import { useSnackbar } from "notistack";

import { utils } from "../../../utils";

import "./addpost.scss";

const Addpost = (props) => {
    const { categories, style = {}, disableButtons = false } = props;

    const postData = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const [post, setPost] = useState({
        title: "",
        text: "",
        image: "",
        subtitle: "",
        description: "",
        body: {
            intro: {
                title: "",
                text: "",
                image: "",
            },
            list: [],
        },
        climax: {
            title: "",
            text: "",
            image: "",
        },
        meta: {
            category: "",
        },
    });

    const updatePost = (parent, type, e, listIndex = null) => {
        let value = e.target.value;
        dispatch(postAction.updatePost(parent, type, value, listIndex));
    };

    const updateMetadata = (e) => {
        let type = e.target.getAttribute("type");
        let value = e.target.value;
        dispatch(postAction.updateMeta(type, value));
    };

    const addNewBodyListItem = () => {
        dispatch(
            postAction.addListItem({
                title: "",
                image: "",
                text: "",
            })
        );
    };

    const popNewBodyListItem = () => {
        dispatch(postAction.popListItem());
        let newList = [...post.body.list];
        newList.pop();
        setPost({
            ...post,
            body: {
                ...post.body,
                list: newList,
            },
        });
    };

    const emptyBodyListItem = () => {
        dispatch(postAction.emptyList());
        setPost({
            ...post,
            body: {
                ...post.body,
                list: [],
            },
        });
    };

    const composeUIFields = () => {
        let template = {
            title: (
                <Textfield
                    value={utils.parseTitle(postData.title)}
                    parent="post"
                    type="title"
                    className="title"
                    onChange={updatePost}
                />
            ),
            subtitle: (
                <Textfield
                    value={postData.subtitle}
                    parent="post"
                    type="subtitle"
                    className="subtitle"
                    onChange={updatePost}
                />
            ),
            description: (
                <Textfield
                    value={postData.description}
                    parent="post"
                    type="description"
                    className="description"
                    onChange={updatePost}
                />
            ),
            text: (
                <Textfield value={postData.text} parent={"post"} type="text" className="text" onChange={updatePost} />
            ),
            image: (
                <Textfield
                    value={postData.image}
                    parent={"post"}
                    type="image"
                    className="image"
                    onChange={updatePost}
                />
            ),
            body: {
                intro: {
                    title: (
                        <Textfield
                            value={postData.body.intro.title}
                            parent="body/intro"
                            type="title"
                            className="title"
                            onChange={updatePost}
                        />
                    ),
                    text: (
                        <Textfield
                            value={postData.body.intro.text}
                            parent="body/intro"
                            type="text"
                            className="text"
                            onChange={updatePost}
                        />
                    ),
                    image: (
                        <Textfield
                            value={postData.body.intro.image}
                            parent="body/intro"
                            type="image"
                            className="image"
                            onChange={updatePost}
                        />
                    ),
                },
                list: postData.body.list.map((section, index) => {
                    return {
                        title: (
                            <Textfield
                                value={section.title}
                                parent="body/list"
                                type="title"
                                index={index}
                                className="title"
                                onChange={updatePost}
                            />
                        ),
                        text: (
                            <Textfield
                                value={section.text}
                                parent={"body/list"}
                                type="text"
                                index={index}
                                className="text"
                                onChange={updatePost}
                            />
                        ),
                        image: (
                            <Textfield
                                value={section.image}
                                parent={"body/list"}
                                type="image"
                                index={index}
                                className="image"
                                onChange={updatePost}
                            />
                        ),
                    };
                }),
            },
            climax: {
                title: (
                    <Textfield
                        value={postData.climax.title}
                        parent="climax"
                        type="title"
                        className="title"
                        onChange={updatePost}
                    />
                ),
                text: (
                    <Textfield
                        value={postData.climax.text}
                        parent="climax"
                        type="text"
                        className="text"
                        onChange={updatePost}
                    />
                ),
                image: (
                    <Textfield
                        value={postData.climax.image}
                        parent="climax"
                        type="image"
                        className="image"
                        onChange={updatePost}
                    />
                ),
            },
        };
        setPost(template);
    };

    const handleCreatePost = () => {
        adminApi.createPost(postData).then((res) => {
            if (!res.error) {
                enqueueSnackbar("Post was added successfully", { variant: "success" });
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 3000);
            } else {
                enqueueSnackbar(res.msg, { variant: "error" });
            }
        });
    };

    const handleCancel = () => {
        let affirm = window.confirm("Are you sure you are not posting now?");
        if (affirm) {
            enqueueSnackbar("Create post was cancelled", { variant: "info" });
            setTimeout(() => {
                window.location.href = "/admin";
            }, 2000);
        }
    };

    useEffect(() => {
        composeUIFields();
    }, [postData]);

    return (
        <div className="addpost_wrapper" style={{ ...style }}>
            <header> Let's Create a New Fantastic Post</header>
            <div className="metadata">
                <div className="category_select">
                    <label>Select a category</label>
                    <select type="category" value={postData.meta.category} onChange={updateMetadata}>
                        {categories.map((category, index) => {
                            return (
                                <option key={index} value={category}>
                                    {utils.parseTitle(category)}
                                </option>
                            );
                        })}
                    </select>
                    <button
                        className="resetall_button"
                        onClick={() => {
                            dispatch(postAction.resetPost());
                        }}
                    >
                        Clear all
                    </button>
                </div>
            </div>
            <div className="post_title_section">
                <h3 className="header">POST TITLE SECTION</h3>
                <div className="content">
                    {post.title}
                    {post.subtitle}
                    {post.description}
                    {post.text}
                    {post.image}
                </div>
            </div>
            <div className="post_body">
                <h3 className="header">POST BODY SECTION</h3>
                <div className="post_body_intro">
                    <h3 className="header">BODY INTRO</h3>
                    <div className="content">
                        {post.body.intro.title}
                        {post.body.intro.text}
                        {post.body.intro.image}
                    </div>
                </div>
                <div className="post_body_list">
                    <h3 className="header">BODY LIST</h3>
                    {post.body.list.length === 0 ? (
                        <div>
                            <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Empty body list</h1>
                            <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                                Hit the &nbsp;
                                <q>
                                    <b> + </b>
                                </q>
                                &nbsp; button
                            </p>
                        </div>
                    ) : null}

                    {post.body.list.map((section, index) => {
                        return (
                            <div className="post_body_list_item" key={index}>
                                <h3 className="header_list_item"> ITEM {index + 1}</h3>
                                <div className="content">
                                    {section.title}
                                    {section.text}
                                    {section.image}
                                </div>
                            </div>
                        );
                    })}

                    <div className="icons">
                        <span className="icon_wrapper" onClick={addNewBodyListItem}>
                            <span className="icon">
                                <FontAwesomeIcon className="add_icon" icon={faPlusCircle} size="2x" />
                            </span>
                            <label>Add</label>
                        </span>
                        <span className="icon_wrapper" onClick={popNewBodyListItem}>
                            <span className="icon">
                                <FontAwesomeIcon className="pop_icon" icon={faTrash} size="2x" />
                            </span>
                            <label>Pop</label>
                        </span>
                        <span className="icon_wrapper" onClick={emptyBodyListItem}>
                            <span className="icon">
                                <FontAwesomeIcon className="clean_icon" icon={faBan} size="2x" />
                            </span>
                            <label>Clean all</label>
                        </span>
                    </div>
                </div>

                <div className="body_list"></div>

                <div className="post_body_list"></div>
            </div>
            <div className="post_climax">
                <h3 className="header">POST CLIMAX</h3>
                <div className="content">
                    {post.climax.title}
                    {post.climax.text}
                    {post.climax.image}
                </div>
            </div>

            {disableButtons ? null : (
                <div className="controls">
                    <input type="submit" value="Create" className="submit" onClick={handleCreatePost} />
                    <input
                        type="button"
                        value="Preview"
                        className="preview"
                        onClick={() => {
                            window.location.href = "/admin/preview_post";
                        }}
                    />
                    <input type="button" value="Cancel" className="cancel" onClick={handleCancel} />
                </div>
            )}
        </div>
    );
};

export default Addpost;
