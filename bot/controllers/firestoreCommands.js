const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, DocumentReference } = require('firebase-admin/firestore');
const { Message, TextChannel } = require('discord.js');
const path = require('path');

// Read the firebaseConfig.json file
const serviceAccount = require(path.resolve(__dirname, '../firebaseConfig.json'));

// Initialize Firebase app
initializeApp({
  credential: cert(serviceAccount)
});

// Get Firestore instance
const db = getFirestore();


// ------------------- GUILD CONTROLLER FUNCTIONS ------------------- //


/**
 * Retrieves all guild IDs from the Firestore collection.
 * @returns {Promise<string[]>} An array of guild IDs.
 */
async function getAllCachedGuildIDs() {
  try {
    const guildsSnapshot = await db.collection('guilds').get();
    const guildIDs = guildsSnapshot.docs.map(doc => doc.id);
    return guildIDs;
  } catch (error) {
    console.error('[-] Error in getAllGuildIDs, Unable to get all guild IDs:', error);
    return [];
  }
}


/**
 * Validates the guild ID.
 *
 * @param {string} guildID - The ID of the guild.
 * @returns {boolean} The validated guild ID or false if the guild ID is invalid.
 */
function _validateGuildID(guildID) {
  if (!guildID || 19 > guildID.length > 18 ) return false;
  return true;
}


/**
 * Retrieves the Firestore document reference for a specific guild ID.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {DocumentReference} The document reference for the guild.
 */
function _getQueueDocRef(guildID) {
  if (!_validateGuildID(guildID)) {
    console.error('[-] Error in _getQueueDocRef, Invalid guildID:', guildID);
    return null;
  }

  try {
    const docRef = db.collection('guilds').doc(guildID).collection('queue');
    return docRef;
  } catch (error) {
    console.error('[-] Error in _getQueueDocRef, Unable to get Queue Doc Ref:', error);
    return null;
  }
}


/**
 * Retrieves the queue snapshot for a given guild ID.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<firebase.firestore.DocumentSnapshot>} The queue snapshot.
 */
async function _getQueueSnapshot(guildID) {
  try {
    const queueDocRef = _getQueueDocRef(guildID);
    if (!queueDocRef) return null;

    const queueSnapshot = await queueDocRef.get();
    return queueSnapshot;
  } catch (error) {
    console.error('[-] Error in _getQueueSnapshot, Unable to get Queue Snapshot:', error);
  }
}


/**
 * Get the last queue order for a guild.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<number>} The last queue order. Returns 0 if the queue is empty.
 */
async function _getLastQueueOrder(guildID) {
  const queueSnapshot = await _getQueueSnapshot(guildID);
  if (!queueSnapshot) {
    console.error('[-] Error in _getLastQueueOrder, Invalid queue snapshot provided:', queueSnapshot);
    return 0;
  }

  const lastOrder = queueSnapshot.docs.length;
  return lastOrder;
}


/**
 * Validates and updates the order of the queue for a specific guild.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<boolean>} A promise that resolves once the queue order has been validated and updated.
 */
async function _validateQueue(guildID) {
  try {
    const queue = await getQueue(guildID);

    // Sort the queue by the "order" attribute
    queue.sort((a, b) => a.order - b.order);

    // Create a batch update
    const batch = _getQueueDocRef(guildID).firestore.batch();

    // Update the queue collection based on the sorted queue
    for (let i = 0; i < queue.length; i++) {
      const docID = queue[i].firebaseID;
      const docRef = _getQueueDocRef(guildID).doc(docID);
      batch.update(docRef, { order: i });
    }

    await batch.commit();
    return true;
  } catch (error) {
    console.error('[-] Error in _validateQueue:', error);
    return false;
  }
}


/**
 * Enqueues a song for a specific guild.
 * 
 * @param {string} guildID - The ID of the guild.
 * @param {Song} song - The song object to enqueue.
 * @returns {Promise<boolean>} A promise that resolves to true if the song was successfully enqueued, false otherwise.
 */
