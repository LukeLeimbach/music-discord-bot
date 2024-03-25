import { collection, getDocs, query, where, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import getDb from './firebaseConfig.mjs';

export async function getQuerySnapshot(guildId) {
  const queue = await getDocs(collection(getDb(), "guilds", guildId, "queue"));
  return queue;
}

export async function addToQueue(guildId, song, artist, thumbnailURL, explicit, duration_s) {
  console.log(`[...] Adding "${song}" to queue`);
  const db = getDb();
  const queueRef = collection(db, "guilds", guildId, "queue");
  const snapshot = await getDocs(queueRef);
  const order = snapshot.size;

  await setDoc(doc(db, "guilds", guildId, "queue", (artist + '_' + song).replace(/\s/g, "_")), {
    song: song,
    artist: artist,
    thumbnailURL: thumbnailURL,
    explicit: explicit,
    duration_s: duration_s,
    order: order,
  }).then(
    console.log(`[+] Added "${song}" to queue`)
    ).catch((reason) => {
      console.log(`[!] Could not add "${song}" to queue\nReason:\n${reason}`)
    });
}

// Function to delete a queue item by its order or ID
export async function deleteQueueItem(guildId, { order, id }) {
  const db = getDb();
  const queueRef = collection(db, "guilds", guildId, "queue");
  
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
      await deleteDoc(doc(db, "guilds", guildId, "queue", docToDelete.id));
    }
  }
}

// Sets the Message ID of the 
export async function setEmbedMessageId(guildId, messageId) {
  const db = getDb();

  await setDoc(doc(db, "guilds", guildId), {
    embedMessageId: messageId,
  }).then(
    console.log(`[+] Sent embed message ID to Firestore for guild ${guildId}`)
  ).catch((reason) => {
    console.log(`[!] Could not send embed message ID to Firestore for guild ${guildId}\nReason:\n${reason}`)
  });
}

export async function getEmbedMessageId(guildId) {
  const db = getDb();
  const docRef = doc(db, "guilds", guildId);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data().embedMessageId; // Returns the embedMessageId field
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null; // Indicates no document found for that guildId
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null; // Handle errors or indicate failure
  }
}