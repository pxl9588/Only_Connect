import React, { useState } from "react";
import PSWall from "./PSWall";
import WordWall from "./WordWall";
import ConnectionRow from "./ConnectionRow";
import SequenceRow from "./SequenceRow";
import MissingVowels from "./MissingVowels";
import WordWallIcons from "./WorldWallIcons";
import GameData from "../utilities/gameData";
import "./Game.css";

function Game({ ...props }) {
    const [gameState, setGameState] = useState({
        round: 0,
        wallIndex: 0,
        scores: 0,
        clickedRow: false,
        hidden: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
    });

    const connectionWall = GameData.connectionWall;
    const sequenceWall = GameData.sequences;

    // Click handles
    const psWallHandle = (i) => {
        var temp = { ...gameState.hidden };
        temp[i] = true;

        setGameState({ ...gameState, clickedRow: true, hidden: temp });
    };

    const psRowExit = () => {
        if (gameState.wallIndex === 5) {
            setGameState({
                ...gameState,
                wallIndex: 0,
                clickedRow: false,
                round: gameState.round + 1,
                hidden: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
            });
        } else {
            setGameState({ ...gameState, wallIndex: gameState.wallIndex + 1, clickedRow: false });
        }
    };

    const renderSwitch = (round) => {
        switch (gameState.round) {
            case 0:
                return (
                    <div>
                        {gameState.clickedRow === false ? (
                            <div className="center-game">
                                <div>
                                    <h1 className="title">Only Connect</h1>
                                    <PSWall
                                        onClick={psWallHandle}
                                        hidden={gameState.hidden}
                                    ></PSWall>
                                </div>
                            </div>
                        ) : (
                            <ConnectionRow
                                exitClick={psRowExit}
                                row={connectionWall[gameState.wallIndex]}
                            ></ConnectionRow>
                        )}
                    </div>
                );
            case 1:
                return (
                    <div>
                        {gameState.clickedRow === false ? (
                            <div>
                                <div>
                                    <h1 className="title">Only Connect</h1>
                                    <PSWall
                                        onClick={psWallHandle}
                                        hidden={gameState.hidden}
                                    ></PSWall>
                                </div>
                            </div>
                        ) : (
                            <SequenceRow
                                exitClick={psRowExit}
                                row={sequenceWall[gameState.wallIndex]}
                            ></SequenceRow>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div>
                        {gameState.clickedRow === false ? (
                            <WordWallIcons
                                onClick={psWallHandle}
                                hidden={gameState.hidden}
                            ></WordWallIcons>
                        ) : (
                            <WordWall> </WordWall>
                        )}
                    </div>
                );
            case 3:
                return (
                    <div>
                        <MissingVowels />
                    </div>
                );
            default:
                return <div>round {round} not implemented</div>;
        }
    };

    return <div>{renderSwitch(gameState.round)}</div>;
}
export default Game;
