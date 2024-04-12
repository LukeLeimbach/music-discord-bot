const { player } = require('./player');
const { play } = require('./play');

module.exports = {
  skip: async (interaction) => {
    const { skipInQueue, getQueue } = await import('../queue.mjs');
    
    const queue = await getQueue(interaction.guildId);
    console.log(`Queue: ${queue}`);
    if (queue.length > 0) {
      skipInQueue(interaction).then((nextSong) => {
        console.log('[+] Queue successfully skipped');
        play(interaction);
      }).catch(err => {
        console.error('[!] Error in queue skip: ', err);
      });
    } else {
      console.warn('[-] Queue does not exist! Destroying player and resource');
      player.stop();
    }
  }
}
