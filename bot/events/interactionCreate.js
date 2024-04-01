const { Events } = require('discord.js');
const { togglePlay } = require('../helpers/audio_handling/togglePlay.js');

// Handle command interactions
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      };
  
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
      };
    }
    
    // Handle button interactions
    else if (interaction.isButton()) {
      if (interaction.customId == 'togglePlay') {
        togglePlay(interaction);
      }
    };
	},
};