const { Events } = require('discord.js');
const { devTestChannelId } = require('../config.json');
const { isClient } = require('../helpers/isClient.js');
const { getTopVideoInfo } = require('../helpers/youtubeHandler.js');
require('dotenv').config({path:__dirname+'../../../.env'});

// Dynamic imports to use add messages to queue if typed
async function addToQueue(guildId, content) {
  const { addToQueue } = await import('../helpers/queue.mjs');

  await getTopVideoInfo(content).then(({ url, song, artist, thumbnailURL }) => {
    addToQueue(guildId, url, song, artist, thumbnailURL);
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
    // add song to queue
    await addToQueue(message.guildId, message.content).then(() => {
      message.delete();
    });
	},
}
