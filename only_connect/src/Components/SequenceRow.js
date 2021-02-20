import React, { useState } from "react";
//import socketIOClient from "socket.io-client";
import Rectangle from './Rectangle';
import Timer from './Timer';

function SequenceRow(props)
{
    const [end,setEnd] = useState(0);
    const [points, setPoints] = useState(5);
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

    const endClick = () =>
    {
        if(end === 0)
        {
            setEnd(1);
        }
        if(end === 1)
        {
            setTimerIndex(4);
            var temp = {1:false, 2:false, 3:true,4:false}
            setHidden(temp);
            setPoints(1);
            setEnd(2);
            setCount(final_number);
        }
    }

    const handleClick = (i) =>
    {
        setCount(count + 1);

        if(count < final_number)
        {
            setTimerIndex(timerIndex + 1);
            let temp = {...hidden}
            temp[count] = false;
            setHidden(temp);

            const point_array = [3,2,1]
            setPoints(point_array[count-1]);
        }
        else
        {
            let temp = {...hidden}
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
        <div className="grid justify-items-center items-center py-2 sm:py-2 lg:py-24 gap-y-2 sm:gap-y-4 lg:gap-y-12 xl:gap-y-24">

            <div className={`justify-items-center items-center row-start-1 col-start-${timerIndex}`}>
                <Timer completed={0} max={40} hidden={hidden[4]} finished={end} points={points}/>
            </div>
            
            <div className="row-start-2 justify-items-center items-center">
                <Rectangle type="rectangle">{props.row["clues"][0]}</Rectangle>
            </div>
            <div className="row-start-2 justify-items-center items-center">
                <Rectangle type="rectangle" hidden={hidden[1]}>{props.row["clues"][1]}</Rectangle>
            </div>
            <div className="row-start-2 justify-items-center items-center">
                <Rectangle type="rectangle" hidden={hidden[2]}>{props.row["clues"][2]}</Rectangle>
            </div>
            <div className="row-start-2 justify-items-center items-center">
                <Rectangle type="rectangle" hidden={hidden[2]}>{ count > final_number ? props.row["clues"][3] : "?"}</Rectangle>
            </div>

            <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:px-8 xl:px-24">
                <Rectangle type="answer" hidden={hidden[3]}>{props.row["answer"]}</Rectangle>
            </div>

            <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                <Rectangle clickBlock={handleClick} type="next">Next</Rectangle>
            </div>

            <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                <Rectangle clickBlock={endClick} type="next">End</Rectangle>
            </div>

        </div>
    )
}

export default SequenceRow