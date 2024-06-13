const { Events } = require('discord.js');


module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
    if (message.author.bot) return;
    console.log(`[+] Message: ${message.content}`);
	},
}
