import { useEffect } from "react";
import "./tailwind.css";
import "./Components/PSWall";
import Game from "./Components/Game";
import firebase from "firebase";
import { id } from "./Components/HomePage";
var database = firebase.database();

function App() {
    return (
        <div className="App h-screen w-screen overflow-hidden">
            <Game></Game>
        </div>
    );
}

export default App;
