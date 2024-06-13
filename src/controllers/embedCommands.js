const { FirestoreController } = require('./FirestoreController.js');
const { client, getDefaultTextChannel } = require('../helpers/client.js')


  // TODO: Update text channel
    // If in firebase, use firebase text channel
    // else, prompt user to set text channel with command
  // TODO: Clear channel
  // TODO: Send default embed
  // TODO: Add action row
  // TODO: Update ready status

/**
 * Clears the text channel for a given text channel.
 * 
 * @param {string} guildID - The ID of the guild.
 * @param {FirestoreController} FirestoreController - The FirestoreController instance.
 * @returns {boolean} Returns true if the text channel was cleared successfully, false otherwise.
 */
async function clearTextChannel(guildID, FirestoreController) {
  const textChannel = await FirestoreController.getClientTextChannel();
  if (!didGetTextChannel) {
    console.log('[-] Error in _clearTextChannel, Failed to get text channel');
    // TODO: Handle this error
    return false;
  }
}


async function __test__() {
  console.log('embed tests');
}


module.exports = {
  clearTextChannel,
  __test__,
}