import React, { useState } from 'react'
import PSWall from './PSWall';
import WordWall from './WordWall';
import WordConnectionRow from './WordConnectionRow';
import ConnectionRow from './ConnectionRow';
import SequenceRow from './SequenceRow';
import MissingVowels from './MissingVowels';
import WordWallIcons from './WorldWallIcons';
import Data from "./../utilities/gameData"; 

function Game({...props})
{
    const[gameState, setGameState] = useState(
        {
            round: 4,
            wallIndex: 0,
            scores:0,
            clickedRow: false,
            hidden: {1: false, 2:false, 3:false, 4:false, 5:false, 6:false},
            wordWallIndex: 0
        }
    )

    const colorDictionary = {
        0: "bg-gradient-to-r from-red-500 via-red-400 to-red-500",
        1: "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500",
        2: "bg-gradient-to-r from-green-500 via-green-400 to-green-500",
        3: "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500",
    };

    const connectionWall = Data.patterns;
    const sequenceWall = Data.sequences;
    const missingVowels = Data.missingVowels;

    const wordWalls = [Data.wall.wall1, Data.wall.wall2]

    // Click handles
    const psWallHandle = (i) =>
    {
        var temp = {...gameState.hidden};
        temp[i] = true;

        setGameState({...gameState, clickedRow: true, hidden: temp});
    }

    //When a missing vowel category is finished
    const missingVowelClick = () =>
    {
        if(gameState.wallIndex === 3)
        {
            setGameState({...gameState, wallIndex: 0, round: gameState.round + 1});
        }
        else
        {
            setGameState({...gameState, wallIndex: gameState.wallIndex + 1});
        }
    }
    //When a connection row of the word wall is completed
    const wordRowExit = () =>
    {
        if(gameState.wallIndex === 3)
        {
            setGameState({...gameState, wallIndex: 0, wordWallIndex: gameState.wordWallIndex + 1, clickedRow: false, round: gameState.round + 1});
        }
        else
        {
            setGameState({...gameState, wallIndex: gameState.wallIndex + 1});
        }
    }

    //When the word wall has been solved
    const wallExit = () =>
    {
        if (gameState.wallIndex === 1)
        {
            setGameState({...gameState, wallIndex: 0, clickedRow: false, round: gameState.round + 1});
        }
        else
        {
            setGameState({...gameState, clickedRow: false, round: gameState.round + 1});
        }
    }

    //When a connection/sequence row is completed
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
                return <div>{gameState.clickedRow === false ? <WordWallIcons onClick={psWallHandle} hidden={gameState.hidden}></WordWallIcons> : <WordWall data={wordWalls[gameState.wordWallIndex]} exit={wallExit}> </WordWall>}</div>
            case 3:
                return <div><WordConnectionRow exitClick={wordRowExit} color={colorDictionary[gameState.wallIndex]} row={wordWalls[gameState.wordWallIndex][gameState.wallIndex]}></WordConnectionRow></div>
            case 4:
                return <div>{gameState.clickedRow === false ? <WordWallIcons onClick={psWallHandle} hidden={gameState.hidden}></WordWallIcons> : <WordWall data={wordWalls[gameState.wordWallIndex]} exit={wallExit}> </WordWall>}</div>
            case 5:
                return <div><WordConnectionRow exitClick={wordRowExit} color={colorDictionary[gameState.wallIndex]} row={wordWalls[gameState.wordWallIndex][gameState.wallIndex]}></WordConnectionRow></div>
            
            case 6:
                return <div><MissingVowels data={missingVowels[gameState.wallIndex]} onClick={missingVowelClick}/></div>
            default:
                return <div><h1>GAME OVERR~!!!!!!!!</h1></div>;
        }
    }

    

    return (
        <div>
        {renderSwitch(gameState.round)}
        </div>
        )
}
export default Game;
