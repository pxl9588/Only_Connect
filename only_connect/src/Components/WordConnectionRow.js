import React, { useState, /*useEffect*/ } from "react";
//import socketIOClient from "socket.io-client";
import Rectangle from './Rectangle';
import Timer from './Timer';

function WordConnectionRow(props)
{
    const key = props.row["answer"];
    const [end,setEnd] = useState(0);
    const [points, setPoints] = useState(1);
    const [count, setCount] = useState(1);
    const [timerIndex, setTimerIndex] = useState(4);
    const [hidden, setHidden] = useState(true);

    /*useEffect(() =>
        {
            setHidden(true);
        }
    , []);*/

    const handleClick = (i) =>
    {
        if(!hidden)
        {
            //TODO: Should this not be needed if useEffect is used properly?
            setHidden(true);
            props.exitClick(i);
        }
        else
        {
            setHidden(false);
        }

        /*setCount(count + 1);
        
        var temp = {...hidden}

        if(count < final_number)
        {
            const point_array = [3,2,1]
            setTimerIndex(timerIndex + 1);
            temp[count] = false;
            setHidden(temp);
            setPoints(point_array[count-1]);
        }
        
        else
        {
            temp[4] = false;
            temp[5] = true;
            setHidden(temp);
            setTimerIndex(1);
        }

        if(count === final_number + 1)
        {
            props.exitClick(i);
        }*/
    }

    return (
        <div className="grid justify-items-center items-center py-2 sm:py-2 lg:py-24 gap-y-2 sm:gap-y-4 lg:gap-y-12 xl:gap-y-24">

            <div className={`justify-items-center items-center row-start-1 col-start-${timerIndex}`}>
                <Timer completed={0} max={5} hidden={!hidden} finished={end} points={points}></Timer>
            </div>

            <div className="row-start-2 col-span-1">
                <Rectangle type="rectangle" color={props.color}>{props.row["clues"][0]}</Rectangle>
            </div>
            <div className="row-start-2 col-span-1">
                <Rectangle type="rectangle" color={props.color}>{props.row["clues"][1]}</Rectangle>
            </div>
            <div className="row-start-2 col-span-1">
                <Rectangle type="rectangle" color={props.color}>{props.row["clues"][2]}</Rectangle>
            </div>
            <div className="row-start-2 col-span-1">
                <Rectangle type="rectangle" color={props.color}>{props.row["clues"][3]}</Rectangle>
            </div>

            <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:px-12 xl:px-24">
                <Rectangle type="answer" hidden={hidden}>{key}</Rectangle>
            </div>

            <div className="row-start-4 col-span-4 justify-items-center px-4 lg:px-20 cursor-pointer">
                <Rectangle clickBlock={handleClick} type="next">Next</Rectangle>
            </div>
        </div>
    )
}

export default WordConnectionRow