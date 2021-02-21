import React, { useState } from "react";
//import socketIOClient from "socket.io-client";
import Clue from "./Clue";
import Timer from "./Timer";
import Rectangle from "./Rectangle";

function ConnectionRow(props)
{
    const [end,setEnd] = useState(0);
    const [points, setPoints] = useState(5);
    const [count, setCount] = useState(1);
    const [timerIndex, setTimerIndex] = useState(1);
    const [hidden, setHidden] = useState({
        1: true,
        2: true,
        3: true,
        4: true,
        5: false,
    });

    var final_number = 4;

    const endClick = () =>
    {
        if(count === final_number + 1)
        {
            return;
        }
        if(end === 0)
        {
            setEnd(1);
        }
        if(end === 1)
        {
            setTimerIndex(4);
            var temp = {1:false, 2:false, 3:false,4:true, 5:false}
            setHidden(temp);
            setPoints(1);
            setEnd(2);
            setCount(final_number);
        }
    }

    const nextClick = (i) =>
    {
        setCount(count + 1);
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

        if (count === final_number + 1) {
            props.exitClick(i);
        }
    };


    const renderSwitch = (admin) => {
        if(admin)
        {
            return (
            <div className="grid justify-items-center items-center py-2 sm:py-2 lg:py-24 gap-y-2 sm:gap-y-4 lg:gap-y-12 xl:gap-y-24">

                <div className={`justify-items-center items-center row-start-1 col-start-${timerIndex}`}>
                    <Timer completed={0} max={40} hidden={hidden[5]} finished={end} points={points}></Timer>
                </div>

                <div className="row-start-2 col-span-1">
                    <Clue>{props.row["clues"][0]}</Clue>
                </div>
                <div className="row-start-2 col-span-1">
                    <Clue hidden={hidden[1]}>{props.row["clues"][1]}</Clue>
                </div>
                <div className="row-start-2 col-span-1">
                    <Clue hidden={hidden[2]}>{props.row["clues"][2]}</Clue>
                </div>
                <div className="row-start-2 col-span-1">
                    <Clue hidden={hidden[3]}>{props.row["clues"][3]}</Clue>
                </div>

                <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:-px-12 xl:px-24">
                    <Rectangle type="answer" hidden={hidden[4]}>{props.row["answer"]}</Rectangle>
                </div>

                <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                    <Rectangle clickBlock={endClick} type="correct">Correct</Rectangle>
                </div>

                <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                    <Rectangle clickBlock={endClick} type="incorrect">Incorrect</Rectangle>
                </div>

            </div>  
            );
        }
        else
        {
            return (
                <div className="grid justify-items-center items-center py-2 sm:py-2 lg:py-24 gap-y-2 sm:gap-y-4 lg:gap-y-12 xl:gap-y-24">
    
                    <div className={`justify-items-center items-center row-start-1 col-start-${timerIndex}`}>
                        <Timer completed={0} max={40} hidden={hidden[5]} finished={end} points={points}></Timer>
                    </div>
    
                    <div className="row-start-2 col-span-1">
                        <Clue>{props.row["clues"][0]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={hidden[1]}>{props.row["clues"][1]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={hidden[2]}>{props.row["clues"][2]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={hidden[3]}>{props.row["clues"][3]}</Clue>
                    </div>
    
                    <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:-px-12 xl:px-24">
                        <Rectangle type="answer" hidden={hidden[4]}>{props.row["answer"]}</Rectangle>
                    </div>
    
                    <div className="row-start-4 col-span-4 justify-items-center px-4 lg:px-20 cursor-pointer">
                        <Rectangle clickBlock={nextClick} type="next">Next</Rectangle>
                    </div>
    
                </div>  
                );
        }
    }

    return (
        <div>{renderSwitch(false)}</div>
    );
}

export default ConnectionRow;
