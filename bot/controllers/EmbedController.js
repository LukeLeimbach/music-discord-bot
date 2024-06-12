const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { getDefaultTextChannel, createTextChannel, client } = require('../helpers/client');
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
    this.banner = new AttachmentBuilder(__dirname + '../../img/banner.jpg');
    this.logopng = new AttachmentBuilder(__dirname + '../../img/logo.png');
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
    this.updateEmbed(toDefault=true);
    this.updateActionRow(toDefault=true);
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
        .setImage('attachment://logo.jpg')
        .setTimestamp()
        .setFooter({ text: 'COMMANDS', iconURL: 'attachment://logo.png' });
    }
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
