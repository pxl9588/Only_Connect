import React from "react";
import dot from "../images/orange-dot.png";

export default function Lives(props) {
    return (
        <div style={{ display: "flex" }}>
            {props.lives > 0 ? (
                <img
                    style={{ left: "15%", position: "relative" }}
                    className={`h-12 w-12 pointer-events-none`}
                    src={dot}
                    alt={dot}
                ></img>
            ) : (
                ""
            )}
            {props.lives > 1 ? (
                <img
                    style={{ left: "25%", position: "relative" }}
                    className={`h-12 w-12 pointer-events-none`}
                    src={dot}
                    alt={dot}
                ></img>
            ) : (
                ""
            )}
            {props.lives > 2 ? (
                <img
                    style={{ left: "35%", position: "relative" }}
                    className={`h-12 w-12 pointer-events-none`}
                    src={dot}
                    alt={dot}
                ></img>
            ) : (
                ""
            )}
        </div>
    );
}
