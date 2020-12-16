import { PreviousMap } from "postcss";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Rectangle from './Rectangle'

function PSRow(props)
{
    const ENDPOINT = "http://localhost:4001";
    const [count, setCount] = useState(0);
    const hidden_dictionary = {};
    var final_number = 0;

    for (var i = 1; i < 5; i++) {
        hidden_dictionary[i] = "hidden";
    }

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setCount(data);
            });
    }, []);

    if(props.type === "sequence")
    {
        final_number = 2;
    }
    else
    {
        final_number = 3;
    }

    return (
        <div className="grid grid-cols-4 justify-items-center items-center py-14 lg:py-40 gap-y-10 lg:gap-y-20">
                <Rectangle type="rectangle">A</Rectangle>
                <Rectangle type="rectangle" hidden={count >= 1 ? "" : "hidden"}>B</Rectangle>
                <Rectangle type="rectangle" hidden={count >= 2 ? "" : "hidden"}>C</Rectangle>
                <Rectangle type="rectangle" hidden={count >= final_number ? "" : "hidden"}>?</Rectangle>
            <div className="col-span-full w-full justify-items-center px-4 lg:px-20">
                <Rectangle type="answer" hidden={count >= (final_number + 1) ? "" : "hidden"}>Alphabet</Rectangle>
            </div>
            <div className="col-span-4 justify-items-center px-4 lg:px-20 cursor-pointer">
                <Rectangle customClickEvent={() =>{setCount(count + 1); hidden_dictionary[count] = "";}} type="answer">Next</Rectangle>
            </div>
        </div>
    )
}

export default PSRow