import React from "react";
import parse from "html-react-parser";

import "./card.scss";

const Card = (props) => {
    const { style, title, subtitle, image, text, meta, onClick, animation } = props;
    return (
        <div className="card_wrapper" onClick={onClick} style={style}>
            <div className={"card " + (animation ? "card_animation" : "")}>
                <h3>
                    {title.replace(/-/g, " ").replace(title[0], title[0].toUpperCase())}
                    {meta.views ? <span className="views"> ({meta.views} views)</span> : null}
                </h3>
                {subtitle ? <span className="subtitle">&nbsp;- {subtitle}</span> : null}

                <div className="image_container">
                    <img src={image} alt="" />
                </div>

                <p>{parse(text)}</p>
            </div>
        </div>
    );
};

export default Card;
