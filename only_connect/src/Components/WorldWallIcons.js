import React from 'react'
import WallIcon from './WallIcon'
import hedgehog from './../images/hedgehog.png'
import chameleon from './../images/chameleon.png'

function WordWallIcons(props)
{ 
    const handleClick = (i) =>
    {
        props.onClick(i);
    };

    return (
        <div className="flex justify-center items-center h-screen -my-12 sm:-my-0">
            <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-40">
                <WallIcon icon={chameleon} hidden={props.hidden[1] ? "invisible" : ""} id="1" onClick={props.hidden[1]  ? null : handleClick}></WallIcon>
                <WallIcon icon={hedgehog} hidden={props.hidden[2] ? "invisible" : ""} id="1" onClick={props.hidden[2]  ? null : handleClick}></WallIcon>
            </div>
        </div>
    )
}

export default WordWallIcons