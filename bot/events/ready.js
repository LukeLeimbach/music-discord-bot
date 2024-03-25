const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
    console.log('TODO [...] Retrieving guild IDs')
    console.log('TODO [...] Retrieving message IDs')
		console.log('[+] Client Ready');
	},
};
