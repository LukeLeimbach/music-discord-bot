const { createEmbed } = require('../components/embed.js');
const { devTestChannelId } = require('../config.json');

async function getEmbedMessageId(guildId) {
  const { getEmbedMessageId } = await import('../helpers/queue.mjs');
  return getEmbedMessageId(guildId);
}

// Updates the music embed based off a message
// TODO: Update based on snapshot change
// TODO: Consider maximum queue sizes + embed hard limits
module.exports = {
  updateEmbed: async (client, guildId, updateActionRow=false) => {
    // Create new embed
    const embed = createEmbed();
    const messageId = await getEmbedMessageId(guildId);
    const guild = client.guilds.cache.get(guildId);
    const channel = guild.channels.cache.get(devTestChannelId);
  
    if (!messageId || !channel) return;

    let message = false;
    
    try {
      message = await channel.messages.fetch(messageId).catch(console.error);
    } catch (error) {
      console.log('[!] Unable to fetch message from channel in updateEmbed\n', error);
    }
    
    if (!message) return;
    
    if (!updateActionRow) {
      const { getQuerySnapshot } = await import('./queue.mjs');
    
      // Get snapshot of queue sorted in reverse order
      await getQuerySnapshot(guild.id).then((snapshot) => {
        const queue = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => a.order - b.order).reverse();

        // update embed's fields
        queue.map((val, index) => {
          if (queue.length - index == 1) embed.setThumbnail(val.thumbnailURL);
          embed.addFields({
            name: `${queue.length - index == 1 ? '**Now Playing**  => ' : ((queue.length - index) + ')')} ${val.song}`,
            value: `Artist: ${val.artist} | Duration: ${Math.round(val.duration_s * 100 / 60) / 100} mins | Explicit: ${val.explicit ? 'Yes' : 'No'}`
          });
        });
      }).then(() => {
        message.edit({ embeds: [embed] }).catch(console.error('[!] Embed message did not update with Firebase queue'));
      });
    }
  }
}
