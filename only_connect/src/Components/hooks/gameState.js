import { useState, useContext } from "react";
import { id } from "../../App";
import { firebase } from "../firebaseConfig";
import {SessionContext} from '../../App'

var database = firebase.database();

/*function writeUserData(game) {
    database.ref(id).set({
        ...game,
    });
}*/

export default function GameState(init) {
    let {sessionId, setSessionId} = useContext(SessionContext)
    const [gameState, setGameStateLocal] = useState(init);
    return {
        gameState,
        setGameState: (args) => {
            database.ref(`${sessionId}/game`).set(args);
        },
        setGameStateLocal,
    };
}
