import React from 'react'
import WallIcon from './WallIcon'
import hedgehog_bw from './../images/black_and_white/hedgehog.png'
import hedgehog_c from './../images/colored/hedgehog.png'
import chameleon_bw from './../images/black_and_white/chameleon.png'
import chameleon_c from './../images/colored/chameleon.png'

function WordWallIcons(props)
{ 
    const handleClick = (i) =>
    {
        const debug = true;
        if(debug)
        {
            console.log(props.selfTeam);
            console.log(props.turn);
        }
        if(props.selfTeam === props.turn)
        {
            props.onClick(i);
        }
    };

    return (
        <div className="justify-center items-center h-screen -my-12 sm:-my-0">
            <h2 className='text-3xl sm:text-3xl md:text-4xl my-10 sm:my-0 md:my-12 text-center'>{`${props.turn  ? props.teamOne.name : props.teamTwo.name} Selects`}</h2>
            <div className='flex justify-center items-center -my-12 sm:-my-0'>
                <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-40">
                    <WallIcon icon={props.hidden[1] ? chameleon_c : chameleon_bw} hidden={props.hidden[1]} id="1" onClick={props.hidden[1]  ? null : handleClick}></WallIcon>
                    <WallIcon icon={props.hidden[2] ? hedgehog_c : hedgehog_bw} hidden={props.hidden[2]} id="2" onClick={props.hidden[2]  ? null : handleClick}></WallIcon>
                </div>
            </div>
        </div>
    )
}

export default WordWallIcons