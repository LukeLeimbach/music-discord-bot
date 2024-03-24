const { ButtonBuilder, ButtonStyle } = require('discord.js');

// -- Buttons--
// Pause and Play
const playPause = new ButtonBuilder()
    .setCustomId('confirm')
    .setLabel('⏸')
    .setStyle(ButtonStyle.Primary);

// Skip
const skip = new ButtonBuilder()
    .setCustomId('skip')
    .setLabel('⏭')
    .setStyle(ButtonStyle.Primary);

// Skip
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
const actionRow = new ActionRowBuilder()
    .addComponents(playPause, skip, stop, shuffle, loop);


module.exports = {
  actionRow: actionRow,
}
