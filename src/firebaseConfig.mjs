import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import environment from "./settings.js";

let db = false;

const getDb = () => {
  if (!db) {
    const firebaseConfig = {
      apiKey: environment.FIREBASE_API_KEY,
      authDomain: "wall-music-discord-bot.firebaseapp.com",
      databaseURL: "https://wall-music-discord-bot-default-rtdb.firebaseio.com",
      projectId: "wall-music-discord-bot",
      storageBucket: "wall-music-discord-bot.appspot.com",
      messagingSenderId: "537087045620",
      appId: "1:537087045620:web:17bb1625d22555942fd3a1"
    };
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return db;
}

export default getDb