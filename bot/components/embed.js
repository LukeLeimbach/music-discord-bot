const {Client, IntentsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
require('dotenv').config({ path: '../.env' });

// Init default embed
const defaultEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Wall Music')
    .setURL('https://wall-music-discord-bot.firebaseapp.com')
    .setDescription('Queue:')
    .setThumbnail('https://raw.githubusercontent.com/LukeLeimbach/music-discord-bot/bot/img/Logo.webp')
    // .addFields(
    // 	{ name: 'Regular field title', value: 'Some value here' },
    // 	{ name: '\u200B', value: '\u200B' },
    // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
    // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
    // )
    .addFields({ name: 'Out My Body', value: 'lil loaded', inline: true })
    // .setImage('https://github.com/LukeLeimbach/music-discord-bot/blob/bot/img/banner.png?raw=true')
    .setTimestamp()
    .setFooter({ text: 'COMMANDS', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


module.exports = {
    defaultEmbed: defaultEmbed,
}