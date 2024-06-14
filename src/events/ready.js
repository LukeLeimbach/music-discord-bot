const { Events } = require('discord.js');
const { __test__ } = require('../helpers/__test__');
const { cacheGuilds } = require('../helpers/client');
const { GuildManager } = require('../controllers/GuildManager');
const { clientInitiatedEmitter } = require('../helpers/eventEmitters');


module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    // await __test__(); // Run tests before client is ready
    await cacheGuilds();
    console.log('[+] Client Ready');

    // Initialize GuildManager
    client.guildManager = new GuildManager();
    try {
      await client.guildManager._initialize();
      client.guildManager.interactionHandler
        ? console.log('[+] GuildManager initialized')
        : console.log('[-] GuildManager failed to initialize');
      clientInitiatedEmitter.emit('clientInitiated');
      
    } catch (error) {
      console.error('[-] Error initializing GuildManager:', error);
    }
  }
};
