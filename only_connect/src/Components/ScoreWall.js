import seal from '../images/colored/seal.png'
import whale from '../images/colored/whale.png'
import Score from "./Score";
import { useEffect } from 'react';

function ScoreWall(props)
{ 
    return (
        <div onClick={props.exit} className="flex justify-center items-center h-screen -my-12 sm:-my-0">
            <div className="grid grid-flow-col grid-rows-1 lg:gap-x-48">
                <Score icon={seal} score={props.play1Score}></Score>
                <Score icon={whale} score={props.play2Score}></Score>
            </div>
        </div>
    );
}

export default ScoreWall;