async function enqueue(guildID, song) {
  // Ensure that the song is valid before enqueueing
  if (!song || !song.isValid()) {
    console.error('[-] Error in enqueue, Invalid song:', song);
    return false;
  }

  const queueSnapshot = await _getQueueSnapshot(guildID);
  const queueDocRef = _getQueueDocRef(guildID);
  if (!queueSnapshot) {
    console.error('[-] Error in enqueue, Invalid queueDocRef:', queueSnapshot);
    return false;
  }

  song.order = await _getLastQueueOrder(guildID);
  
  try {
    const docID = song.firebaseID;
    await queueDocRef.doc(docID).set(song.forFirebase());
    return true;
  } catch (error) {
    console.error('[-] Error in enqueue, Unable to queue song:', error);
    return false;
  }
}


/**
 * Dequeues a song from the queue.
 * 
 * @param {string} guildID - The ID of the guild.
 * @param {boolean} [peek=false] - If true, only peeks at the first song without removing it.
 * @returns {Object|boolean} The dequeued song object if successful, or true if the queue is empty, or false if there was an error.
 */
async function dequeue(guildID, peek=false) {
  const queue = await getQueue(guildID);
  queue.sort((a, b) => a.order - b.order);

  if (queue.length === 0) {
    console.warn('[!] Queue is empty');
    return true;
  }

  const firstSong = queue[0];
  if (!peek) {
    try {
      const docID = `${firstSong.song}_${firstSong.artist}`.replace(/\s/g, '_');
      const docRef = _getQueueDocRef(guildID).doc(docID);
      await docRef.delete();
      await _validateQueue(guildID);
    } catch (error) {
      console.error('[-] Error in dequeue, Unable to delete song:', error);
      return false;
    }
  }

  return firstSong;
}


// TODO: Reset queue to empty if error is recieved in this section
/**
 * Retrieves the queue for a specific guild from Firestore.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<Object[]>} An array containing songs.
 */
async function getQueue(guildID) {
  try {
    const queueSnapshot = await _getQueueSnapshot(guildID);
    if (!queueSnapshot) {
      console.warn('[!] Queue snapshot')
      return [];
    }
  
    const queue = queueSnapshot.docs.map(doc => doc.data());
    return queue;
  } catch (error) {
    console.error('[-] Error in getQueue, returning [], Unable to get Queue:', error);
    return [];
  }
}


/**
 * Deletes all documents in the queue collection for a given guild.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<boolean>} A promise that resolves to true if the queue is successfully destroyed, false otherwise.
 */
async function destroyQueue(guildID) {
  const queueDocRef = _getQueueDocRef(guildID);
  if (!queueDocRef) {
    console.error('[-] Error in destroyQueue, Invalid queueDocRef:', queueDocRef);
    return false;
  }

  // Delete all docs in the queue collection
  try {
    const queueSnapshot = await queueDocRef.get();
    queueSnapshot.forEach(doc => doc.ref.delete());
    return true;
  } catch (error) {
    console.error('[-] Error in destroyQueue, Unable to delete queue:', error);
    return false;
  }
}


/**
 * Retrieves the length of the queue for a specific guild.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<number>} The length of the queue.
 */
async function queueLen(guildID) {
  return await _getLastQueueOrder(guildID);
}


// ------------------- FIRESTORE CONTROLLER FUNCTIONS ------------------- //


/**
 * Returns the Firestore document reference for a given guild ID.
 *
 * @param {string} guildID - The ID of the guild.
 * @returns {Object} The Firestore document reference for the guild.
 */
function _getGuildDocRef(guildID) {
  try {
    return db.collection('guilds').doc(guildID);
  } catch (error) {
    console.error('[-] Error in _getGuildDocRef, Unable to get Guild Doc Ref:', error);
    return null;
  }
}


