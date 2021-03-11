import React, { useState, useContext } from "react";
import { id } from "../../App";
import { firebase } from "../firebaseConfig";
import {SessionContext} from '../../context/SessionContext'
var database = firebase.database();

function writeUserData(game) {
    database.ref(id).set({
        ...game,
    });
}

export default function RoundState(init) {
    let {sessionId, setSessionId} = useContext(SessionContext)
    const [roundState, setRoundStateLocal] = useState(init[0]);
    return {
        roundState,
        setRoundState: (args) => {
            database.ref(`${sessionId}/${init[1]}`).set(args);
        },
        setRoundStateLocal,
    };
}
