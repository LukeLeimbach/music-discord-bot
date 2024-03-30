const { Events } = require('discord.js');
const { createEmbed, logopng, banner } = require('../components/embed.js');
const { actionRow } = require('../components/button.js');
const { devTestChannelId } = require('../config.json');
const { updateEmbed } = require('../helpers/updateEmbed.js');
const { AudioPlayerStatus } = require('@discordjs/voice');

// Async function to read function from mjs file
async function listenToQueueChanges(client) {
  const { listenToQueueChanges } = await import('../helpers/queueChangeListener.mjs');
  return listenToQueueChanges(client);
}

async function setEmbedMessageId(guildId, messageId) {
  const { setEmbedMessageId } = await import('../helpers/queue.mjs');
  await setEmbedMessageId(guildId, messageId);
}

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    // For each guild
    client.guilds.cache.forEach(async (guild) => {
      // Clear the text channel when ready (currently dev testing channel)
      try {
        const fullGuild = await guild.fetch(); // Fetch the full guild object
        const channel = fullGuild.channels.cache.get(devTestChannelId);
        if (channel && channel.isTextBased()) { // Ensure the channel exists and is text-based
          await channel.bulkDelete(50).catch(console.error); // Attempt to clear the last 10 messages
          console.log(`[+] Cleared messages in ${channel.name}`);

          // Creates the embed
          console.log(`[...] Creating embed in ${channel.name}`);
          await channel.send({ embeds: [createEmbed()], files: [banner, logopng], components: [actionRow(AudioPlayerStatus.Paused)] }).then((message) => {
            console.log(`[+] Sent start embed message in ${channel.name}`);
            console.log(`[...] Sending embed message ID to Firestore for guild ${channel.guildId}`);
            setEmbedMessageId(channel.guildId, message.id);
            updateEmbed(client, channel.guildId);
          });
        } else {
          console.log(`[!] Channel not found in guild: ${fullGuild.name}`);
        }
      } catch (error) {
        console.error(`[!] Failed to clear messages in guild: ${guild.id}`, error);
      }
    });

    // Begin listening for db changes
    await listenToQueueChanges(client);

    // Broadcast ready
    console.log('[+] Client Ready');
  },
};