/**
 * Updates the embed message for a specific guild.
 * 
 * @param {string} guildID - The ID of the guild.
 * @param {Message} message - Updated message object.
 * @returns {Promise<boolean>} A promise that resolves to true if the message was successfully updated, false otherwise.
 */
async function updateEmbedMessageID(guildID, message) {
  const guildDocRef = _getGuildDocRef(guildID);
  if (!guildDocRef) {
    console.error('[-] Error in updateEmbedMessageID, Invalid guildDocRef:', guildDocRef);
    return false;
  }

  try {
    const docSnapshot = await guildDocRef.get();
    if (docSnapshot.exists) {
      await guildDocRef.update({ embedMessage: message });
    } else {
      await guildDocRef.set({ embedMessage: message });
    }
    return true;
  } catch (error) {
    console.error('[-] Error in updateEmbedMessageID, Unable to update embed message:', error);
    return false;
  }
}


/**
 * Updates the embed message for a specific guild.
 * 
 * @param {string} guildID - The ID of the guild.
 * @param {TextChannel} textChannel - Updated text channel object.
 * @returns {Promise<boolean>} A promise that resolves to true if the text channel was successfully updated, false otherwise.
 */
async function updateClientTextChannelID(guildID, textChannel) {
  const guildDocRef = _getGuildDocRef(guildID);
  if (!guildDocRef) {
    console.error('[-] Error in updateClientTextChannelID, Invalid guildDocRef:', guildDocRef);
    return false;
  }

  try {
    await guildDocRef.update({ clientTextChannel: textChannel });
    return true;
  } catch (error) {
    console.error('[-] Error in updateClientTextChannelID, Unable to update client text channel:', error);
    return false;
  }
}


/**
 * Retrieves the client text channel for a given guild.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<TextChannel|null>} The ID of the client text channel, or null if not found or encountered an error.
 */
async function getClientTextChannel(guildID) {
  const guildDocRef = _getGuildDocRef(guildID);
  if (!guildDocRef) {
    console.error('[-] Error in getClientTextChannel, Invalid guildDocRef:', guildDocRef);
    return null;
  }

  try {
    const guildSnapshot = await guildDocRef.get();
    const guildData = guildSnapshot.data();
    if (!guildData.clientTextChannel) return guildData.clientTextChannel;
  } catch (error) {
    console.error('[-] Error in getClientTextChannel, Unable to get client text channel:', error);
    return null;
  }
}


/**
 * Retrieves the embed message for a guild from Firestore.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<Message|null>} A promise that resolves to the embed message, or null if an error occurs.
 */
async function getEmbedMessage(guildID) {
  const guildDocRef = _getGuildDocRef(guildID);
  if (!guildDocRef) {
    console.error('[-] Error in getEmbedMessage, Invalid guildDocRef:', guildDocRef);
    return null;
  }

  try {
    const guildSnapshot = await guildDocRef.get();
    const guildData = guildSnapshot.data();
    return guildData.embedMessage;
  } catch (error) {
    console.error('[-] Error in getEmbedMessage, Unable to get embed message:', error);
    return null;
  }
}


// ------------------- CLIENT FUNCTIONS ------------------- //

/**
 * Checks if a guild exists in Firestore.
 * 
 * @param {string} guildID - The ID of the guild to check.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the guild exists in Firestore.
 */
async function isGuildInFirestore(guildID) {
  const guildDocRef = _getGuildDocRef(guildID);
  if (!guildDocRef) {
    console.error('[-] Error in isGuildInFirestore, Invalid guildDocRef:', guildDocRef);
    return false;
  }

  try {
    const guildSnapshot = await guildDocRef.get();
    return guildSnapshot.exists;
  } catch (error) {
    console.error('[-] Error in isGuildInFirestore, Unable to check if guild exists:', error);
    return false;
  }
}


