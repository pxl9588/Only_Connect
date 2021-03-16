import { useState, useContext } from "react";
import{ useHistory } from 'react-router-dom'
import firebase from "firebase";
import OverrideButton from "./OverrideButton";
import Game from "./Game";
import {SessionContext} from '../context/SessionContext'
const database = firebase.database()


export default function CreateNewGame(props){
    let history = useHistory()
    let {sessionId, setSessionId} = useContext(SessionContext);
    return (
        <div className="flex w-full h-screen items-center justify-center">
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
                        teamlessPlayers:
                        {
                            "":""
                        },
                        teamOne: {
                            score: 0,
                            name: "Team One",
                            players:
                            {
                                "test1": "Steve",
                                "test2": "Bob"
                            }
                        },
                        teamTwo: {
                            score: 0,
                            name: "Team Two",
                            players:
                            {
                                "test1": "John",
                                "test2": "Joe"
                            }
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