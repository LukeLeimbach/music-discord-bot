const { EmbedBuilder } = require('discord.js');
const { FirestoreController } = require('./FirestoreController.js');


/**
 * Clears the text channel for a given text channel.
 * 
 * @param {string} guildID - The ID of the guild.
 * @param {FirestoreController} FirestoreController - The FirestoreController instance.
 * @returns {boolean} - Returns true if the text channel was cleared successfully, false otherwise.
 */
async function _clearTextChannel(guildID, FirestoreController) {
  const textChannel = await FirestoreController.getClientTextChannel();
  if (!didGetTextChannel) {
    console.log('[-] Error in _clearTextChannel, Failed to get text channel');
    // TODO: Handle this error
    return false;
  }
}