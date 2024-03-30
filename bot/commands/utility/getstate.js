const { SlashCommandBuilder } = require('discord.js');
const { player } = require('../../helpers/audio_handling/player.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getstate')
		.setDescription('Provides information about the player\'s state.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Player's state: ${player.state.status}`);
	},
};
