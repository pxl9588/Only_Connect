import React, { useState } from 'react'
import PSWall from './PSWall';
import WordWall from './WordWall';
import ConnectionRow from './ConnectionRow';
import SequenceRow from './SequenceRow';
import MissingVowels from './MissingVowels';
import WordWallIcons from './WorldWallIcons';

function Game({...props})
{
    const[gameState, setGameState] = useState(
        {
            round: 2,
            wallIndex: 0,
            scores:0,
            clickedRow: false,
            hidden: {1: false, 2:false, 3:false, 4:false, 5:false, 6:false}
        }
    )

    const connectionWall = [["A", "B", "C", "D","Letter"], ["E", "F", "G", "H","Letter"], ["I", "J", "K", "L","Letter"], ["M", "N", "O", "P","Letter"], ["Q", "R", "S", "T","Letter"], ["U", "V", "W", "X","Letter"]];
    const sequenceWall = [["1", "2", "3", "4","Numbers"], ["5", "6", "7", "8","Numbers"], ["9", "10", "11", "12","Numbers"], ["13", "14", "15", "16","Numbers"], ["17", "18", "19", "20","Numbers"], ["21", "22", "23", "24","Numbers"]];

    // Click handles
    const psWallHandle = (i) =>
    {
        var temp = {...gameState.hidden};
        temp[i] = true;

        setGameState({...gameState, clickedRow: true, hidden: temp});
    }

    const psRowExit = () =>
    {
        if(gameState.wallIndex === 5)
        {
            setGameState({...gameState, wallIndex: 0, clickedRow: false, round: gameState.round + 1, hidden:{1: false, 2:false, 3:false, 4:false, 5:false, 6:false}});
        }
        else
        {
            setGameState({...gameState, wallIndex: gameState.wallIndex + 1, clickedRow: false});
        }
        
    }

    const renderSwitch = (round) =>
    {
        switch (gameState.round)
        {
            case 0:
                return <div>{gameState.clickedRow === false ? <PSWall onClick={psWallHandle} hidden={gameState.hidden}></PSWall> : <ConnectionRow exitClick={psRowExit} row={connectionWall[gameState.wallIndex]}></ConnectionRow>}</div>
            case 1:
                return <div>{gameState.clickedRow === false ? <PSWall onClick={psWallHandle} hidden={gameState.hidden}></PSWall> : <SequenceRow exitClick={psRowExit} row={sequenceWall[gameState.wallIndex]}></SequenceRow>}</div>
            case 2:
                return <div>{gameState.clickedRow === false ? <WordWallIcons onClick={psWallHandle} hidden={gameState.hidden}></WordWallIcons> : <WordWall> </WordWall>}</div>
            case 3:
                return <div></div>
            default:
                return <div>round {round} not implemented</div>;
        }
    }

    

    return (
        <div>
        {renderSwitch(gameState.round)}
        </div>
        )
}
export default Game;