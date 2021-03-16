import { useEffect, useState } from "react";
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

    const isAdmin = () =>
    {
        return false;
    }

    const isCapitain = () =>
    {
        return false;
    }

    return (
        <div className="bg-mt-20 justify-center">
            <div className="grid grid-flow-row justify-items-center lg:px-72">
                <div className="row-start-2 justify-items-center items-center">
                    <img className="m-auto w-20 lg:w-56" src={(props.currentTeam === 1) ? seal : Seal} onClick={() => {if(props.currentTeam != 1 && !isAdmin()){props.selectTeam(1)}}}></img>
                    <h1 className="text-2xl lg:text-5xl text-center">{props.teamOne.name}</h1>
                    {
                        (isCapitain() && props.currentTeam === 1) ?
                        <form
                            onSubmit={(evt) => {
                                evt.preventDefault();
                                props.setName("teamOne", evt.target[0].value);
                            }}
                            id="teamOne"
                        >
                            <input
                                className=""
                                type="text"
                                placeholder="Team One Name"
                                className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline pr-10"
                            />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Set Name
                            </button>
                        </form>
                        :
                        ""
                    }
                    

                    <div className="grid grid-cols-1">
                        <div className="text-xl lg:text-3xl text-center">Players</div>
                        {
                            Object.keys(props.teamOne.players).map((name,i) =>
                            (
                                <div key={i} className="text-left text-lg lg:text-2xl">{props.teamOne.players[name]}</div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-start-2">
                    <h1 className=" text-5xl sm:text-7xl md:text-7xl lg:text-7xl xl:text-9xl">
                        Sole Relation
                    </h1>
                </div>
                <div className="row-start-3 col-start-2">
                    {
                        isAdmin() ? 
                            <OverrideButton onClick={props.startGame}>Start Game</OverrideButton>
                            :
                            <form
                                onSubmit={(evt) => {
                                    evt.preventDefault();
                                    props.setPlayerName(evt.target[0].value);
                                }}
                                id="playerName"
                            >
                                <h1>Click an icon to select team!</h1>
                                <input
                                    className=""
                                    type="text"
                                    placeholder="Player Name"
                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline pr-10"
                                />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Set Name
                                </button>
                            </form>
                    }
                </div>
                <div className="col-start-3 row-start-2 justify-items-center items-center justify-center">
                    <img className="m-auto w-20 lg:w-56" src={props.currentTeam === 0 ? whale : Whale} onClick={() => {if(props.currentTeam != 0 && !isAdmin()){props.selectTeam(0)}}}></img>
                    <h1 className="text-2xl lg:text-5xl text-center">{props.teamTwo.name}</h1>
                    {
                        (isCapitain() && props.currentTeam === 0) ?
                        <form
                            onSubmit={(evt) => {
                                evt.preventDefault();
                                props.setName("teamTwo", evt.target[0].value);
                            }}
                            id="teamTwo"
                        >
                            <input
                                type="text"
                                placeholder="Team Two Name"
                                className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline pr-10"
                            />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Set Name
                            </button>
                        </form>
                        :
                        ""
                    }
                    <div className="grid grid-cols-1">
                        <div className="text-xl lg:text-3xl text-center">Players</div>
                        {
                            Object.keys(props.teamTwo.players).map((name, i) =>
                            (
                                <div key={i} className="text-lg lg:text-2xl">{props.teamTwo.players[name]}</div>
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
// writeUserData(props.gameState)
