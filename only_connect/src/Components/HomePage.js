import React from "react";
import OverrideButton from "./OverrideButton";
import TextField from "@material-ui/core/TextField";
import ButtonCorrect from "./ButtonCorrect";
import Whale from '../images/whale.png'
import Seal from '../images/seal.png'


export default function HomePage(props) {
    return (
        <div className="mt-20">
            <h1 className="text-9xl text-center">Sole Relation</h1>;
            <div className="mt-20 flex justify-center">
                <div style={{ left: `-5%`, position: "relative" }}>
                    <h2 className="text-3xl text-center">Team 1:</h2>
                    <img src={Whale}></img>
                    <div className='justify-center flex'>
                    <TextField
                        size={"medium"}
                        value={"Hello"}
                        margin="normal"
                        autoFocus
                    ></TextField>
                    </div>
                </div>
                <div style={{ left: `$5%`, position: "relative" }}>
                    <h2 className="text-3xl text-center">Team2:</h2>
                    <img src={Seal}></img>
                    <div className='flex justify-center '>
                    <TextField value={"Hello"} margin="normal" autoFocus></TextField>
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
