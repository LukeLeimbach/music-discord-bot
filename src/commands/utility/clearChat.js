const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearchat')
		.setDescription('Clears the chat.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		if (interaction.member.id != '264225001492840448') return;
    if (interaction.channelId != '1221863218855546900') return;
    console.log('here')
    await interaction.channel.bulkDelete(100);
	},
};
