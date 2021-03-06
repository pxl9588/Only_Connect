import { useState } from "react";
import OverrideButton from "./OverrideButton";
import TextField from "@material-ui/core/TextField";
import ButtonCorrect from "./ButtonCorrect";
import Whale from "../images/whale.png";
import Seal from "../images/seal.png";
import { firebase } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";
export const id = "Hello";

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
    const [teamOne, setTeamOne] = useState("");
    const [teamTwo, setTeamTwo] = useState("");

    return (
        <div className="bg-mt-20">
            <h1 className=" text-5xl sm:text-7xl md:text-7xl lg:text-7xl xl:text-9xl text-center">
                Sole Relation
            </h1>
            ;
            <div className="mt-20 flex justify-center">
                <div style={{ left: `-5%`, position: "relative" }}>
                    <h2 className="text-3xl text-center">Team 1:</h2>
                    <h2 className="text-5xl text-center">{props.teamOne}</h2>
                    <img className="object-contain" src={Whale}></img>
                    <div className="justify-center flex">
                        <form
                            onSubmit={(evt) => {
                                evt.preventDefault();
                                props.setName("teamOne", teamOne);
                            }}
                            id="teamOne"
                        >
                            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                <input
                                    type="text"
                                    placeholder="Team One Name"
                                    onChange={(e) => {
                                        setTeamOne(e.target.value);
                                    }}
                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                                />
                            </div>
                            <div
                                style={{ left: "15%", top: "2%", position: "relative" }}
                                className="justify-content flex"
                            >
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Set Team Name
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <div
                    className="w-28 h-28 flex bg-blue-500 hover:bg-blue-700" 
                    
                > </div> */}
                <div style={{ left: `$5%`, position: "relative" }}>
                    <h2 className="text-3xl text-center">Team2:</h2>
                    <h2 className="text-5xl text-center">{props.teamTwo}</h2>
                    <img className="object-contain" src={Seal}></img>
                    <div className="flex justify-center ">
                        <form
                            value={teamTwo}
                            id="teamTwo"
                            onSubmit={(evt) => {
                                evt.preventDefault();
                                props.setName("teamTwo", teamTwo);
                            }}
                        >
                            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                <input
                                    type="text"
                                    placeholder="Team Two Name"
                                    onChange={(e) => {
                                        setTeamTwo(e.target.value);
                                    }}
                                    value={teamTwo}
                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                                />
                            </div>
                            <div
                                style={{ left: `15%`, top: "2%", position: "relative" }}
                                className="justify-content flex"
                            >
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Set Team Name
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div
                style={{ left: `-2%`, position: "relative" }}
                className="mt-20 flex justify-center"
            >
                <OverrideButton onClick={props.startGame}>Start Game</OverrideButton>
            </div>
        </div>
    );
}
// writeUserData(props.gameState)
