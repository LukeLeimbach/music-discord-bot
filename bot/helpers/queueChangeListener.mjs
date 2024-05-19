import { collection, query, onSnapshot } from "firebase/firestore";
import getDb from "./firebaseConfig.mjs";
import { updateEmbed } from '../helpers/updateEmbed.js';

const db = getDb();

export const listenToQueueChanges = (client) => {
  client.guilds.cache.forEach(guild => {
    const guildId = guild.id;
    // Flag to track the first invocation of the snapshot listener for each guild
    let isFirstInvocation = true;
    
    const q = query(collection(db, "guilds", guildId, "queue"));
    
    onSnapshot(q, (snapshot) => {
      // Process changes only if it's not the first invocation
      if (!isFirstInvocation) {
        snapshot.docChanges().forEach(change => {
          updateEmbed(client, guildId).then(() => {
            console.log('[+] Embed Updated');
          });
        });
      } else {
        // Skip processing for the first invocation but log it or handle as needed
        console.log(`[+] Initial snapshot for guild ${guildId} received, skipping update.`);
      }
      // After the first invocation, set the flag to false so future changes are processed
      isFirstInvocation = false;
    });
  });
};
