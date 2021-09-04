import React from "react";
import parse from "html-react-parser";

import "./card.scss";

const Card = (props) => {
    const { title, subtitle, text, meta, onClick } = props;
    return (
        <div className="card_wrapper" onClick={onClick}>
            <div className="card">
                <h3>
                    {title.replace(/-/g, " ").replace(title[0], title[0].toUpperCase())}
                    {meta.views ? <span className="views"> ({meta.views} views)</span> : null}
                </h3>
                <span className="subtitle">&nbsp;- {subtitle}</span>

                <p>{parse(text)}</p>
            </div>
        </div>
    );
};

export default Card;
