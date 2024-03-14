import { collection, getDocs } from "firebase/firestore";
import getDb from './firebaseConfig.mjs';

export default async function getQueue(guildID) {
  // Query a reference to a subcollectio
  return await getDocs(collection(getDb(), "guilds", guildID, "queue"));
}

export async function getQueueSize(guildID) {
  var queue = await getQueue(guildID);
  return queue.size;
}

export async function addToQueue(guildID, song) {
  // Add new song element
  await setDoc(doc(getDb(), "guilds", guildID, "queue", artist + song), {
    song: song,
    artist: artist,
    thumbnailURL: "SOMETHING",
    next: "stop",
  });

}