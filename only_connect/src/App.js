import { useEffect, useState, createContext, useContext } from "react";
import {BrowserRouter} from 'react-router-dom'
import "./tailwind.css";
import "./Components/PSWall";
import Game from "./Components/Game";
// import firebase from "firebase";
import { firebase } from "./Components/firebaseConfig";
import { SessionContext } from "./context/SessionContext";

var database = firebase.database();
export const id =  'Default'

function App() {
    const URLParam = window.location.pathname != '/' ? window.location.pathname : 'Default'
    const [user, setUser] = useState(null);
    let {authUser,setAuthUser} = useContext(SessionContext);

    useEffect(() => {
      return firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          setAuthUser({ ...user });
        } else {
          // User is signed out.
          console.log('not signed in')
          setAuthUser(null);
          firebase
            .auth()
            .signInAnonymously()
            .catch((error) => {
              alert("Unable to connect to the server");
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
        <div className="App h-screen w-screen overflow-hidden">
            <Game></Game>
        </div>
      </BrowserRouter>
       
    );
}

export default App;
