import React from 'react'
import WallIcon from './WallIcon'

//TODO: Attribute Freepik for icons, don't want a law suit. But WHere do we put this, Credits?
//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import frog from './../images/frog.png'
import kangaroo from './../images/kangaroo.png'
import elephant from './../images/elephant.png'
import bird from './../images/bird.png'
import koala from './../images/koala.png'
import sloth from './../images/sloth.png'

function PSWall(props)
{ 
    const handleClick = (i) =>
    {
        props.onClick(i);
    };

    return (
        <div className="justify-center items-center h-screen -my-12 sm:-my-0">
            <h2 className='text-5xl mt-20 text-center'>{`${props.turn  ? props.teamOne.name : props.teamTwo.name} Selects`}</h2>
            <div className='flex justify-center items-center -my-12 sm:-my-0'>
                <div className="grid grid-flow-col grid-rows-3 sm:grid-rows-2 lg:grid-rows-2">
                <WallIcon icon={frog} hidden={props.hidden[1] ? "invisible" : ""} id="1" onClick={props.hidden[1]  ? null : handleClick}></WallIcon>
                <WallIcon icon={kangaroo} hidden={props.hidden[2]  ? "invisible" : ""} id="2" onClick={props.hidden[2]  ? null : handleClick}></WallIcon>
                <WallIcon icon={elephant} hidden={props.hidden[3]  ? "invisible" : ""} id="3" onClick={props.hidden[3]  ? null : handleClick}></WallIcon>
                <WallIcon icon={bird} hidden={props.hidden[4]  ? "invisible" : ""} id="4" onClick={props.hidden[4]  ? null : handleClick}></WallIcon>
                <WallIcon icon={koala} hidden={props.hidden[5]  ? "invisible" : ""} id="5" onClick={props.hidden[5]  ? null : handleClick}></WallIcon>
                <WallIcon icon={sloth} hidden={props.hidden[6]  ? "invisible" : ""} id="6" onClick={props.hidden[6]  ? null : handleClick}></WallIcon>
            </div>
            </div>
            
            
        </div>
    );
}

export default PSWall;
