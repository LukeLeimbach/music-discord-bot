const { EmbedBuilder } = require('discord.js');
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


async function __test__() {
  console.log('embed tests');
}


const defaultEmbed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('Wall Music')
  .setURL('https://wall-music-discord-bot.firebaseapp.com')
  .setDescription('Type a song into the channel to get started!')
  .setThumbnail('https://raw.githubusercontent.com/LukeLeimbach/music-discord-bot/bot/img/Logo.webp')
  .setImage('attachment://banner.png')
  .setTimestamp()
  .setFooter({ text: 'COMMANDS', iconURL: 'attachment://logo.png' });


module.exports = {
  _clearTextChannel,
  __test__,
  defaultEmbed,
}