import firebase from "firebase/app";
import database from "firebase/database";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyD5sYUDmjtZQl11SMpVepn_CHLOSdkKoRQ",
    authDomain: "sole-relation.firebaseapp.com",
    databaseURL: "https://sole-relation-default-rtdb.firebaseio.com",
    projectId: "sole-relation",
    storageBucket: "sole-relation.appspot.com",
    messagingSenderId: "1081140521353",
    appId: "1:1081140521353:web:27b1c18cdafb0f41611958",
    measurementId: "G-TX2X8JPJD3"
  };
// Initialize Firebase

function initFireBase() {
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

initFireBase();

export { firebase };
