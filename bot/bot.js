// This file contains the Discord Bot Client event listeners
// Start this file with >nodemon in console

// nice error handling for discord.js:   https://stackoverflow.com/questions/70309005/best-way-to-do-error-handling-in-a-discord-js-bot
// Link to banner.png -> https://imgur.com/a/4k996Fi

// For backend -> Send all requests as events, and have a listener module to handle all requests

// Dependencies
const {Client, IntentsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
require('dotenv').config({ path: '../.env' });
const EMB = require('./embed.js');
const BTN = require('./button.js');

// Constants
const BOT_ID = 924079497412767844;

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
        EMB.defaultEmbed.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()});
        
        message.channel.send({ embeds: [EMB.defaultEmbed], components: [BTN.actionRow] });
    }
});


// Start client
client.login(process.env.REACT_APP_BOT_TOKEN);
