import React from "react";
import { useState } from "react";

function WallIcon(props) {
    const handleClick = () => {
        props.onClick(props.id);
    };
    return (
        <div className="p-10 cursor-pointer" onClick={handleClick}>
            <img
                className={`h-24 w-24 sm:h-30 sm:w-30 lg:h-auto lg:w-auto ${props.hidden}`}
                src={props.icon}
                alt={props.icon}
            />
        </div>
    );
}

export default WallIcon;
