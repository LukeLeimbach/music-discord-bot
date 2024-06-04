const { SlashCommandBuilder } = require('discord.js');
const { updateClientTextChannelID } = require('../../controllers/firestoreCommands.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setchannel')
		.setDescription("Sets Wall Music's text channel."),
	async execute(interaction) {
    console.log('[+] Interaction: setchannel')
    try {
      console.log(interaction.guild.id, interaction.channel.id);
      await updateClientTextChannelID(interaction.guild.id, interaction.channel.id);
      await interaction.reply({content: '✅ Text channel has been updated.', ephemeral: true});
    } catch (error) {
      // FIXME: Prompt user again or retry
      console.log('[-] Error in setchannel, Failed to update text channel:', error);
    }
	},
};
