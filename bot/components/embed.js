const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
require('dotenv').config({ path: '../.env' });

const banner = new AttachmentBuilder(__dirname + '../../img/banner.png');
const logopng = new AttachmentBuilder(__dirname + '../../img/logo.png');

const embed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('Wall Music')
  .setURL('https://wall-music-discord-bot.firebaseapp.com')
  .setDescription('Type a song into the channel to get started!')
  .setThumbnail('https://raw.githubusercontent.com/LukeLeimbach/music-discord-bot/bot/img/Logo.webp')
  .setImage('attachment://banner.png')
  .setTimestamp()
  .setFooter({ text: 'COMMANDS', iconURL: 'attachment://logo.png' });

// Init default embed
module.exports = {
  embed: embed,
  banner: banner,
  logopng: logopng,
}
