const { Events } = require('discord.js');
const { client } = require('../helpers/client');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
    // Type 3: buttons
    // Type 2: command
    console.log(
      '[+] Interaction received! Type:',
      interaction.type == 3
        ? 'Button'
        : 'Command'
    );

    // DO NOT ALTER: Command handler
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
    
      if (!command) {
        console.error(`[-] No command matching ${interaction.commandName} was found.`);
        return;
      }
    
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: '[-] There was an error while executing this command!', ephemeral: true });
        } else {
          await interaction.reply({ content: '[-] There was an error while executing this command!', ephemeral: true });
        }
      }
    }

    // Button handler
    else if (interaction.isButton()) {
      await client.guildManager.interactionHandler.handleButtonInteraction(interaction);
    }

    else {
      console.error('[-] Interaction type not recognized.');
      interaction.reply('Tell Frank what kind of interaction this is GYATTTT DAYM');
    }
	},
}
