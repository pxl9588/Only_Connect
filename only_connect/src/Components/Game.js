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
import {SessionContext} from '../context/SessionContext.js';
import {randomize} from '../utilities/helpersWordWall'
import { v4 as uuidv4 } from "uuid";

var database = firebase.database();
// const URLParams = window.location.pathname
function Game({ ...props }) {
    const [selfTeam, setSelfTeam] = useState(-1)
    let {sessionId, setSessionId, authUser, setAuthUser} = useContext(SessionContext)

    const { gameState, setGameState, setGameStateLocal } = GameState({
        round: -2,
        wallIndex: 0,
        clickedRow: false,
        hidden: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
        turn: 1,
        admin: "",
        teamOne: {
            score: 0,
            name: "Team One",
            capitain: "",
        },
        teamTwo: {
            score: 0,
            name: "Team Two",
            capitain: "",
        },
        wordWallIndex: 0,
    })

    const isAdmin = () =>
    {
        return authUser.uid === gameState.admin;
    }

    //const [gameState, setGameState] = useState(newGame);

    useEffect(() => {
        const ref = database.ref(`${sessionId}/game`);
        ref.on("value", (state) => {
            const data = state.val();
            if (data) {
                if(!data.teamOne.players)
                {
                    data.teamOne.players = {};
                }
                if(!data.teamTwo.players)
                {
                    data.teamTwo.players = {};
                }
                if(!data.teamlessPlayers)
                {
                    data.teamlessPlayers = {};
                }
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

    const startGame = () => {
        setGameState({ ...gameState, round: 0 });
    };

    const selectTeam = (i) =>
    {
        var tempState = {...gameState};
        let sourceTeam = "";
        let targetTeam = "";
        var name = "";
        if(i === 1)
        {
            sourceTeam = "teamTwo";
            targetTeam = "teamOne";
        }
        else if(i === 0)
        {
            sourceTeam = "teamOne";
            targetTeam = "teamTwo";
        }

        //If the uid exists in the source team, remove player and move to target
        if(tempState[sourceTeam].players[authUser.uid])
        {
            name = tempState[sourceTeam].players[authUser.uid];
            delete tempState[sourceTeam].players[authUser.uid];
        }
        //The player entered their name first, then selected a team
        else if(tempState.teamlessPlayers[authUser.uid])
        {
            name = tempState.teamlessPlayers[authUser.uid];
            delete tempState.teamlessPlayers[authUser.uid];
        }
        //The player selected a team before entering their name
        else
        {
            name = "";    
        }

        //If there is no capitain, make this player the capitain
        if(tempState[targetTeam].capitain == "")
        {
            tempState[targetTeam].capitain = authUser.uid;
        }
        //If this player was the capitain on the source team, make a new player capitain
        if(tempState[sourceTeam].capitain === authUser.uid)
        {
            var players = Object.keys(tempState[sourceTeam].players);
            var capitain = "";
            //Check if there are other available players to assign capitain to
            if(players.length > 0)
            {
                capitain = players[0];
            }
            tempState[sourceTeam].capitain = capitain;
        }

        //Put player on team
        tempState[targetTeam].players[authUser.uid] = name;
        
        setSelfTeam(i);
        setGameState(tempState);
    }
    const setTeamNames = (id, value) => {
        // evt.preventDefault();
        const newState = { ...gameState };
        newState[id].name = value;
        // console.log(evt.target.id);
        setGameState({ ...newState });
    };

    const setPlayerName = (name) =>
    {
        var tempState = {...gameState};
        if(selfTeam === 1)
        {
            tempState.teamOne.players[authUser.uid] = name;
        }
        else if(selfTeam === 0)
        {
            tempState.teamTwo.players[authUser.uid] = name;
        }
        else
        {
            tempState.teamlessPlayers[authUser.uid] = name;
        }

        setGameState(tempState);
    }

    // Click handles
    const gameOver = () =>
    {
        setGameState(/*newGame*/);
    }

    // Click handles
    const scoreExit = () => {
        if(isAdmin())
        {
            setGameState({ ...gameState, clickedRow: false, round: gameState.round + 1 });
        }
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
        var tempGameState = {...gameState};
        if(gameState.turn === 1)
        {
            tempGameState.teamOne.score += points
            console.log(tempGameState.teamOne.score);
        }
        else
        {
            tempGameState.teamTwo.score += points
            console.log(tempGameState.teamTwo.score);
        }

        if (gameState.wallIndex === 3)
        {
            tempGameState.wallIndex = 0;
            tempGameState.wordWallIndex += 1;
            tempGameState.clickedRow = false;
            tempGameState.round += 1;

            if(tempGameState.teamOne.score === 9)
            {
                tempGameState.teamOne.score = 10;
            }
            else
            {
                tempGameState.teamOne.score = Math.floor(tempGameState.teamOne.score);
            }
            if(tempGameState.teamTwo.score === 9)
            {
                tempGameState.teamTwo.score = 10;
            }
            else
            {
                tempGameState.teamTwo.score = Math.floor(tempGameState.teamTwo.score);
            }
            
            if(tempGameState.turn === 1)
            {
                tempGameState.turn = 0;
            }
            else
            {
                tempGameState.turn = 1;
            }
        }
        else
        {
            tempGameState.wallIndex += 1;
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

        if(gameState.turn === 1)
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
        if(tempGameState.turn === 1)
        {
            tempGameState.turn = 0;
        }
        else
        {
            tempGameState.turn = 1;
        }
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
                        admin={gameState.admin}
                        selectTeam={selectTeam}
                        currentTeam={selfTeam}
                        teamOne={gameState.teamOne}
                        teamTwo={gameState.teamTwo}
                        teamlessPlayers={gameState.teamlessPlayers}
                        setName={setTeamNames}
                        startGame={startGame}
                        setPlayerName={setPlayerName}
                    ></HomePage>
                );
            case 0:
                return (
                    <div>
                        {gameState.clickedRow === false ? (
                            <PSWall
                                onClick={psWallHandle}
                                hidden={gameState.hidden}
                                turn={gameState.turn}
                                teamOne={gameState.teamOne}
                                teamTwo={gameState.teamTwo}
                                selfTeam={selfTeam}
                            ></PSWall>
                        ) : (
                            <ConnectionRow
                                selfTeam={selfTeam}
                                exit={psRowExit}
                                row={connections[gameState.wallIndex]}
                                turn={gameState.turn}
                                admin={gameState.admin}
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
                                turn={gameState.turn}
                                teamOne={gameState.teamOne}
                                teamTwo={gameState.teamTwo}
                                selfTeam={selfTeam}
                            ></PSWall>
                        ) : (
                            <SequenceRow
                                selfTeam = {selfTeam}
                                exit={psRowExit}
                                row={sequences[gameState.wallIndex]}
                                turn={gameState.turn}
                                admin={gameState.admin}
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
                                turn={gameState.turn}
                                teamOne={gameState.teamOne}
                                teamTwo={gameState.teamTwo}
                                selfTeam={selfTeam}
                            ></WordWallIcons>
                        ) : (
                            <WordWall
                                data={wordWalls[gameState.wordWallIndex]}
                                turn={gameState.turn}
                                selfTeam={selfTeam}
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
                            admin={gameState.admin}
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
                                turn={gameState.turn}
                                teamOne={gameState.teamOne}
                                teamTwo={gameState.teamTwo}
                                selfTeam={selfTeam}
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
