import React, { useState } from "react";
import PSWall from "./PSWall";
import WordWall from "./WordWall";
import PSRow from "./PSRow";
import MissingVowels from "./MissingVowels";
import Data from "../utilities/gameData";

const sequences = Data.sequences;
const patterns = Data.patterns;
const missingVowels = Data.missingVowels;

function Game({ ...props }) {
    const [gameState, setGameState] = useState({
        gameStarted: true,
        round: 0,
        wallIndex: 0,
        scores: 0,
        clickedRow: false,
    });

    const connectionWall = [
        ["A", "B", "C", "D", "Letter"],
        ["E", "F", "G", "H", "Letter"],
        ["I", "J", "K", "L", "Letter"],
        ["M", "N", "O", "P", "Letter"],
    ];

    const incrementRound = () => {
        setGameState({ ...gameState, round: gameState.round + 1 });
        console.log(gameState.round);
    };

    const psWallHandle = (id) => {
        setGameState({ ...gameState, clickedRow: true, wallIndex: id });
    };

    const psRowExit = () => {
        setGameState({ ...gameState, wallIndex: gameState.wallIndex + 1, clickedRow: false });
    };

    var div = null;

    if (gameState.round < 2) {
        return (
            <div>
                {gameState.clickedRow === false ? (
                    <PSWall onClick={psWallHandle}></PSWall>
                ) : (
                    <PSRow exitClick={psRowExit} row={patterns[gameState.wallIndex]}></PSRow>
                )}
            </div>
        );
    }
    return <WordWall />;
}
export default Game;
