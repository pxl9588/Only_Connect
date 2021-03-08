import React from "react";

function Timer(props)
{
    var width = "w-16 sm:w-36 md:w-48 lg:w-56 xl:w-72";
    const height = "h-6 sm:h-6 lg:h-12";
    const text_size = "text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl sm:px-8 md:px-12 lg:px-16 xl:px-20";

    const fill_width = `w-${props.completed}/${props.max}`;

    if(props.type === "wall")
    {
        width = "w-full";
    }
    

  return (
    <div className={`select-none ${width} ${height} ${props.color} rounded-md ${props.hidden ? "invisible" : ""}`}>
        <div className={`${fill_width} ${height} ${props.fill_color} shadow-3xl rounded-md ease-in ${props.hidden}`}>
            <span className={`${text_size} fixed text-dark-shade`}>{props.points} {props.points ? props.points === 1 ? "Point" : "Points" : ""} </span>
        </div>
        </div>
    )
}
export default Timer