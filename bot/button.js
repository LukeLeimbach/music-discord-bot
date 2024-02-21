const {Client, IntentsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');

// -- Buttons
// Pause and Play
const playPause = new ButtonBuilder()
    .setCustomId('confirm')
    .setLabel('Pause')
    .setStyle(ButtonStyle.Primary);

// Skip
const skip = new ButtonBuilder()
    .setCustomId('skip')
    .setLabel('Skip')
    .setStyle(ButtonStyle.Primary);

// Stop
const stop = new ButtonBuilder()
    .setCustomId('stop')
    .setLabel('Stop')
    .setStyle(ButtonStyle.Danger);

// Shuffle
const shuffle = new ButtonBuilder()
    .setCustomId('shuffle')
    .setLabel('Shuffle')
    .setStyle(ButtonStyle.Secondary);

// Loop
const loop = new ButtonBuilder()
    .setCustomId('loop')
    .setLabel('Loop')
    .setStyle(ButtonStyle.Secondary);

// Concatenate all buttons into row
const actionRow = new ActionRowBuilder()
    .addComponents(playPause, skip, loop, shuffle, stop);


module.exports = {
  actionRow: actionRow,
}
