import { useEffect, useState } from "react";
import {BrowserRouter} from 'react-router-dom'
import "./tailwind.css";
import "./Components/PSWall";
import Game from "./Components/Game";
// import firebase from "firebase";
import { firebase } from "./Components/firebaseConfig";
import { id } from "./Components/HomePage";
import { GameIDProvider } from "./context/GameID.context";
var database = firebase.database();

function App() {
    const [authUser,setAuthUser] = useState(null)
    const [user, setUser] = useState(null);
    useEffect(() => {
      return firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          alert(`signed in as: ${user.uid}`)
          setAuthUser({ ...user });
        } else {
          // User is signed out.
          console.log('not signed in')
          setAuthUser(null);
          firebase
            .auth()
            .signInAnonymously()
            .catch((error) => {
              alert("Unable to connect to the server. Please try again later.");
            });
        }
      });
    },[])

    useEffect(() => {
      if (!authUser) {
        setUser(null);
        return;
      }
      const userRef = firebase.database().ref(`/users/${authUser.uid}`);
      function update(snapshot) {
        if (snapshot.child("name").exists()) {
          setUser({
            ...snapshot.val(),
            id: authUser.uid,
            authUser,
            setAuthUser,
          });
        } else {
          userRef.update({
            games: {},
            
          });
        }
      }
      userRef.on("value", update);
      return () => {
        userRef.off("value", update);
      };
    }, [authUser]);
  

    return (
      <BrowserRouter>
      {/* <GameIDProvider> */}
        <div className="App h-screen w-screen overflow-hidden">
            <Game></Game>
        </div>
      {/* </GameIDProvider> */}
       
      </BrowserRouter>
       
    );
}

export default App;
