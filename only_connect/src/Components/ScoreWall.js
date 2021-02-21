import whale from './../images/whale.png'
import seal from './../images/seal.png'
import Score from "./Score";
import { useEffect } from 'react';

function ScoreWall(props)
{ 
    useEffect(()=>{console.log(props.play1Score);});

    return (
        <div onClick={props.exit} className="flex justify-center items-center h-screen -my-12 sm:-my-0">
            <div className="grid grid-flow-col grid-rows-1">
                <Score icon={whale} score={props.play1Score}></Score>
                <Score icon={seal} score={props.play2Score}></Score>
            </div>
        </div>
    );
}

export default ScoreWall;
