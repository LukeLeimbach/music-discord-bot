// This file contains the Discord Bot Client event listeners
// Start this file with >nodemon in console

// nice error handling for discord.js:   https://stackoverflow.com/questions/70309005/best-way-to-do-error-handling-in-a-discord-js-bot

// Dependencies
const {Client, IntentsBitField} = require('discord.js');
const { EmbedBuilder } = require('discord.js');
require('dotenv').config({ path: '../.env' });

// Constants
const BOT_ID = 924079497412767844;

// Init default embed
const defaultEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('./img/banner.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

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
        console.log('[-] ERROR: is_client given incorrect object')
        console.log('Object:\n' + obj + '\n')
    }
};
// -- END Helper Functions


// Log on ready
client.on('ready', (c) => {
    console.log(`[+] ${c.user.username} has come online.`);
});


// TESTING
client.on('messageCreate', (message) => {
    // Doesn't respond to self
    if (is_client(message)) return;

    // respond to test with test
    if (message.content == 'test') {
        defaultEmbed.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()})
        message.channel.send({ embeds: [defaultEmbed] });
    }
});


// Start client
client.login(process.env.BOT_TOKEN);
