import { useState, useContext } from "react";
import{ useHistory } from 'react-router-dom'
import firebase from "firebase";
import OverrideButton from "./OverrideButton";
import Game from "./Game";
import {SessionContext} from '../App'
const database = firebase.database()


export default function CreateNewGame(props){
    let history = useHistory()
    let {sessionId, setSessionId} = useContext(SessionContext)
    console.log(sessionId)
    return (
        <div className="mt-20 flex justify-center">
            <OverrideButton
            onClick = {(evt) => {
                evt.preventDefault()
                const gamesRef = database.ref('games')

                const newGameRef = gamesRef.push();
                newGameRef.set({
                    game:{
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
                    }
                    
                });
                setSessionId(`/games/${newGameRef.key}`)
                history.push(`/games/${newGameRef.key}`)
                window.location.pathname = `/games/${newGameRef.key}`
                
            }}
            >Create New Game</OverrideButton>
        </div>
    )
}