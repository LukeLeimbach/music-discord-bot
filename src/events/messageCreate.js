const { Events } = require('discord.js');
const { enqueue } = require('../controllers/firestoreCommands');
const { youtubeHandler } = require('../controllers/YoutubeHandler');
const { getClientTextChannel } = require('../controllers/firestoreCommands');


module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
    // FIXME: If the message is outside the cached text channels, ignore it.
    if (message.author.bot) return;
    console.log(`[+] Message: ${message.content}`);
    const songObject = await youtubeHandler.getTopVideoInfo(message.content);
    const didEnqueue = await enqueue(message.guild.id, songObject);
    if (!didEnqueue) {
      console.log('[-] Error in messageCreate, Failed to enqueue song:', songObject);
    }
	},
}
