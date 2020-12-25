import React, { useState, useEffect } from "react";
//import socketIOClient from "socket.io-client";
import Rectangle from './Rectangle';
import Timer from './Timer';

function SequenceRow(props)
{
    const [count, setCount] = useState(1);
    const [timerIndex, setTimerIndex] = useState(1);
    const [hidden, setHidden] = useState(
        {
            1:true,
            2:true,
            3:true,
            4:false,
        }
    )

    var final_number = 3;

    const handleClick = (i) =>
    {
        setCount(count + 1);
        console.log(count);

        if(count < final_number)
        {
            setTimerIndex(timerIndex + 1);
            var temp = {...hidden}
            temp[count] = false;
            setHidden(temp);
        }
        else
        {
            var temp = {...hidden}
            temp[3] = false;
            temp[4] = true;
            setHidden(temp);
            setTimerIndex(1);
        }

        if(count === final_number + 1)
        {
            props.exitClick(i);
        }
    }

    return (
        <div className="grid justify-items-center items-center py-2 sm:py-6 lg:py-24 gap-y-10 lg:gap-y-12">

            <div className={`justify-items-center items-center row-start-1 col-start-${timerIndex} px-36`}>
                <Timer completed={0} hidden={hidden[4]}></Timer>
            </div>

            <div className="row-start-2 grid-cols-4 col-span-4">
                <div className="grid grid-cols-4 justify-items-center items-center gap-x-20">
                    <Rectangle type="rectangle">{props.row[0]}</Rectangle>
                    <Rectangle type="rectangle" hidden={hidden[1]}>{props.row[1]}</Rectangle>
                    <Rectangle type="rectangle" hidden={hidden[2]}>{props.row[2]}</Rectangle>
                    <Rectangle type="rectangle" hidden={hidden[2]}>{ count > final_number ? props.row[3] : "?"}</Rectangle>
                </div>
            </div>

            <div className="row-start-3 col-span-4 w-full justify-items-center mx-20 lg:px-20">
                <Rectangle type="answer" hidden={hidden[3]}>{props.row[4]}</Rectangle>
            </div>

            <div className="row-start-4 col-span-4 justify-items-center px-4 lg:px-20 cursor-pointer">
                <Rectangle clickBlock={handleClick} type="answer">Next</Rectangle>
            </div>

        </div>
    )
}

export default SequenceRow