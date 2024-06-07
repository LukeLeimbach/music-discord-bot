const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { getDefaultTextChannel } = require('../helpers/client.js');
const { __test__ } = require('./embedCommands');


class EmbedController {
  /**
   * Represents an EmbedController object.
   * 
   * @constructor
   * @param {GuildController} GuildController - The supervising GuildController instance.
   * @param {FirestoreController} FirestoreController - The FirestoreController instance.
   */
  constructor(GuildController, FirestoreController) {
    this.FirestoreController = FirestoreController;
    this.GuildController = GuildController;
    this.guildID = GuildController.guildID;
    this.textChannel = null;
    this.banner = new AttachmentBuilder(__dirname + '../../img/banner.jpg');
    this.logopng = new AttachmentBuilder(__dirname + '../../img/logo.png');
    this.isReady = false;
    this.embedMessage = null;
    this.actionRow = null;
    this.embed = null;

    this._initialize();
  }

  _initialize() {
    // TODO: Update text channel
      // If in firebase, use firebase text channel
      // else, prompt user to set text channel with command
    // TODO: Clear channel
    // TODO: Send default embed
    // TODO: Add action row
    // TODO: Update ready status

    this.embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Wall Music')
      .setURL('https://wall-music-discord-bot.firebaseapp.com')
      .setDescription('Type a song into the channel to get started!')
      .setThumbnail('attachment://logo.png')
      .setImage('attachment://banner.jpg')
      .setTimestamp()
      .setFooter({ text: 'COMMANDS', iconURL: 'attachment://logo.png' });

    console.log('[+] Successfully Initialized EmbedController');
  }

  async sendEmbed() {
    const tc = await getDefaultTextChannel(this.guildID);
    console.log('[+] Sending embed...');
    try {
      await tc.send({ embeds: [this.embed], files: [this.banner, this.logopng] });
    } catch (error) {
      console.error('[-] Error in sendEmbed, Failed to send embed:', error);
    }
  }


  async __test__() {
    await __test__();
  }
}

module.exports = { EmbedController };
