const { Events } = require('discord.js');
const { devTestChannelId } = require('../config.json');
const { isClient } = require('../helpers/isClient.js');
const { updateEmbedQueue } = require('../helpers/updateEmbedQueue.js')
const { actionRow } = require('../components/button.js');
const { embed, banner, logopng } = require('../components/embed.js');
require('dotenv').config({path:__dirname+'../../../.env'})

// Dynamic imports to use add messages to queue if typed
async function addToQueue(guildId, content) {
  const { addToQueue } = await import('../helpers/queue.mjs');
  const { getSpotifyInfo } = await import('../helpers/spotify.mjs');

  getSpotifyInfo(content).then(({ song, artist, thumbnailURL, explicit, duration_s }) => {
    addToQueue(guildId, song, artist, thumbnailURL, explicit, duration_s);
  });
}

async function getEmbedMessageId(guildId) {
  const { getEmbedMessageId } = await import('../helpers/queue.mjs');

  return await getEmbedMessageId(guildId);
}

// Add song to queue if in correct channel
module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
    // Ignoring client messages for now
    if (isClient(message)) return;

    // Ignoring messages outside testing channel
    if (message.channelId != devTestChannelId) return;

    // Now were 100% inside the testing channel listening for user input
    // so when we get a message, we add it to queue, update the embed, then send it
    await addToQueue(message.guildId, message).then(() => {
      updateEmbedQueue(message).then(() => {
        getEmbedMessageId(message.guildId).then((msg) => {
          msg.update({ embeds: [embed], components: [actionRow], files: [banner, logopng] });
        })
      });
    });
	},
};
