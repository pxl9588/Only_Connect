import Crocodile from '../images/black_and_white/crocodile.png'
import Octopus from '../images/black_and_white/octopus.png'
import Score from "./Score";
import { useEffect } from 'react';

function ScoreWall(props)
{ 
    useEffect(()=>{console.log(props.play1Score);});

    return (
        <div onClick={props.exit} className="flex justify-center items-center h-screen -my-12 sm:-my-0">
            <div className="grid grid-flow-col grid-rows-1">
                <Score icon={Crocodile} score={props.play1Score}></Score>
                <Score icon={Octopus} score={props.play2Score}></Score>
            </div>
        </div>
    );
}

export default ScoreWall;
