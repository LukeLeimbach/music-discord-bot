const { EmbedBuilder, AttachmentBuilder } = require('discord.js');


class EmbedController {
  constructor(guildID) {
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

      // TODO: Clear channel
      // TODO: Send default embed
      // TODO: Add action row
      // TODO: Update ready status
  }

  _clearTextChannel() {

  }
}

module.exports = { EmbedController };

function __test__() {
  const embedController = new EmbedController();
  embedController._initialize();
  console.log(embedController.embed);
  embedController.embed !== null
    ? console.log('[+] EmbedController successfully created embed')
    : console.log('[-] EmbedController failed to created embed');
}

__test__();