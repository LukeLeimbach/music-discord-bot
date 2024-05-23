const { Events } = require('discord.js');
const { __test__ } = require('../helpers/__test__');


module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    await __test__();
    console.log('[+] Client Ready');
  },
};
