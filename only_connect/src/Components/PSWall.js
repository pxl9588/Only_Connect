import React from 'react'
import WallIcon from './WallIcon'

//TODO: Attribute Freepik for icons, don't want a law suit. But WHere do we put this, Credits?
//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import frog_bw from './../images/black_and_white/frog.png'
import frog_c from './../images/colored/frog.png'
import pig_bw from './../images/black_and_white/pig.png'
import pig_c from './../images/colored/pig.png'
import elephant_bw from './../images/black_and_white/elephant.png'
import elephant_c from './../images/colored/elephant.png'
import bird_bw from './../images/black_and_white/bird.png'
import bird_c from './../images/colored/bird.png'
import koala_bw from './../images/black_and_white/koala.png'
import koala_c from './../images/colored/koala.png'
import sloth_bw from './../images/black_and_white/sloth.png'
import sloth_c from './../images/colored/sloth.png'

function PSWall(props)
{ 
    const handleClick = (i) =>
    {
        if(props.selfTeam === props.turn)
        {
            props.onClick(i);
        }
    };

    return (
        <div className="justify-center items-center my-2">
            <h2 className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-center'>{`${props.turn  ? props.teamOne.name : props.teamTwo.name} Selects`}</h2>
            <div className='flex justify-center items-center'>
                <div className="grid grid-flow-col grid-rows-3 sm:grid-rows-2">
                    <WallIcon icon={props.hidden[1] ? frog_c : frog_bw} hidden={props.hidden[1]}  id="1" onClick={props.hidden[1]  ? null : handleClick}></WallIcon>
                    <WallIcon icon={props.hidden[4] ? bird_c : bird_bw} hidden={props.hidden[4]} id="4" onClick={props.hidden[4]  ? null : handleClick}></WallIcon>
                    <WallIcon icon={props.hidden[2] ? pig_c : pig_bw} hidden={props.hidden[2]} id="2" onClick={props.hidden[2]  ? null : handleClick}></WallIcon>
                    <WallIcon icon={props.hidden[5] ? elephant_c : elephant_bw} hidden={props.hidden[5]} id="5" onClick={props.hidden[5]  ? null : handleClick}></WallIcon>
                    <WallIcon icon={props.hidden[3] ? koala_c : koala_bw} hidden={props.hidden[3]} id="3" onClick={props.hidden[3]  ? null : handleClick}></WallIcon>
                    <WallIcon icon={props.hidden[6] ? sloth_c : sloth_bw} hidden={props.hidden[6]} id="6" onClick={props.hidden[6]  ? null : handleClick}></WallIcon>
                </div>
            </div>
        </div>
    );
}

export default PSWall;
