import React, { useEffect, useRef } from "react";

import "./modal.scss";

const types = ["alert", "confirm", "prompt"];

const Modal = (props) => {
    const { className, style, active, data, setModal, title, text, postText, type, confirmHandler } = props;

    const modal = useRef();

    const handleConfirm = (action) => {
        if (action === "confirm") {
            confirmHandler(data);
        }

        setTimeout(() => {
            setModal({ active: false, data: {} });
        }, 300);

        modal.current.classList.remove("modal_anim");
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
                    <h2 className="title">{title}</h2>
                    <p className="text">
                        {text}
                        <b>{postText}</b>
                    </p>

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
