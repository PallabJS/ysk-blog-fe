import React, { useEffect, useState } from "react";

import { faAdjust } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./accessibility.scss";
import { useDispatch, useSelector } from "react-redux";
import { data } from "./data";
import { appAction } from "../../redux/reducers/app";

const Accessibility = () => {
    const app = useSelector((state) => state.appState);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        showOptions: false,
        themeBtnText: app.accessibility.theme.toUpperCase(),
    });

    const loadAccessibility = () => {
        // Load theme
        if (app.accessibility.theme == "light") {
            document.body.style.backgroundColor = data.theme.light;
            console.log("setting light");
        } else {
            document.body.style.backgroundColor = data.theme.dark;
            console.log("setting dark");
        }
    };

    const changeButtonText = () => {
        let text = "Switch to ";
        app.accessibility.theme === "light" ? (text += "DARK") : (text += "LIGHT");
        setState({
            ...state,
            themeBtnText: text,
        });
    };

    const switchTheme = () => {
        if (app.accessibility.theme === "light") dispatch(appAction.setTheme("dark"));
        else dispatch(appAction.setTheme("light"));
        changeButtonText();
    };

    useEffect(() => {
        loadAccessibility();

        return () => {};
    }, [app.accessibility.theme]);

    useEffect(() => {
        document.getElementById("accessibility_options").classList.toggle("access_option_show");
    }, [state.showOptions]);

    return (
        <>
            <div id="accessibility_box" className="accessibility">
                <div id="accessibility_options" className="access_options access_option_show">
                    <h3 className="header">YSK - Accessibility</h3>
                    <div className="theme_buttons">
                        <label>Current Theme </label>
                        <button
                            className="theme_switcher"
                            onMouseOverCapture={changeButtonText}
                            onMouseLeave={() => {
                                setState({ ...state, themeBtnText: app.accessibility.theme.toUpperCase() });
                            }}
                            onClick={switchTheme}
                        >
                            {state.themeBtnText}
                        </button>
                    </div>
                </div>
                <div
                    id="accessibility_toggler"
                    className="access_button"
                    style={
                        (state.showOptions && {
                            fontSize: "45px",
                            width: "100px",
                            transform: "rotate(-90deg)",
                        }) ||
                        {}
                    }
                    onClick={(e) => {
                        setState({ ...state, showOptions: !state.showOptions });
                        e.stopPropagation();
                    }}
                >
                    <FontAwesomeIcon icon={faAdjust} color="rgb(40, 150, 120)" />
                </div>
            </div>
        </>
    );
};

export default Accessibility;
