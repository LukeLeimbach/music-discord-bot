const { AudioPlayerStatus } = require('@discordjs/voice');
const { player } = require('./player.js');
const { actionRow } = require('../../components/button.js');

module.exports = {
  togglePlay: async (interaction) => {
    console.log('[...] togglePlay button clicked');

    let res = false;
    if (player.state.status === AudioPlayerStatus.Playing) {
      res = player.pause(interpolateSilence=true);
    } else if (player.state.status === AudioPlayerStatus.Paused) {
      res = player.unpause();
    } else if (player.state.status === AudioPlayerStatus.Idle || player.state.status === AudioPlayerStatus.AutoPaused) {
      try {
        // TODO: Implement play here
        res = true;
      } catch (err) {
        console.log('[!] Error in joining voice. ', err)
      }
    }

    if (res) console.log('[+] Good play button interaction');
    else console.log('[!] Bad play button interaction');

    // Update action row to reflect changes in player
    interaction.update({ components: [actionRow()] });
  },
};
