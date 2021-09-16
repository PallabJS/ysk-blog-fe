import React from "react";
import parse from "html-react-parser";

import "./card.scss";
import { utils } from "../../utils";
import { useSelector } from "react-redux";

const Card = (props) => {
    const app = useSelector((state) => state.appState);

    const { style, title, subtitle, image, text, meta, onClick, animation, key } = props;
    return (
        <div key={key} className="card_wrapper" onClick={onClick} style={style}>
            <div className={"card " + (animation ? "card_animation" : "")}>
                {!app.isMobile && (
                    <div className="image_container">
                        <img src={image} alt="" />
                    </div>
                )}
                <div className="card_content">
                    <h3>
                        {title.replace(/-/g, " ").replace(title[0], title[0].toUpperCase())}
                        {!isNaN(meta.views) ? <span className="views"> ({meta.views} views)</span> : null}
                    </h3>
                    {subtitle ? <span className="subtitle">&nbsp;- {subtitle}</span> : null}

                    <p>{utils.sliceParsedJSX(parse(text), 100)}. . .</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
