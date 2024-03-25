const { SlashCommandBuilder } = require('discord.js');
const { embed, logopng, banner } = require('../../components/embed.js');
const { updateEmbedQueue } = require('../../helpers/updateEmbedQueue.js');

async function setEmbedMessageId(guildId, messageId) {
  const { setEmbedMessageId } = await import('../../helpers/queue.mjs');

  await setEmbedMessageId(guildId, messageId);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Tests the embed.'),
	async execute(interaction) {
		updateEmbedQueue(interaction).then(() => {
      console.log('[...] Sending start embed message')
			interaction.channel.send({ embeds: [embed], files: [banner, logopng] }).then((message) => {
        console.log('[+] Sent start embed message')
        console.log(`[...] Sending embed message ID to Firestore for guild ${interaction.guildId}`);
        setEmbedMessageId(interaction.guildId, message.id);
      });
		})
	},
};
