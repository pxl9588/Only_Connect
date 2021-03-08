import { useState, useContext } from "react";
import{ useHistory } from 'react-router-dom'
import firebase from "firebase";
import OverrideButton from "./OverrideButton";
import Game from "./Game";
const database = firebase.database()


export default function CreateNewGame(props){
    let history = useHistory()
    return (
        <div className="mt-20 flex justify-center">
            <OverrideButton
            onClick = {(evt) => {
                evt.preventDefault()
                const gamesRef = database.ref('games')
                const newGameRef = gamesRef.push();
                newGameRef.set({
                    round: -1,
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
                });
                history.push(`/games/${newGameRef.key}`)
            }}
            >Create New Game</OverrideButton>
        </div>
    )
}