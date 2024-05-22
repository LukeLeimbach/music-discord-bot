const { EmbedBuilder, AttachmentBuilder } = require('discord.js');


class EmbedController {
  /**
   * Represents an EmbedController object.
   * 
   * @constructor
   * @param {PlayerController} playerController - The supervising PlayerController instance.
   * @param {FirestoreController} FirestoreController - The FirestoreController instance.
   */
  constructor(playerController, FirestoreController) {
    this.FirestoreController = FirestoreController;
    this.playerController = playerController;
    this.guildID = playerController.guildID;
    this.textChannel = null;
    this.banner = new AttachmentBuilder(__dirname + '../../img/banner.png');
    this.logopng = new AttachmentBuilder(__dirname + '../../img/logo.png');
    this.isReady = false;
    this.embedMessage = null;
    this.actionRow = null;
    this.embed = null;

    this._initialize();
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
    const textChannel = await this.FirestoreController.getClientTextChannel();
    if (!textChannel) {
      console.log('[-] Error in _clearTextChannel, Failed to get text channel');
      // TODO: Handle this error
      return false;
    }
  }

  async __test__() {
    console.log('[+] NO TESTS IN EMBED CONTROLLER');
  }
}

module.exports = { EmbedController };
