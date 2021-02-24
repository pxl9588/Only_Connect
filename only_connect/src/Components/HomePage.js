import React from "react";
import OverrideButton from "./OverrideButton";
import TextField from "@material-ui/core/TextField";
import Whale from '../images/whale.png'
import Seal from '../images/seal.png'
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBVW4nxJbj2K0sLhzMM8yLUardBYR6hIrs",
    authDomain: "ocbackend.firebaseapp.com",
    databaseURL: "https://ocbackend-default-rtdb.firebaseio.com",
    projectId: "ocbackend",
    storageBucket: "ocbackend.appspot.com",
    messagingSenderId: "614462186004",
    appId: "1:614462186004:web:e2a77517a15b91006a3d01",
    measurementId: "G-2MB7M8V461"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  function writeUserData(name, email) {
    database.ref('user2/').set({
      username: name,
      email: email
    });
  }


export default function HomePage(props) {
    return (
        <div className="mt-20">
            <h1 className="text-9xl text-center">Sole Relation</h1>;
            <div className="mt-20 flex justify-center">
                <div style={{ left: `-5%`, position: "relative" }}>
                    <h2 className="text-3xl text-center">Team 1:</h2>
                    <img src={Whale} alt={Whale}></img>
                    <div className='justify-center flex'>
                    <TextField
                        id='teamOne'
                        size={"medium"}
                        onChange={props.setName}
                        value={props.teamOneName}
                        margin="normal"
                        autoFocus
                    ></TextField>
                    </div>
                </div>
                <div style={{ left: `$5%`, position: "relative" }}>
                    <h2 className="text-3xl text-center">Team2:</h2>
                    <img src={Seal} alt={Seal}></img>
                    <div className='flex justify-center '>
                    <TextField id='teamTwo'onChange={props.setName} value={props.teamTwoName} margin="normal" autoFocus></TextField>
                    </div>
                </div>
            </div>
            <div
                style={{ left: `-2%`, position: "relative" }}
                className="mt-20 flex justify-center"
            >
                <OverrideButton onClick={() => {writeUserData('Bloop','Blap')}}>Start Game</OverrideButton>
            </div>
        </div>
    );
}
