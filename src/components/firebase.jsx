import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCFtDP7cN98sEMGDdy8WqalG_Ja07iP-n4",
  authDomain: "pr13-f3e51.firebaseapp.com",
  databaseURL: "https://pr13-f3e51-default-rtdb.firebaseio.com",
  projectId: "pr13-f3e51",
  storageBucket: "pr13-f3e51.appspot.com",
  messagingSenderId: "548560296836",
  appId: "1:548560296836:web:a8b7395cc30a7d92cc9bd1"
  };

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const authh = getAuth(app);

export { authh, GoogleAuthProvider, signInWithPopup,database ,app};

export const auth = firebase.auth();
export const handleLogout = () => {
  auth.signOut().then(() => {
    window.location.href = "/";
  });
};