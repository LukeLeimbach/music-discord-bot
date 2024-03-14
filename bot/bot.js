// This file contains the Discord Bot Client event listeners
// Start this file with >nodemon in console

// nice error handling for discord.js:   https://stackoverflow.com/questions/70309005/best-way-to-do-error-handling-in-a-discord-js-bot
// Link to banner.png -> https://imgur.com/a/4k996Fi

// For backend -> Send all requests as events, and have a listener module to handle all requests

// Dependencies
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { Client, IntentsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const EMB = require('./components/embed.js');
const BTN = require('./components/button.js');
const HLP = require('./constants/is_client.js')

// Init client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

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
    if (HLP.is_client(message)) return;

    // respond to test with test
    if (message.content == 'test') {
        EMB.defaultEmbed.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()});
        
        message.channel.send({ embeds: [EMB.defaultEmbed], components: [BTN.actionRow] });
    }
});


// Start client
client.login(process.env.REACT_APP_BOT_TOKEN);
