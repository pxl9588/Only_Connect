import React, { useState } from 'react'
import PSWall from './PSWall';
import WordWall from './WordWall';
import PSRow from './PSRow';
import MissingVowels from './MissingVowels';
import WordWallIcons from './WorldWallIcons';

function Game({...props})
{
    const[gameState, setGameState] = useState(
        {
            round: 0,
            wallIndex: 0,
            scores:0,
            clickedRow: false,
            hidden: {1: false, 2:false, 3:false, 4:false, 5:false, 6:false}
        }
    )

    const connectionWall = [["A", "B", "C", "D","Letter"], ["E", "F", "G", "H","Letter"], ["I", "J", "K", "L","Letter"], ["M", "N", "O", "P","Letter"], ["Q", "R", "S", "T","Letter"], ["U", "V", "W", "X","Letter"]];
    const sequenceWall = [["1", "2", "3", "4","Numbers"], ["5", "6", "7", "8","Numbers"], ["9", "10", "11", "12","Numbers"], ["13", "14", "15", "16","Numbers"], ["17", "18", "19", "20","Numbers"], ["21", "22", "23", "24","Numbers"]];

    const incrementRound = () =>
    {
        setGameState({...gameState, round: gameState.round + 1});
        console.log(gameState.round);
    }

    const psWallHandle = (i) =>
    {
        console.log(`Coming back from ${i}`);
        var temp = {...gameState.hidden};
        temp[i] = true;

        setGameState({...gameState, clickedRow: true, hidden: temp});
    }

    const psRowExit = () =>
    {
        if(gameState.wallIndex == 5)
        {
            setGameState({...gameState, wallIndex: 0, clickedRow: false, round: gameState.round + 1, hidden:{1: false, 2:false, 3:false, 4:false, 5:false, 6:false}});
            console.log("End of Round 1, going to Round 2");
        }
        else
        {
            setGameState({...gameState, wallIndex: gameState.wallIndex + 1, clickedRow: false});
        }
        
    }

    var div = null;

    if(gameState.round < 2)
    {
        return(
            <div>{gameState.clickedRow === false ? <PSWall onClick={psWallHandle} hidden={gameState.hidden}></PSWall> : <PSRow exitClick={psRowExit} type={gameState.round === 0 ? "" : "sequence"} row={gameState.round === 0 ? connectionWall[gameState.wallIndex] : sequenceWall[gameState.wallIndex]}></PSRow>}</div>
        )
    }
    else
    {
        return(
            <div>{gameState.clickedRow === false ? <WordWallIcons></WordWallIcons> : <WordWall> </WordWall>}</div>
        )
    }
}
export default Game;