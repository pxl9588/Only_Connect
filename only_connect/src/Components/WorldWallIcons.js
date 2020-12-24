import React from 'react'
import WallIcon from './WallIcon'
import hedgehog from './../images/hedgehog.png'
import chameleon from './../images/chameleon.png'
import {useState} from 'react';

function WordWallIcons(props)
{
    const [hidden, setHidden] = useState({...props.hidden});
  
    const handleClick = (i) =>
    {
        var temp_hidden = {...hidden};
        temp_hidden[i] = "invisible";
        setHidden(temp_hidden);
        props.onClick();
    };

    return (
        <div className="flex justify-center items-center h-screen -my-12 sm:-my-0">
            <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-40">
                <WallIcon icon={chameleon} hidden={hidden[1]} id="1" onClick={handleClick}></WallIcon>
                <WallIcon icon={hedgehog} hidden={hidden[2]} id="2" onClick={handleClick}></WallIcon>
            </div>
        </div>
    )
}

export default WordWallIcons