// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "wall-music-discord-bot.firebaseapp.com",
  databaseURL: "https://wall-music-discord-bot-default-rtdb.firebaseio.com",
  projectId: "wall-music-discord-bot",
  storageBucket: "wall-music-discord-bot.appspot.com",
  messagingSenderId: "537087045620",
  appId: "1:537087045620:web:17bb1625d22555942fd3a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);