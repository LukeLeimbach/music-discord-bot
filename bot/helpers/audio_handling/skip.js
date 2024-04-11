const { player } = require('./player');
const { playerInfo } = require('./playerInfo');

export async function skip(interaction) {
  const { skipInQueue, getQueue } = await import('../queue.mjs');

  getQueue(interaction.guildId).then(queue => {
    if (queue.exists() && queue.length > 0) {
      skipInQueue(interaction).then(() => {
        console.log('[+] Queue successfully skipped');
        play(queue, interaction);
      }).catch(err => {
        console.error('[!] Error in queue skip: ', err);
      });
    } else {
      console.warn('[-] Queue does not exist! Destroying player and resource');
      player.stop();
      playerInfo.connection = null;
      playerInfo.subscription = null;
    }
  }).catch(err => {
    console.error('[!] Error in getting queue: ', err);
  });
}