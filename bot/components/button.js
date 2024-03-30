const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { player } = require('../helpers/audio_handling/player.js');

// -- Buttons--
// Pause and Play
const togglePlay = new ButtonBuilder()
  .setCustomId('togglePlay')
  .setStyle(ButtonStyle.Primary);

// Skip
const skip = new ButtonBuilder()
  .setCustomId('skip')
  .setLabel('⏭')
  .setStyle(ButtonStyle.Primary);

// Back
const back = new ButtonBuilder()
  .setCustomId('back')
  .setLabel('⏮')
  .setStyle(ButtonStyle.Primary);

// Stop
const stop = new ButtonBuilder()
  .setCustomId('stop')
  .setLabel('⏹')
  .setStyle(ButtonStyle.Danger);

// Shuffle
const shuffle = new ButtonBuilder()
  .setCustomId('shuffle')
  .setLabel('🔀')
  .setStyle(ButtonStyle.Secondary);

// Loop
const loop = new ButtonBuilder()
  .setCustomId('loop')
  .setLabel('🔁')
  .setStyle(ButtonStyle.Secondary);

// Concatenate all buttons into row
module.exports = {
  actionRow: () => {
    let isPlaying;
    if (player.state.status === AudioPlayerStatus.Paused || player.state.status === AudioPlayerStatus.Idle || player.state.status === AudioPlayerStatus.AutoPaused) isPlaying = true;
    else isPlaying = false;
    const row = new ActionRowBuilder()
      .addComponents(isPlaying ? togglePlay.setLabel('▶️') : togglePlay.setLabel('⏸'), skip, stop, shuffle, loop);
    return row;
  }
}
