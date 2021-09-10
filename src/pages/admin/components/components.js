import React, { useEffect, useRef, useState } from "react";
import { utils } from "../../../utils";

export const Textfield = (props) => {
    const { className, value, parent, type, index, style = {}, onChange } = props;
    const textArea = useRef();

    const handleTextareaHeight = (e) => {
        let textArea = e.target;
        let letterCount = textArea.value.length;
        let incrmentalHeight = (letterCount / 82) * 20;

        if ((e.ctrlKey && e.key == "v") || e.type === "focus") {
            incrementHeight(textArea);
        } else {
            if (parseInt(incrmentalHeight) % 20 === 0) {
                incrementHeight(textArea);
            }
        }
    };

    const incrementHeight = (textArea) => {
        let letterCount = textArea.value.length;
        let incrmentalHeight = (letterCount / 82) * 20;
        textArea.style.height = utils.pixelize(98 + incrmentalHeight);
    };

    useEffect(() => {
        if (textArea.current) {
            incrementHeight(textArea.current);
            textArea.current.addEventListener("keyup", handleTextareaHeight);
        }
        return () => {
            try {
                textArea.current.removeEventListener("keyup", handleTextareaHeight);
            } catch (e) {}
        };
    }, []);
    return (
        <>
            {type === "text" ? (
                <textarea
                    ref={textArea}
                    className={className}
                    placeholder={`Add a ${type}`}
                    style={{
                        width: "100%",
                        height: "100px",
                        ...style,
                    }}
                    value={value}
                    onChange={(e) => onChange(parent, type, e, index)}
                    onFocus={(e) => handleTextareaHeight(e)}
                />
            ) : (
                <input
                    type="text"
                    className={className}
                    placeholder={`Add a ${type}`}
                    style={{ ...style, width: "100%" }}
                    value={value}
                    onChange={(e) => onChange(parent, type, e, index)}
                />
            )}
        </>
    );
};

// export const Postsection = (props) => {
//     const { className, style = {}, post, setPost } = props;

//     const [state, setState] = useState("");
//     return (
//         <input
//             type="text"
//             placeholder={title ? "" : "Type your title"}
//             value={title}
//             className={className}
//             style={style}
//             onChange={(e) => {
//                 setTitle(e.target.value);
//             }}
//         />
//     );
// };
