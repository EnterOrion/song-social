import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFNx9fSTZJmrc-vbaxLFh2iUo4T6F-asA",
  authDomain: "onrepeat-94bd6.firebaseapp.com",
  databaseURL: "https://onrepeat-94bd6-default-rtdb.firebaseio.com",
  projectId: "onrepeat-94bd6",
  storageBucket: "onrepeat-94bd6.appspot.com",
  messagingSenderId: "267023826198",
  appId: "1:267023826198:web:288692b9be9418b61f2437",
  measurementId: "G-E4YHRNXCKQ",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = firebase.auth();
const checkAuth = getAuth();

export { db, auth, app, onAuthStateChanged, checkAuth };
