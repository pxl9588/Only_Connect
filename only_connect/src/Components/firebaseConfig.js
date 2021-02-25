import firebase from "firebase/app";
import database from "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyBVW4nxJbj2K0sLhzMM8yLUardBYR6hIrs",
    authDomain: "ocbackend.firebaseapp.com",
    databaseURL: "https://ocbackend-default-rtdb.firebaseio.com",
    projectId: "ocbackend",
    storageBucket: "ocbackend.appspot.com",
    messagingSenderId: "614462186004",
    appId: "1:614462186004:web:e2a77517a15b91006a3d01",
    measurementId: "G-2MB7M8V461",
};
// Initialize Firebase
function initFireBase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

initFireBase();

export { firebase };
