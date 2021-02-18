import React, { useState } from "react";
import Rectangle from './Rectangle'

function MissingVowels(props)
{
    const [index, setIndex] = useState(-1);
    const handleClick = (i) =>
    {
        if(index < 3)
        {
            setIndex(index+1);
        }
        else
        {
            setIndex(-1);
            props.onClick();
        }
    }

    return (
        <div className="grid grid-rows-3 justify-items-center items-center py-14 lg:py-40 gap-y-4 lg:gap-y-6">
            <div className="w-auto">
                <Rectangle type="vowels">{props.data["category"]}</Rectangle>
            </div>
            
            <div className="w-auto">
                <Rectangle type="answer" hidden={index === -1}>{props.data["clues"][index]}</Rectangle>   
            </div>

                <div className="cursor-pointer">
                    <Rectangle clickBlock={handleClick} type="next">Next</Rectangle>
                </div>
        </div>
    )
}

export default MissingVowels