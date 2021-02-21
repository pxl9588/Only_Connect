import React from "react";
import dot from "../images/orange-dot.png";

export default function Lives(props) {
    const lives = [];
    for (let i = 0; i < props.lives; i++) {
        lives.push(
            <img
                style={{ left: `${15 + 10 * i}%`, position: "relative" }}
                className={`h-12 w-12 pointer-events-none`}
                src={dot}
                alt={dot}
            ></img>,
        );
    }

    return <div className="flex">{lives}</div>;
}
