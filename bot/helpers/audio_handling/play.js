const { getVoiceConnection } = require('@discordjs/voice');
const { player } = require('./player');
const { createConnection, createSubscription } = require('./connection');
const { getResource } = require('./audioResource');
const { actionRow } = require('../../components/button.js');

module.exports = {
  play: async (interaction) => {
    // Stops playing (in case it isn't already) and destroys audio resource
    if (!player.stop()) console.error('[!] Player could not be stopped!');

    // Create new connection
    if (!getVoiceConnection(interaction.guildId)) {
      const connection = createConnection(interaction)
      if (!connection) {
        await interaction.reply({ content: 'Join a vc dumbass', ephemeral: true });
        return;
      }
      createSubscription(connection);
    }
  
    const resource = await getResource(interaction);

    player.play(resource);
    await interaction.update({ components: [actionRow()] });
  }
}
