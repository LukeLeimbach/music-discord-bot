const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { createTextChannel, client, getChannelFromID } = require('../helpers/client');
const { __test__ } = require('./embedCommands');
const {
  togglePlayBtn,
  skipBtn,
  backBtn,
  stopBtn,
  shuffleBtn,
  loopBtn,
} = require('../components/button');


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


  updateActionRow(toDefault=true) {
    const isPlaying = this.GuildController.PlayerController.AudioPlayer.state.status === AudioPlayerStatus.Playing;
    if (toDefault) {
      this.actionRow
        .addComponents(
          isPlaying ? togglePlayBtn.setLabel('▶️') : togglePlayBtn.setLabel('⏸'),
          skipBtn,
          stopBtn,
          shuffleBtn,
          loopBtn
        );
    }
  }


  updateEmbed(toDefault=true) {
    if (toDefault) {
      this.embed
        .setColor(0x0099FF)
        .setTitle('Wall Music')
        .setURL('https://wall-music-discord-bot.firebaseapp.com')
        .setDescription('Type a song into the channel to get started!')
        .setThumbnail('attachment://logo.png')
        .setImage('attachment://logo.png')
        .setTimestamp()
        .setFooter({ text: 'COMMANDS', iconURL: 'attachment://logo.png' });
    }
  }


  /**
   * Sends the embed to the EmbedController's text channel. If the text channel is not set, a new one is created.
   * 
   * @returns {Promise<boolean>} A promise that resolves to true if the embed was successfully sent, false otherwise.
   */
  async sendEmbed() {
    if (!this.textChannel) {
      console.warn('[!] Warn in sendEmbed, Failed to get text channel. Creating a new one...');
      this.textChannel = await createTextChannel();
    }

    try {
      this.embedMessage = await this.textChannel.send({
        embeds: [this.embed],
        components: [this.actionRow],
        files: [this.logo], // "this.banner," FIXME: Add this back in when banner is uploaded
      });
      return true;
    } catch (error) {
      console.error('[-] Error in sendEmbed, Failed to send embed:', error);
      return false;
    }
  }


  async __test__() {
    await __test__();
  }
}

module.exports = { EmbedController };
