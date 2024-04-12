const { Events } = require('discord.js');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { togglePlay } = require('../helpers/audio_handling/togglePlay.js');
const { skip } = require('../helpers/audio_handling/skip');
const { play } = require('../helpers/audio_handling/play');
const { player } = require('../helpers/audio_handling/player.js');

// Handle command interactions
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }
  
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
      }
    }
    
    // Handle button interactions
    else if (interaction.isButton()) {
      // Handle play button
      if (interaction.customId == 'togglePlay') {
        const s = player.state.status;
        if (s === AudioPlayerStatus.Idle) {
          console.log('[+] Initial play pressed');
          await play(interaction);
        }
        else if (s === AudioPlayerStatus.Paused || s === AudioPlayerStatus.Playing) {
          console.log('[+] Toggle play pressed');
          await togglePlay(interaction);
        }
      }

      // Handle skip button
      else if (interaction.customId == 'skip') {
        await skip(interaction);
      }
    }
	},
}
