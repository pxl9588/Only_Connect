import React, { useState, useEffect } from "react";

function Timer(props)
{
    const [completed, setCompleted] = useState(0);



    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            setCompleted(oldVal => {
                const newVal = oldVal + 1;
                if(newVal === props.max || props.hidden || props.finished)
                {
                    if(props.finished === 2)
                    {
                        setCompleted(props.max);
                    }

                    clearInterval(interval)
                }
                return newVal;
            });
        }, 1000);
        return function cleanup() {
            clearInterval(interval);
        }
      },
    [props.hidden, props.max, props.finished]);

    var width = "w-full";
    const height = "h-6 sm:h-6 lg:h-12";
    const text_size = "text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl sm:px-8 md:px-12 lg:px-16 xl:px-20";
    const bg_color = "bg-blue-700";
    const fill_color = "bg-blue-900";

    const fill_width = `w-${completed}/${props.max}`;

    if(props.type === "wall")
    {
        width = "w-full";
    }
    

  return (
    <div className={`${width} ${height} ${bg_color} shadow-2xl rounded-md ${props.hidden ? "invisible" : ""}`}>
        <div className={`${fill_width} ${height} ${fill_color} shadow-2xl rounded-md ease-in ${props.hidden}`}>
            <span className={`${text_size} fixed text-white`}>{props.points} {props.points ? props.points === 1 ? "Point" : "Points" : ""} </span>
        </div>
        </div>
    )
}
export default Timer