import React, { useState, useEffect, useContext } from "react";
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
import GameState from "./hooks/gameState";
import firebase from "firebase";
import CreateNewGame from './createNewGame'
import { id } from '../App';
import {SessionContext} from '../App'
import {randomize} from '../utilities/helpersWordWall'
import { v4 as uuidv4 } from "uuid";
var database = firebase.database();
// const URLParams = window.location.pathname
function Game({ ...props }) {
    const [selfTeam, setSelfTeam] = useState(true)
    let {sessionId, setSessionId} = useContext(SessionContext)
    // const [gameState, setGameState] = useState({
    //     // 0: Connection
    //     // 2: Sequence
    //     // 4: WordWall
    //     // 9: Missing Vowel
    //     round: -2,
    //     wallIndex: 0,
    //     clickedRow: false,
    //     hidden: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
    //     teamOneTurn: true,
    //     teamOne: {
    //         score: 0,
    //         name: "",
    //     },
    //     teamTwo: {
    //         score: 0,
    //         name: "",
    //     },
    //     wordWallIndex: 0,
    // });

    const { gameState, setGameState, setGameStateLocal } = GameState({
        round: -2,
        wallIndex: 0,
        clickedRow: false,
        hidden: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
        teamOneTurn: true,
        teamOne: {
            score: 0,
            name: "",
        },
        teamTwo: {
            score: 0,
            name: "",
        },
        wordWallIndex: 0,
    })


    //const [gameState, setGameState] = useState(newGame);

    useEffect(() => {
        const ref = database.ref(`${sessionId}/game`);
        ref.on("value", (state) => {
            const data = state.val();
            if (data) {
                console.log(data);
                setGameStateLocal(data);
            }
        });
        return () => {
            ref.off();
        };
    }, []);

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

    const selectTeam = (team) => {
        setSelfTeam(team == 'TeamOne')
    }

    const addToScore = (score) => {
        if (gameState.teamOneTurn) {
            setGameState({
                ...gameState,
                teamOne: { ...gameState.teamOne, score: gameState.teamOne.score + score },
            });
        } else {
            setGameState({
                ...gameState,
                teamTwo: { ...gameState.teamTwo, score: gameState.teamTwo.score + score },
            });
        }
    };

    const switchTurn = () => {
        setGameState({ ...gameState, teamOneTurn: !gameState.teamOneTurn });
    };

    const startGame = () => {
        setGameState({ ...gameState, round: 0 });
    };

    const setTeamNames = (id, value) => {
        // evt.preventDefault();
        const newState = { ...gameState };
        newState[id].name = value;
        // console.log(evt.target.id);
        setGameState({ ...newState });
    };

    // Click handles
    const gameOver = () =>
    {
        setGameState(/*newGame*/);
    }

    // Click handles
    const scoreExit = () => {
        setGameState({ ...gameState, clickedRow: false, round: gameState.round + 1 });
    };
    
    const buildWordWall = () => {
        let blocks = [];
        for (let [index, group] of wordWalls[gameState.wordWallIndex].entries()) {
            let words = group["clues"].map((word) => {
                return {
                    word: word,
                    color: "bg-light-shade",
                    id: uuidv4(),
                    group: index,
                    clicked: false,
                    matched: false,
                };
            });
            blocks.push(...words);
        }
        blocks = randomize(blocks);
        const args = {
            intervalId: 0,
            clicked: [],
            color_count: 0,
            solved: blocks,
            lives: 3,
            done: false,
            timer_fill_color: "bg-dark-shade",
            timer_color: "bg-dark-accent",
            time: 0,
            points: 0
        }
        database.ref(`${sessionId}/WordWall`).set(args);
    }

    const psWallHandle = (i) => {
        var temp = { ...gameState.hidden };
        temp[i] = true;
        buildWordWall()

        setGameState({ ...gameState, clickedRow: true, hidden: temp });
    };

    /**
     * When a missing vowel clue is solved
     * @param  {int} teamOnePoints
     * @param  {int} teamTwoPoints
    */
    const missingVowelExit = (teamOnePoints, teamTwoPoints) => {
        var temp = {...gameState};

        temp.round += 1;
        temp.teamOne.score += teamOnePoints;
        temp.teamTwo.score += teamTwoPoints;

        setGameState(temp);
    };
    /**
     * When the Word Wall Connection Row exits
     * @param  {int} points Number of points to add
     * There is no stealing in this phase, if team is true, the team whose turn it is gets the points
     */
    const wordRowExit = (points) => {
        var tempGameState = { ...gameState };
        if (gameState.wallIndex === 3) {
            tempGameState.wallIndex = 0;
            tempGameState.wordWallIndex += 1;
            tempGameState.clickedRow = false;
            tempGameState.round += 1;
            
            tempGameState.teamOneTurn = !gameState.teamOneTurn;
        }
        else
        {
            tempGameState.wallIndex += 1;
        }

        if (gameState.teamOneTurn) {
            tempGameState.teamOne.score += points;
        } else {
            tempGameState.teamTwo.score += points;
        }

        setGameState(tempGameState);
    };

    /**
     * When the Word Wall exits
     * @param  {int} points Number of points to add
    */
    const wallExit = (points) => {
        var temp = {...gameState};
        temp.clickedRow = false;
        temp.round += 1;
        if (gameState.wallIndex === 1)
        {
            temp.wallIndex = 0;
        }
        if(points === 4)
        {
            points = 6;
        }

        if(gameState.teamOneTurn)
        {
            temp.teamOne.score += points
        }
        else
        {
            temp.teamTwo.score += points
        }

        setGameState(temp);
    };

    /**
     * When the connection / sequence row exits
     * @param  {[type]} points Number of points to add
     * @param  {[type]} team Team that receives points
     */
    const psRowExit = (points, team) => {
        var tempGameState = { ...gameState };
        tempGameState.teamOneTurn = !gameState.teamOneTurn;
        tempGameState.clickedRow = false;

        if (team) {
            tempGameState.teamOne = {
                ...gameState.teamOne,
                score: gameState.teamOne.score + points,
            };
        } else {
            tempGameState.teamTwo = {
                ...gameState.teamTwo,
                score: gameState.teamTwo.score + points,
            };
        }

        if (gameState.wallIndex === 5) {
            tempGameState.wallIndex = 0;
            tempGameState.round = gameState.round + 1;
            tempGameState.hidden = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false };
        } else {
            tempGameState.wallIndex = gameState.wallIndex + 1;
        }

        setGameState(tempGameState);
    };

    
    const renderSwitch = () => {
        switch (gameState.round) {
            case -2:
                return (
                    <CreateNewGame>
                        
                    </CreateNewGame>
                )
            case -1:
                return (
                    <HomePage
                        selectTeam={selectTeam}
                        gameState={gameState}
                        teamOne={gameState.teamOne.name}
                        teamTwo={gameState.teamTwo.name}
                        setName={setTeamNames}
                        startGame={startGame}
                    ></HomePage>
                );
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
                                selfTeam={selfTeam}
                                exit={psRowExit}
                                row={connections[gameState.wallIndex]}
                                turn={gameState.teamOneTurn}
                            ></ConnectionRow>
                        )}
                    </div>
                );
            case 1:
                return (
                    <ScoreWall
                        exit={scoreExit}
                        play1Score={gameState.teamOne.score}
                        play2Score={gameState.teamTwo.score}
                    ></ScoreWall>
                );
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
                                selfTeam = {selfTeam}
                                exit={psRowExit}
                                row={sequences[gameState.wallIndex]}
                                turn={gameState.teamOneTurn}
                            ></SequenceRow>
                        )}
                    </div>
                );
            case 3:
                return (
                    <ScoreWall
                        exit={scoreExit}
                        play1Score={gameState.teamOne.score}
                        play2Score={gameState.teamTwo.score}
                    ></ScoreWall>
                );

            case 4:
                return (
                    <div>
                        {gameState.clickedRow === false ? (
                            <WordWallIcons
                                onClick={psWallHandle}
                                hidden={gameState.hidden}
                                turn={gameState.teamOneTurn}
                                teamOne={gameState.teamOne}
                                teamTwo={gameState.teamTwo}
                            ></WordWallIcons>
                        ) : (
                            <WordWall
                                data={wordWalls[gameState.wordWallIndex]}
                                exit={wallExit}
                            >
                            </WordWall>
                        )}
                    </div>
                );
            case 5:
                return (
                    <div>
                        <WordConnectionRow
                            exit={wordRowExit}
                            color={colorDictionary[gameState.wallIndex]}
                            row={wordWalls[gameState.wordWallIndex][gameState.wallIndex]}
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
                                turn={gameState.teamOneTurn}
                                teamOne={gameState.teamOne}
                                teamTwo={gameState.teamTwo}
                            ></WordWallIcons>
                        ) : (
                            <WordWall
                                data={wordWalls[gameState.wordWallIndex]}
                                exit={wallExit}
                            >
                            </WordWall>
                        )}
                    </div>
                );
            case 7:
                return (
                    <div>
                        <WordConnectionRow
                            exit={wordRowExit}
                            color={colorDictionary[gameState.wallIndex]}
                            row={wordWalls[gameState.wordWallIndex][gameState.wallIndex]}
                        ></WordConnectionRow>
                    </div>
                );

            case 8:
                return (
                    <ScoreWall
                        exit={scoreExit}
                        play1Score={gameState.teamOne.score}
                        play2Score={gameState.teamTwo.score}
                    ></ScoreWall>
                );

            case 9:
                return (
                    <div>
                        <MissingVowels
                            data={missingVowels}
                            exit={missingVowelExit}
                        />
                    </div>
                );
            case 10:
                return (
                    <ScoreWall
                        exit={gameOver}
                        play1Score={gameState.teamOne.score}
                        play2Score={gameState.teamTwo.score}
                    ></ScoreWall>
                );
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
