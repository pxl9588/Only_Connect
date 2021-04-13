import { useState, useContext } from "react";
import{ useHistory } from 'react-router-dom'
import firebase from "firebase";
//import OverrideButton from "./OverrideButton";
import {SessionContext} from '../context/SessionContext.js';
const database = firebase.database()


export default function CreateNewGame(props){
    let history = useHistory()
    const {setSessionId, authUser} = useContext(SessionContext);
    const [teamOne, setTeamOne] = useState("Team One");
    const [teamTwo, setTeamTwo] = useState("Team Two");
    const [gameData, setGameData] = useState({});

    // Handles file upload event and updates state
    const handleUpload = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            try
            {
                setGameData(JSON.parse(e.target.result));
            }
            catch
            {
                alert("Error in Game File");
            }
        };
      };

    return (
        <div className="w-full h-screen items-center justify-center grid grid-rows-3 lg:grid-cols-3 justify-items-center">
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    setTeamOne(evt.target[0].value);
                }}
            >
                <div className="items-center">
                    <div className="text-4xl text-center">{teamOne}</div>
                    <input
                        type="text"
                        placeholder="Team One Name"
                        className="w-36 md:w-auto px-2 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                    />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-auto px-2 rounded">
                        Set Name
                    </button>
                </div>
            </form>
            <div>
                <label>Import Game File</label>
                <input type="file" onChange={handleUpload}/>
                <button
                className = "m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-auto px-2 rounded"
                onClick = {(evt) => {
                    localStorage.clear();
                    evt.preventDefault();
                    const gamesRef = database.ref('games')
                    const newGameRef = gamesRef.push();
                    newGameRef.set({
                        game:{
                            round: -1,
                            wallIndex: 0,
                            clickedRow: false,
                            hidden: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
                            turn: 1,
                            admin: authUser.uid,
                            teamOne: {
                                score: 0,
                                name: teamOne,
                                capitain: "",
                            },
                            teamTwo: {
                                score: 0,
                                name: teamTwo,
                                capitain: "",
                            },
                            wordWallIndex: 0,
                            gameData: gameData
                        }
                        
                    });
                    setSessionId(`/games/${newGameRef.key}`)
                    history.push(`/games/${newGameRef.key}`)
                    
                }}
                >Create New Game
                </button>
            </div>
            
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    setTeamTwo(evt.target[0].value);
                }}
            >
                <div className="items-center">
                <div className="text-4xl text-center">{teamTwo}</div>
                <input
                    type="text"
                    placeholder="Team Two Name"
                    className="w-36 md:w-auto px-2 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-auto px-2 rounded">
                    Set Name
                </button>
                </div>
            </form>
            
        </div>
    )
}