const { collection, query, onSnapshot } = require("firebase/firestore");
const getDb = require("./firebaseConfig.js");
const { updateEmbed } = require('./updateEmbed.js');

const db = getDb();

module.exports.listenToQueueChanges = (client) => {
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
