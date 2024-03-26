import { collection, getDocs, query, where, deleteDoc, doc, setDoc } from "firebase/firestore";
import getDb from './firebaseConfig.mjs';

// Gets a snapshot of the query as a promise
export async function getQuerySnapshot(guildID) {
  const queue = await getDocs(collection(getDb(), "guilds", guildID, "queue"));
  return queue;
}

// Adds a song to queue (meant to call getSpotifyInfo for these args)
export async function addToQueue(guildID, song, artist, thumbnailURL, explicit, duration_s) {
  console.log("Adding to queue...");
  const db = getDb();
  const queueRef = collection(db, "guilds", guildID, "queue");
  const snapshot = await getDocs(queueRef);
  const order = snapshot.size;

  await setDoc(doc(db, "guilds", guildID, "queue", (artist + '_' + song).replace(/\s/g, "_")), {
    song: song,
    artist: artist,
    thumbnailURL: thumbnailURL,
    explicit: explicit,
    duration_s: duration_s,
    order: order,
  });
}

// Function to delete a queue item by its order or ID
export async function deleteQueueItem(guildID, { order, id }) {
  const db = getDb();
  const queueRef = collection(db, "guilds", guildID, "queue");
  
  // If an ID is provided, delete directly
  if (id) {
    await deleteDoc(doc(queueRef, id));
    return;
  }

  // If order is provided, query for the document with that order first
  if (order !== undefined) {
    const q = query(queueRef, where("order", "==", order));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docToDelete = snapshot.docs[0]; // Assuming order is unique and there's only one
      await deleteDoc(doc(db, "guilds", guildID, "queue", docToDelete.id));
    }
  }
}