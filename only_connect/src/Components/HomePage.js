import { useEffect, useState, useContext } from "react";
import OverrideButton from "./OverrideButton";
import TextField from "@material-ui/core/TextField";
import ButtonCorrect from "./ButtonCorrect";
// import Whale from "../images/colored/whale.png";
// import Seal from "../images/colored/seal.png";
import { firebase } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import Seal from '../images/black_and_white/seal.png'
import Whale from '../images/black_and_white/whale.png'
import seal from '../images/colored/seal.png'
import whale from '../images/colored/whale.png'
import {SessionContext} from '../App.js'
import capitain from '../images/capitain.png'
import {id} from '../App'


// var firebaseConfig = {
//     apiKey: "AIzaSyBVW4nxJbj2K0sLhzMM8yLUardBYR6hIrs",
//     authDomain: "ocbackend.firebaseapp.com",
//     databaseURL: "https://ocbackend-default-rtdb.firebaseio.com",
//     projectId: "ocbackend",
//     storageBucket: "ocbackend.appspot.com",
//     messagingSenderId: "614462186004",
//     appId: "1:614462186004:web:e2a77517a15b91006a3d01",
//     measurementId: "G-2MB7M8V461"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   var database = firebase.database();

//   function writeUserData(game) {
//     database.ref(id).set({
//       ...game
//     });
//   }

//     database.ref(id).on('value',(state) => {
//         const data = state.val()
//         console.log(data)
//       })

export default function HomePage(props) {

    let {authUser} = useContext(SessionContext)
    const isAdmin = () =>
    {
        return authUser.uid === props.admin;
    }

    const playerExists = () =>
    {
        return authUser.uid in props.teamlessPlayers || authUser.uid in props.teamOne.players || authUser.uid in props.teamTwo.players;
    }

    return (
        <div className="h-screen justify-center">
            {
                isAdmin() || playerExists()  ? 
            <div className="grid grid-flow-row justify-items-center lg:px-84">
                <div className="row-start-2 justify-items-center items-center">
                    <img className="m-auto w-20 lg:w-56" src={(props.currentTeam === 1) ? seal : Seal} onClick={() => {if(props.currentTeam != 1 && !isAdmin()){props.selectTeam(1)}}}></img>
                    <h1 className="text-2xl lg:text-5xl text-center">{props.teamOne.name}</h1>               

                    <div className="grid grid-cols-1">
                        <div className="text-xl lg:text-3xl text-center">Players</div>
                        {
                            props.teamOne.players ?
                                Object.keys(props.teamOne.players).map((name,i) =>
                            (
                                <div key={i} className="text-left text-lg lg:text-2xl">{props.teamOne.players[name]}</div>
                            ))
                            :
                            ""
                        }
                    </div>
                </div>
                <div className="col-start-1 lg:col-start-2">
                    <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-7xl xl:text-9xl">
                        Sole Relation
                    </h1>
                </div>
                <div className="row-start-4 col-start-1 lg:row-start-3 lg:col-start-2">
                    {
                        isAdmin() ? 
                            <OverrideButton onClick={props.startGame}>Start Game</OverrideButton>
                            :
                            ""
                    }
                </div>
                <div className="row-start-3 col-start-1 lg:col-start-3 lg:row-start-2 justify-items-center items-center justify-center">
                    <img className="m-auto w-20 lg:w-56" src={props.currentTeam === 0 ? whale : Whale} onClick={() => {if(props.currentTeam != 0 && !isAdmin()){props.selectTeam(0)}}}></img>
                    <h1 className="text-2xl lg:text-5xl text-center">{props.teamTwo.name}</h1>
                    <div className="grid grid-cols-1">
                        <div className="text-xl lg:text-3xl text-center">Players</div>
                        {
                            props.teamTwo.players ? 
                            Object.keys(props.teamTwo.players).map((name, i) =>
                            (
                                <div key={i} className="text-lg lg:text-2xl">{props.teamTwo.players[name]}</div>
                            )
                            )
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
            :
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    props.setPlayerName(evt.target[0].value);
                }}
                id="playerName"
            >
                <h1>Click an icon to select team!</h1>
                <div class="flex items-center">
                <input
                    className=""
                    type="text"
                    placeholder="Player Name"
                    className="h-10 placeholder-gray-400 text-gray-700 relative bg-white rounded text-md shadow outline-none focus:outline-none focus:shadow-outline"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-auto px-2 rounded">
                Set Name
                </button>
                </div>
            </form>
            }
        </div>
    );
}
// writeUserData(props.gameState)
