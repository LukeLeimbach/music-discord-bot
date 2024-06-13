const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');


// -- Buttons--
// Pause and Play
const togglePlayBtn = new ButtonBuilder()
  .setCustomId('togglePlay')
  .setStyle(ButtonStyle.Primary);

// Skip
const skipBtn = new ButtonBuilder()
  .setCustomId('skip')
  .setLabel('⏭')
  .setStyle(ButtonStyle.Primary);

// Back
const backBtn = new ButtonBuilder()
  .setCustomId('back')
  .setLabel('⏮')
  .setStyle(ButtonStyle.Primary);

// Stop
const stopBtn = new ButtonBuilder()
  .setCustomId('stop')
  .setLabel('⏹')
  .setStyle(ButtonStyle.Danger);

// Shuffle
const shuffleBtn = new ButtonBuilder()
  .setCustomId('shuffle')
  .setLabel('🔀')
  .setStyle(ButtonStyle.Secondary);

// Loop
const loopBtn = new ButtonBuilder()
  .setCustomId('loop')
  .setLabel('🔁')
  .setStyle(ButtonStyle.Secondary);

  
// Concatenate all buttons into row
module.exports = {
  togglePlayBtn,
  skipBtn,
  backBtn,
  stopBtn,
  shuffleBtn,
  loopBtn
}

// DEPRICATED: action row builder
// actionRow: () => {
//   let isPlaying;
//   if (player.state.status === AudioPlayerStatus.Paused || player.state.status === AudioPlayerStatus.Idle || player.state.status === AudioPlayerStatus.AutoPaused) isPlaying = true;
//   else isPlaying = false;
//   const row = new ActionRowBuilder()
//     .addComponents(isPlaying ? togglePlay.setLabel('▶️') : togglePlay.setLabel('⏸'), skip, stop, shuffle, loop);
//   return row;
// }