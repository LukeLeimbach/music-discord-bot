const { Events } = require('discord.js');

async function listenToQueueChanges(client) {
  const { listenToQueueChanges } = await import('../helpers/queueChangeListener.mjs');
  return listenToQueueChanges(client);
}

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log('[+] Client Ready');
		client.guilds.fetch().then(guilds => {
			guilds.forEach(guild => {
				console.log(guild.id);
				// Ensure each guild has a music text channel
				// Ensure there's an embed message, create one if not, then call listenToQueueChanges
			});
		});
		listenToQueueChanges(client);
	},
};
