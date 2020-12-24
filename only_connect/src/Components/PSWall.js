import React from 'react'
import WallIcon from './WallIcon'
import frog from './../images/frog.png'
import kangaroo from './../images/kangaroo.png'
import elephant from './../images/elephant.png'
import bird from './../images/bird.png'
import koala from './../images/koala.png'
import sloth from './../images/sloth.png'
import {useState} from 'react';

function PSWall(props)
{
    const [hidden, setHidden] = useState(
        {
            1:"",
            2:"",
            3:"",
            4:"",
            5:"",
            6:""
        }
    );
  
    const handleClick = (i) =>
    {
        var temp_hidden = {...hidden};
        temp_hidden[i] = "invisible";
        setHidden(temp_hidden);
        props.onClick();
    };

    const shouldComponentUpdate = (nextProps, nextState) =>
    {
        return false;
    }
    return (
        <div className="flex justify-center items-center h-screen -my-12 sm:-my-0">
            <div className="grid grid-flow-col grid-rows-3 sm:grid-rows-2 lg:grid-rows-2">
                <WallIcon icon={frog} hidden={hidden[1]} id="1" onClick={handleClick}></WallIcon>
                <WallIcon icon={kangaroo} hidden={hidden[2]} id="2" onClick={handleClick}></WallIcon>
                <WallIcon icon={elephant} hidden={hidden[3]} id="3" onClick={handleClick}></WallIcon>
                <WallIcon icon={bird} hidden={hidden[4]} id="4" onClick={handleClick}></WallIcon>
                <WallIcon icon={koala} hidden={hidden[5]} id="5" onClick={handleClick}></WallIcon>
                <WallIcon icon={sloth} hidden={hidden[6]} id="6" onClick={handleClick}></WallIcon>
            </div>
        </div>
    )
}

export default PSWall