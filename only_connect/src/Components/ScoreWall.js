import seal from '../images/colored/seal.png'
import whale from '../images/colored/whale.png'
import Score from "./Score";

function ScoreWall(props)
{ 
    return (
        <div onClick={props.exit} className="flex justify-center items-center h-screen ">
            <div className="grid grid-flow-col grid-rows-1">
                <Score icon={seal} score={props.play1Score}></Score>
                <Score icon={whale} score={props.play2Score}></Score>
            </div>
        </div>
    );
}

export default ScoreWall;
