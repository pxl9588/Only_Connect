import React, { useState } from "react";
import { id } from "../HomePage";
import { firebase } from "../firebaseConfig";

var database = firebase.database();

function writeUserData(game) {
    database.ref(id).set({
        ...game,
    });
}

export default function GameState(init) {
    const [gameState, setGameStateLocal] = useState(init);
    //writeUserData(init)
    return {
        gameState,
        setGameState: (args) => {
            database.ref(id).set(args);
        },
        setGameStateLocal,
    };
}
