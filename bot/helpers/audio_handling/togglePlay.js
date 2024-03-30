const { AudioPlayerStatus, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { player } = require('./player.js');
const { joinVoice } = require('./joinVoice.js');
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
      joinVoice(interaction);
    }

    if (res) console.log('[+] Good play button interaction');
    else console.log('[!] Bad play button interaction');

    // Update action row to reflect changes in player
    interaction.update({ components: [actionRow()] });
  },
};
