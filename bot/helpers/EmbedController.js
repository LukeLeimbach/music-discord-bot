const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { FirestoreController } = require('./FirestoreController.js');


class EmbedController {
  /**
   * Represents an EmbedController object.
   * 
   * @constructor
   * @param {string} guildID - The ID of the guild.
   * @param {FirestoreController} FirestoreController - The FirestoreController instance.
   */
  constructor(guildID, FirestoreController) {
    this.FirestoreController = FirestoreController;
    this.guildID = guildID;
    this.textChannel = null;
    this.banner = new AttachmentBuilder(__dirname + '../../img/banner.png');
    this.logopng = new AttachmentBuilder(__dirname + '../../img/logo.png');
    this.isReady = false;
    this.embedMessage = null;
    this.actionRow = null;
    this.embed = null;
  }

  _initialize() {
    this.embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Wall Music')
      .setURL('https://wall-music-discord-bot.firebaseapp.com')
      .setDescription('Type a song into the channel to get started!')
      .setThumbnail('https://raw.githubusercontent.com/LukeLeimbach/music-discord-bot/bot/img/Logo.webp')
      .setImage('attachment://banner.png')
      .setTimestamp()
      .setFooter({ text: 'COMMANDS', iconURL: 'attachment://logo.png' });


      // TODO: Update text channel
        // If in firebase, use firebase text channel
        // else, prompt user to set text channel with command
      // TODO: Clear channel
      // TODO: Send default embed
      // TODO: Add action row
      // TODO: Update ready status
  }

  async _clearTextChannel() {
    const didGetTextChannel = await this.FirestoreController.getClientTextChannel();
    if (!didGetTextChannel) {
      console.log('[-] Error in _clearTextChannel, Failed to get text channel');
      // TODO: Handle this error
      return false;
    }
  }
}

module.exports = { EmbedController };




// ----------------------- TESTING ------------------------------

function __test__() {
  const embedController = new EmbedController();
  embedController._initialize();
  console.log(embedController.embed);
  embedController.embed !== null
    ? console.log('[+] EmbedController successfully created embed')
    : console.log('[-] EmbedController failed to created embed');
}

__test__();