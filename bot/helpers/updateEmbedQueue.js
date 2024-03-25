const { embed } = require('../components/embed.js');

// Updates the music embed based off a message
// TODO: Update based on snapshot change
// TODO: Consider maximum queue sizes + embed hard limits
module.exports = {
  updateEmbedQueue: async (message) => {
    const { getQuerySnapshot } = await import('../helpers/queue.mjs');

    // Get snapshot of queue sorted in reverse order
    await getQuerySnapshot(message.guildId).then((snapshot) => {
      const queue = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => a.order - b.order).reverse();
  
      // Clear all existing fields (to prevent duplicaiton)
      embed.setFields = [];
      // Then update fields
      queue.map((val, index) => {
        if (queue.length - index == 1) embed.setThumbnail(val.thumbnailURL);
        embed.addFields({
          name: `${queue.length - index == 1 ? '**Now Playing** => ' : ((queue.length - index) + ')')} ${val.song}`,
          value: `Artist: ${val.artist} | Duration: ${Math.round(val.duration_s * 100 / 60) / 100} mins | Explicit: ${val.explicit ? 'Yes' : 'No'}`
        });
      });
    });
  }
}
