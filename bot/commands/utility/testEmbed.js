const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { embed } = require('../../components/embed.js');

const banner = new AttachmentBuilder(__dirname + '../../../img/banner.png');
const logopng = new AttachmentBuilder(__dirname + '../../../img/logo.png');

// Gets the queue as a list of doc objects
async function updateEmbedQueue(interaction) {
	const { getQuerySnapshot } = await import('../../helpers/queue.mjs');

	await getQuerySnapshot(interaction.guildId).then((snapshot) => {
		const queue = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		})).sort((a, b) => a.order - b.order).reverse();

		queue.map((val, index) => {
			embed.addFields({
				name: `${(queue.length - index) == 1 ? 'Now Playing' : (queue.length - index)}) Song: ${val.song}`,
				value: `Artist: ${val.artist} | Duration: ${Math.round(val.duration_s * 100 / 60) / 100} mins | Explicit ${val.explicit ? 'Yes' : 'No'}`
			});
		});
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testembed')
		.setDescription('Tests the embed.'),
	async execute(interaction) {
		await updateEmbedQueue(interaction).then(emb => {
			interaction.reply({ embeds: [embed], files: [banner, logopng] });
		})
	},
};
