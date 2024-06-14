const { Events } = require('discord.js');
const { enqueue } = require('../controllers/firestoreCommands');
const { youtubeHandler } = require('../controllers/YoutubeHandler');
const { client } = require('../helpers/client');


module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
    if (message.author.bot) return;

    if (!client.guildManager) {
      console.error('[-] Error in messageCreate, GuildManager not initialized / found as client property.');
      return;
    }

    const embedTextChannel = client.guildManager.guildDefaultTextChannelIDMap.get(message.guild.id);
    console.log('---embedTextChannel:', embedTextChannel)

    if (!embedTextChannel) {
      console.error('[-] Error in messageCreate, Default text channel not found for guild:', message.guild.id);
      return;
    }

    if (message.channel.id !== embedTextChannel) {
      console.warn('[!] Warn in messageCreate, Message not sent in default text channel, ignoring.');
      return;
    }

    const songObject = await youtubeHandler.getTopVideoInfo(message.content);
    const didEnqueue = await enqueue(message.guild.id, songObject);
    if (!didEnqueue) {
      console.log('[-] Error in messageCreate, Failed to enqueue song:', songObject);
    }
	},
}
