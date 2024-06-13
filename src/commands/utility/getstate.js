const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('getstate')
		.setDescription('Provides information about the player\'s state.'),
	async execute(interaction) {
		await interaction.reply(`FIXME: Implement getstate command.`);
	},
};
