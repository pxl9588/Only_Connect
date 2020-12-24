import React, { useState } from "react";
//import socketIOClient from "socket.io-client";
import Rectangle from './Rectangle'

function PSRow(props)
{
    const [count, setCount] = useState(0);

    const handleClick = (i) =>
    {
        setCount(count + 1);
        if(count === final_number + 1)
        {
            props.exitClick(i);
        }
    }

    var final_number = 0;
    if(props.type === "sequence")
    {
        final_number = 2;
    }
    else
    {
        final_number = 3;
    }

    return (
        <div className="grid grid-cols-4 justify-items-center items-center py-40 sm:py-6 lg:py-40 gap-y-10 lg:gap-y-20">
                <Rectangle type="rectangle">{props.row[0]}</Rectangle>
                <Rectangle type="rectangle" hidden={count >= 1 ? "" : "invisible"}>{props.row[1]}</Rectangle>
                <Rectangle type="rectangle" hidden={count >= 2 ? "" : "invisible"}>{props.row[2]}</Rectangle>
                <Rectangle type="rectangle" hidden={count >= final_number ? "" : "invisible"}>{props.type === "sequence" ? count >= (final_number+1) ? props.row[3] : "?" : props.row[3]}</Rectangle>
            <div className="col-span-full w-full justify-items-center px-4 lg:px-20">
                <Rectangle type="answer" hidden={count >= (final_number + 1) ? "" : "invisible"}>{props.row[4]}</Rectangle>
            </div>
            <div className="col-span-4 justify-items-center px-4 lg:px-20 cursor-pointer">
                <Rectangle clickBlock={handleClick} type="answer">Next</Rectangle>
            </div>
        </div>
    )
}

export default PSRow