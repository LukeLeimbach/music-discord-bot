const { createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { player } = require('./player.js');
const { voiceState } = require('./voiceState.js');
const ytdl = require('ytdl-core');

// Dynamic imports to use add messages to queue if typed
async function getQuerySnapshot(guildId) {
  const { getQuerySnapshot } = await import('../queue.mjs');

  return getQuerySnapshot(guildId)
}

module.exports = {
  joinVoice: async (interaction) => {
    const voiceChannel = interaction.member.voice.channel;
    const guildId = interaction.guildId;

    if (!voiceChannel) {
      console.log('[!] User is not in a voice channel.');
      return;
    }

    const videoUrl = await getQuerySnapshot(interaction.guild.id).then(snapshot => {
      return snapshot.docs[snapshot.docs.length - 1].data().url;
    });

    if (!videoUrl) {
      console.log('[!] No video url passed to joinVoice');
      // Windows OS error sound
      videoUrl ='https://www.youtube.com/watch?v=0lhhrUuw2N8';
    }
  
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guildId,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });

    const stream = ytdl(videoUrl, { filter: 'audioonly' });
    const resource = createAudioResource(stream);
  
    const subscription = connection.subscribe(player);

    player.play(resource);

    voiceState.connection = connection;
    voiceState.subscription = subscription;
  }
}
