const { Events } = require('discord.js');
const { __test__ } = require('../helpers/__test__');
const { cacheGuilds } = require('../helpers/client');


module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    await __test__(); // Run tests before client is ready
    await cacheGuilds(); // Cache guilds before client is ready
    console.log('[+] Client Ready');
  },
};
