// This file contains the Discord Bot Client event listeners
// Start this file with >nodemon in console

// nice error handling for discord.js:   https://stackoverflow.com/questions/70309005/best-way-to-do-error-handling-in-a-discord-js-bot
// Link to banner.png -> https://imgur.com/a/4k996Fi

// For backend -> Send all requests as events, and have a listener module to handle all requests

// Dependencies
const {Client, IntentsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
require('dotenv').config({ path: '../.env' });

// Constants
const BOT_ID = 924079497412767844;

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
	.setImage('https://github.com/LukeLeimbach/music-discord-bot/blob/bot/img/banner.png?raw=true')
	.setTimestamp()
	.setFooter({ text: 'COMMANDS', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


// -- Buttons
// Pause and Play
const playPause = new ButtonBuilder()
    .setCustomId('confirm')
    .setLabel('Pause')
    .setStyle(ButtonStyle.Primary);

// Skip
const skip = new ButtonBuilder()
    .setCustomId('skip')
    .setLabel('Skip')
    .setStyle(ButtonStyle.Primary);

// Stop
const stop = new ButtonBuilder()
    .setCustomId('stop')
    .setLabel('Stop')
    .setStyle(ButtonStyle.Danger);

// Shuffle
const shuffle = new ButtonBuilder()
    .setCustomId('shuffle')
    .setLabel('Shuffle')
    .setStyle(ButtonStyle.Secondary);

// Loop
const loop = new ButtonBuilder()
    .setCustomId('loop')
    .setLabel('Loop')
    .setStyle(ButtonStyle.Secondary);

// Concatenate all buttons into row
const actionRow = new ActionRowBuilder()
    .addComponents(playPause, skip, loop, shuffle, stop);
// -- END buttons

// Init client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// -- Helper Functions
// ---------------------------------------------------------------------
// Determines if an object belongs to the client
//      @param obj(object) -> message or author object.
//      
//      @return boolean -> Whether or not obj is from client.
// ---------------------------------------------------------------------
function is_client(obj=NaN) {
    if (Object.hasOwn(obj, 'author')) return obj.author.id == BOT_ID;
    if (Object.hasOwn(obj, 'id')) return obj.id == BOT_ID;
    else {
        console.log('[-] ERROR: is_client given incorrect object');
        console.log('Object:\n' + obj + '\n');
    }
};
// -- END Helper Functions


// ---------------------------------------------------------------------
// Log when ready.
//      Event listener.
// ---------------------------------------------------------------------
client.on('ready', (c) => {
    console.log(`[+] ${c.user.username} has come online.`);
});


// TESTING
client.on('messageCreate', (message) => {
    // Doesn't respond to self
    if (is_client(message)) return;

    // respond to test with test
    if (message.content == 'test') {
        defaultEmbed.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()});
        
        message.channel.send({ embeds: [defaultEmbed], components: [actionRow] });
    }
});


// Start client
client.login(process.env.BOT_TOKEN);
