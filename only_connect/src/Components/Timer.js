import React, { useState, useEffect } from "react";

function Timer(props)
{
    const [completed, setCompleted] = useState(0);

    useEffect(() => {
        const interval = setInterval(() =>
        {
            setCompleted(oldVal => {
                const newVal = oldVal + 1;
                if(newVal === 40 || props.hidden)
                {
                    clearInterval(interval)
                }
                return newVal;
            });
        }, 1000);
        return function cleanup() {
            clearInterval(interval);
        }
      }, [props.hidden]);

    const width = "w-16 sm:w-36 lg:w-80";
    const height = "h-12 lg:h-12";
    const text_size = "text-1xl sm:text-4xl lg:text-4xl";
    const bg_color = "bg-blue-700";
    const fill_color = "bg-blue-900";

    const fill_width = `w-${completed}/40`;

    

  return (
    <div className={`${width} ${height} ${bg_color} shadow-2xl rounded-md ${props.hidden ? "invisible" : ""}`}>
        <div className={`${fill_width} ${height} ${fill_color} shadow-2xl rounded-md ease-in${props.hidden}`}>
            <span className={`${text_size} fixed px-24 text-white`}>{props.points} {props.points === 1 ? "Point" : "Points"} </span>
        </div>
        </div>
    )
}
export default Timer