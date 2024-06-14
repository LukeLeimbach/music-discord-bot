const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { createTextChannel, client, getChannelFromID } = require('../helpers/client');
const { __test__, updateActionRow, updateEmbed, sendEmbed } = require('./embedCommands');


class EmbedController {
  /**
   * Represents an EmbedController object. Requires _initialize() to be called before use.
   * 
   * @constructor
   * @param {GuildController} GuildController - The supervising GuildController instance.
   */
  constructor(GuildController) {
    this.banner = new AttachmentBuilder(__dirname + '../../../img/logo.png'); // FIXME: Create new banner
    this.logo = new AttachmentBuilder(__dirname + '../../../img/logo.png');
    this.GuildController = GuildController;
    this.FirestoreController = GuildController.FirestoreController;
    this.guildID = GuildController.guildID;
    this.textChannel = null;
    this.embedMessage = null;
    this.embed = new EmbedBuilder();
    this.actionRow = new ActionRowBuilder();
    this.isReady = false;
  }


  async _initialize() {
    const textChannelID = await this.FirestoreController.getClientTextChannel();
    if (!client.channels.cache.has(textChannelID) || !textChannelID) this.textChannel = await createTextChannel(this.guildID);
    else this.textChannel = await getChannelFromID(await this.FirestoreController.getClientTextChannel());
    this.updateEmbed();
    this.updateActionRow();
    this.sendEmbed();
    this.isReady = true;
    console.log('[+] Successfully Initialized EmbedController');
  }

  /**
   * Updates the given actionRow object.
   * 
   * @returns {void}
   */
  updateActionRow() {
    return updateActionRow(this)
  }

  /**
   * Updates the given embed object with the specified properties.
   * 
   * @returns {void}
   */
  updateEmbed() {
    return updateEmbed(this);
  }

  /**
   * Sends the embed to the EmbedController's text channel. If the text channel is not set, a new one is created.
   * 
   * @returns {Promise<boolean>} A promise that resolves to true if the embed was successfully sent, false otherwise.
   */
  async sendEmbed() {
    return await sendEmbed(this)
  }


  async __test__() {
    await __test__();
  }
}

module.exports = { EmbedController };
