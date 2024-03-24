const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { defaultEmbed } = require('../../components/embed.js');

const banner = new AttachmentBuilder(__dirname + '../../../img/banner.png');
const logopng = new AttachmentBuilder(__dirname + '../../../img/logo.png');

async function getQueue(guildId) {
	const { getQueue } = await import('../../helpers/queue.mjs');

	await getQueue(guildId).then((queue) => {
		console.log(queue);
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testembed')
		.setDescription('Tests the embed.'),
	async execute(interaction) {
		await interaction.reply({ embeds: [defaultEmbed], files: [banner, logopng] });
		console.log(await getQueue(interaction.guildId));
	},
};
