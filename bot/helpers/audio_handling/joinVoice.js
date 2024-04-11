const { createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { player } = require('./player.js');
const { playerInfo } = require('./playerInfo.js');
const ytdl = require('ytdl-core');
const { createConnection } = require('./connection.js');

module.exports = {
  joinVoice: async (interaction) => {
    const { getQuerySnapshot } = await import('../queue.mjs');
    const voiceChannel = interaction.member.voice.channel;
    const guildId = interaction.guildId;

    if (!voiceChannel) {
      console.error('[!] User is not in a voice channel.');
      return;
    }

    const videoUrl = await getQuerySnapshot(interaction.guild.id).then(snapshot => {
      if (!snapshot.exists()) return 'https://www.youtube.com/watch?v=0lhhrUuw2N8';
      return snapshot.docs[snapshot.docs.length - 1].data().url;
    });

    if (!videoUrl) {
      console.error('[!] No video url passed to joinVoice');
      // Windows OS error sound
      videoUrl = 'https://www.youtube.com/watch?v=0lhhrUuw2N8';
    }
  
    const connection = await createConnection(interaction);

    const stream = ytdl(videoUrl, { filter: 'audioonly' });
    const resource = createAudioResource(stream);
  
    const subscription = connection.subscribe(player);

    player.play(resource);

    playerInfo.connection = connection;
    playerInfo.subscription = subscription;
  }
}
