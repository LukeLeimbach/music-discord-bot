// This file contains the Discord Bot Client event listeners
// Start this file with >nodemon in console

// nice handling for discord.js:   https://stackoverflow.com/questions/70309005/best-way-to-do-error-handling-in-a-discord-js-bot

// Imports
const {Client, IntentsBitField} = require('discord.js');
require('dotenv').config();

// Constants
const BOT_ID = 924079497412767844;

// Helper Functions
// Determines if an object belongs to the client
function is_client(obj=NaN) {
    let id;
    try {
        id = obj.author.id;
    } catch (_) {
        try {
            id = obj.user.id;
        } catch (_) {
            console.log(`[!] Error in is_client(). Incorrect object passed.\nobj: ${obj}`)
            return NaN;
        }
    }

    return id == BOT_ID;
};

// Init client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Log on ready
client.on('ready', (c) => {
    console.log(`[+] ${c.user.username} has come online.`);
});

// Check for a test message
client.on('messageCreate', (message) => {
    // Doesn't respond to self
    if (is_client(message)) return;

    // respond to test with test
    if (message.content === 'test') {
        message.reply('test');
    }
});

client.login(process.env.BOT_TOKEN);
