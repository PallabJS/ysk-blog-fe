import React, { useEffect, useRef, useState } from "react";

import "./modal.scss";

const types = ["alert", "confirm", "prompt"];

const Modal = (props) => {
    const {
        className,
        style,
        active,
        data,
        setModal,
        title,
        text,
        postText,
        type = "confirm",
        promptValue,
        setPromptValue,
        confirmHandler,
    } = props;

    const modal = useRef();

    const [error, setError] = useState("");

    const handleConfirm = async (action) => {
        if (action === "confirm") {
            if (type === "confirm") {
                confirmHandler(data);
                setTimeout(() => {
                    setModal({ active: false, data: {} });
                }, 300);
            } else if (type === "prompt") {
                let res = await confirmHandler(data);
                if (res.success) {
                    setTimeout(() => {
                        setModal({ active: false, data: {} });
                    }, 300);
                    modal.current.classList.remove("modal_anim");
                } else {
                    setError(res.msg);
                }
            } else {
                setModal({ active: false, data: {} });
                modal.current.classList.remove("modal_anim");
            }
        } else {
            setTimeout(() => {
                setModal({ active: false, data: {} });
            }, 300);
        }
    };

    useEffect(() => {
        if (active && modal.current) {
            modal.current.classList.add("modal_anim");
        }
    }, [active]);

    return (
        <React.Fragment>
            {active ? (
                <div
                    ref={modal}
                    className={`modal ${className}`}
                    style={{
                        ...style,
                    }}
                >
                    <p className="error_text">{error}</p>
                    {type === "confirm" || type === "alert" ? (
                        <>
                            <h2 className="title">{title}</h2>
                            <p className="text">
                                {text}
                                <b>{postText}</b>
                            </p>
                        </>
                    ) : null}

                    {type === "prompt" ? (
                        <>
                            <div className="prompt_text">{text}</div>
                            <input
                                className="prompt_input"
                                type="password"
                                value={promptValue}
                                onChange={(e) => {
                                    setPromptValue(e.target.value);
                                }}
                            />
                        </>
                    ) : null}

                    <div className="action_buttons">
                        <button className="confirm" onClick={() => handleConfirm("confirm")}>
                            CONFIRM
                        </button>
                        <button className="cancel" onClick={() => handleConfirm("cancel")}>
                            CANCEL
                        </button>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    );
};

export default Modal;
