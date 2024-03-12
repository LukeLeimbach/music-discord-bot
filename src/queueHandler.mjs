import db from './firebaseConfig.mjs';
import { collection, doc, onSnapshot } from "firebase/firestore";

// If "queue" is a variable, ensure it's defined; if it's a collection name, it should be a string
const test = "test"; // Replace with your collection name or variable

// Reference to the document and its sub-collection
const docRef = doc(db, "test", "1");
const colRef = collection(docRef, test); // Adjusted to use the collection reference correctly

// Listening to the docRef spot in db
onSnapshot(colRef, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // Assuming each document in the collection has a 'notes' field
    console.log(doc.id, " => ", doc.data().test);
  });
});