/**
 * Adds a guild to Firestore.
 * 
 * @param {string} guildID - The ID of the guild to add.
 * @returns {Promise<boolean>} A promise that resolves to true if the guild was added successfully, false otherwise.
 */
async function addGuildToFirestore(guildID) {
  const guildDocRef = _getGuildDocRef(guildID);
  if (!guildDocRef) {
    console.error('[-] Error in addGuildToFirestore, Invalid guildDocRef:', guildDocRef);
    return false;
  }

  try {
    await guildDocRef.set({});
    return true;
  } catch (error) {
    console.error('[-] Error in addGuildToFirestore, Unable to add guild to Firestore:', error);
    return false;
  }
}


// ------------------- TESTING ------------------- //

/**
 * A test function for firestoreController.js
 * 
 * TESTS INCLUDE:
 * - allGuilds
 * - _getQueueDocRef
 * - _getQueueSnapshot
 * - _getLastQueueOrder
 * - _validateQueue
 * - enqueue
 * - dequeue
 * - getQueue
 * - destroyQueue
 */
async function __test_guild_controller__() {
  const { youtubeHandler } = require('./YoutubeHandler.js');

  const testSong = await youtubeHandler.getTopVideoInfo('test')

  const targetGuildID = '261601676941721602';
  const queueDocRef = _getQueueDocRef(targetGuildID);
  console.log('[+] Queue Doc Ref created successfully');

  const queueSnapshot = await _getQueueSnapshot(targetGuildID);
  console.log('[+] Queue Snapshot created successfully');

  const queue = await getQueue(targetGuildID);
  const originalQueueLen = queue.length;
  console.log('[+] Original queue:', queue);

  const lastOrder = await _getLastQueueOrder(targetGuildID);
  console.log('[+] Order', lastOrder, 'with queue size', queue.length);

  const didEnqueue = await enqueue(targetGuildID, testSong);
  const newQueue = await getQueue(targetGuildID);
  const newQueueLen = newQueue.length;
  (newQueueLen == originalQueueLen + 1 && didEnqueue)
    ? console.log('[+] New Song added correctly')
    : console.error('[-] New song added incorrectly');

  const firstSong = await dequeue(targetGuildID);
  console.log('[+] Dequeued successfully');

  const didDestroyQueue = await destroyQueue(targetGuildID);
  didDestroyQueue
    ? console.log('[+] Queue destroyed successfully')
    : console.error('[-] Queue did not destroy successfully');

  console.log('[+] GuildController tests completed successfully!');
}

async function __test_firestore_controller__() {
  const guildID = '261601676941721602'; // Wall Moment Guild ID
  const messageID = '123456789012345678';
  const textChannelID = '123456789012345678';

  const didUpdateEmbedMessage = await updateEmbedMessageID(guildID, messageID);
  didUpdateEmbedMessage
    ? console.log('[+] Embed message updated successfully')
    : console.error('[-] Embed message did not update successfully');

  const didUpdateClientTextChannel = await updateClientTextChannelID(guildID, textChannelID);
  didUpdateClientTextChannel
    ? console.log('[+] Client text channel updated successfully')
    : console.error('[-] Client text channel did not update successfully');

  const clientTextChannel = await getClientTextChannel(guildID);
  console.log('[+] Client text channel:', clientTextChannel);

  const embedMessage = await getEmbedMessage(guildID);
  console.log('[+] Embed message:', embedMessage);

  console.log('[+] FirestoreController tests completed successfully!');
}


module.exports = {
  db,
  getAllGuildIDs: getAllCachedGuildIDs,
  enqueue,
  dequeue,
  getQueue,
  destroyQueue,
  queueLen,
  updateEmbedMessageID,
  updateClientTextChannelID,
  getClientTextChannel,
  getEmbedMessage,
  __test_guild_controller__,
  __test_firestore_controller__,
  isGuildInFirestore,
  addGuildToFirestore
}

// __test_guild_controller__();
// __test_firestore_controller__();