import React, { useEffect, useState } from "react";
import PSWall from "./PSWall";
import WordWall from "./WordWall";
import WordConnectionRow from "./WordConnectionRow";
import ConnectionRow from "./ConnectionRow";
import SequenceRow from "./SequenceRow";
import MissingVowels from "./MissingVowels";
import WordWallIcons from "./WorldWallIcons";
import Data from "./../utilities/gameData";
import HomePage from "./HomePage";
import ScoreWall from "./ScoreWall";

function Game({ ...props }) {
    const [gameState, setGameState] = useState({
        round: -1,  
        wallIndex: 0,
        clickedRow: false,
        hidden: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
        teamOneTurn: true,
        teamOne:
        {
            score: 0,
            name: ''
        },
        teamTwo:
        {
            score: 0,
            name: ''
        },
        wordWallIndex: 0,
    });

    const colorDictionary = {
        0: "bg-gradient-to-r from-red-500 via-red-400 to-red-500",
        1: "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500",
        2: "bg-gradient-to-r from-green-500 via-green-400 to-green-500",
        3: "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500",
    };

    const connections = Data.connections;
    const sequences = Data.sequences;
    const missingVowels = Data.missingVowels;

    const wordWalls = [Data.wall.wall1, Data.wall.wall2];

    const addToScore = (score) => {
        if (gameState.player1Turn) {
            score += gameState.score1;
            setGameState({ ...gameState, score1: score});
        } else {
            score += gameState.score2;
            setGameState({ ...gameState, score2: score});
        }
    };

    const switchTurn = () => {
        setGameState({ ...gameState, player1Turn: !gameState.player1Turn });
    };

    const startGame = () => {
        setGameState({ ...gameState, round: 0 });
    };

    const setTeamNames = (evt) => {
        const newState = {...gameState}
        newState[evt.target.id].name = evt.target.value 
       setGameState({...newState})
    }

    // Click handles
    const gameOver = () =>
    {
        setGameState({ ...gameState, clickedRow: false, round: -1 });
    }

    // Click handles
    const scoreExit = () =>
    {
        setGameState({ ...gameState, clickedRow: false, round: gameState.round + 1 });
    }
    const psWallHandle = (i) => {
        var temp = { ...gameState.hidden };
        temp[i] = true;

        setGameState({ ...gameState, clickedRow: true, hidden: temp });
    };

    //When a missing vowel category is finished
    const missingVowelClick = () => {
        if (gameState.wallIndex === 3) {
            setGameState({ ...gameState, wallIndex: 0, round: gameState.round + 1 });
        } else {
            setGameState({ ...gameState, wallIndex: gameState.wallIndex + 1 });
        }
    };
    //When a connection row of the word wall is completed
    const wordRowExit = () => {
        if (gameState.wallIndex === 3) {
            setGameState({
                ...gameState,
                wallIndex: 0,
                wordWallIndex: gameState.wordWallIndex + 1,
                clickedRow: false,
                round: gameState.round + 1,
            });
        } else {
            setGameState({ ...gameState, wallIndex: gameState.wallIndex + 1 });
        }
    };

    //When the word wall has been solved
    const wallExit = () => {
        if (gameState.wallIndex === 1) {
            setGameState({
                ...gameState,
                wallIndex: 0,
                clickedRow: false,
                round: gameState.round + 1,
            });
        } else {
            setGameState({ ...gameState, clickedRow: false, round: gameState.round + 1 });
        }
    };

    /**
     * When the connection / sequence row exits
     * @param  {[type]} points Number of points to add
     * @param  {[type]} team Team that receives points
    */
    const psRowExit = (points, team) => {
        var tempGameState = {...gameState};
        tempGameState.teamOneTurn = !gameState.teamOneTurn;
        tempGameState.clickedRow = false;

        if(team)
        {
            tempGameState.teamOne = {...gameState.teamOne, score: gameState.teamOne.score + points};
        }
        else
        {
            tempGameState.teamTwo = {...gameState.teamTwo, score: gameState.teamTwo.score + points}
        }

        if (gameState.wallIndex === 5)
        {
            tempGameState.wallIndex = 0;
            tempGameState.round = gameState.round + 1;
            tempGameState.hidden = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false };
        }
        else
        { 
            tempGameState.wallIndex = gameState.wallIndex + 1;
        }

        setGameState(tempGameState);
    };

    const renderSwitch = () => {
        switch (gameState.round) {
            case -1:
                return <HomePage teamOne={gameState.teamOne} teamTwo={gameState.teamTwo} setName={setTeamNames} startGame={startGame}></HomePage>;
            case 0:
                return (
                    <div>
                        {gameState.clickedRow === false ? (
                            <PSWall
                                onClick={psWallHandle}
                                hidden={gameState.hidden}
                                turn={gameState.teamOneTurn}
                                teamOne={gameState.teamOne}
                                teamTwo={gameState.teamTwo}
                            ></PSWall>
                        ) : (
                            <ConnectionRow
                                exit={psRowExit}
                                row={connections[gameState.wallIndex]}
                                turn={gameState.teamOneTurn}
                            ></ConnectionRow>
                        )}
                    </div>
                );
            case 1:
                return (<ScoreWall exit={scoreExit} play1Score={gameState.teamOne.score} play2Score={gameState.teamTwo.score}></ScoreWall>);
            case 2:
                return (
                    <div>
                        {gameState.clickedRow === false ? (
                            <PSWall
                            onClick={psWallHandle}
                            hidden={gameState.hidden}
                            turn={gameState.teamOneTurn}
                            teamOne={gameState.teamOne}
                            teamTwo={gameState.teamTwo}
                        ></PSWall>
                        ) : (
                            <SequenceRow
                                exit={psRowExit}
                                row={sequences[gameState.wallIndex]}
                                turn={gameState.teamOneTurn}
                            ></SequenceRow>
                        )}
                    </div>
                );
            case 3:
                return (<ScoreWall exit={scoreExit} play1Score={gameState.teamOne.score} play2Score={gameState.teamTwo.score}></ScoreWall>);

            case 4:
                return (
                    <div>
                        {gameState.clickedRow === false ? (
                            <WordWallIcons
                                onClick={psWallHandle}
                                hidden={gameState.hidden}
                            ></WordWallIcons>
                        ) : (
                            <WordWall
                                data={wordWalls[gameState.wordWallIndex]}
                                addToScore={addToScore}
                                switchTurn={switchTurn}
                                exit={wallExit}
                            >
                                {" "}
                            </WordWall>
                        )}
                    </div>
                );
            case 5:
                return (
                    <div>
                        <WordConnectionRow
                            exitClick={wordRowExit}
                            color={colorDictionary[gameState.wallIndex]}
                            row={wordWalls[gameState.wordWallIndex][gameState.wallIndex]}
                            addToScore={addToScore}
                            switchTurn={switchTurn}
                        ></WordConnectionRow>
                    </div>
                );
            case 6:
                return (
                    <div>
                        {gameState.clickedRow === false ? (
                            <WordWallIcons
                                onClick={psWallHandle}
                                hidden={gameState.hidden}
                            ></WordWallIcons>
                        ) : (
                            <WordWall
                                data={wordWalls[gameState.wordWallIndex]}
                                addToScore={addToScore}
                                switchTurn={switchTurn}
                                exit={wallExit}
                            >
                                {" "}
                            </WordWall>
                        )}
                    </div>
                );
            case 7:
                return (
                    <div>
                        <WordConnectionRow
                            exitClick={wordRowExit}
                            color={colorDictionary[gameState.wallIndex]}
                            row={wordWalls[gameState.wordWallIndex][gameState.wallIndex]}
                            addToScore={addToScore}
                            switchTurn={switchTurn}
                        ></WordConnectionRow>
                    </div>
                );

            case 8:
                return (<ScoreWall exit={scoreExit} play1Score={gameState.teamOne.score} play2Score={gameState.teamTwo.score}></ScoreWall>);

            case 9:
                return (
                    <div>
                        <MissingVowels
                            data={missingVowels[gameState.wallIndex]}
                            onClick={missingVowelClick}
                            switchTurn={switchTurn}
                            addToScore={addToScore}
                        />
                    </div>
                );
            case 10:
                return (<ScoreWall exit={gameOver} play1Score={gameState.teamOne.score} play2Score={gameState.teamTwo.score}></ScoreWall>);
            default:
                return (
                    <div>
                        <h1>GAME OVERR~!!!!!!!!</h1>
                    </div>
                );
        }
    };

    return <div>{renderSwitch()}</div>;
}
export default Game;
