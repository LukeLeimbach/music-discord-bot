const { createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { player } = require('./player.js');
const { voiceState } = require('./voiceState.js');
const { getTopVideoUrl } = require('./youtubeHandler.js');
const ytdl = require('ytdl-core');

module.exports = {
  joinVoice: async (interaction) => {
    const voiceChannel = interaction.member.voice.channel;
    const guildId = interaction.guildId;

    if (!voiceChannel) {
      console.log('[!] User is not in a voice channel.');
      return;
    }

    let videoUrl;
    try {
      videoUrl = await getTopVideoUrl('camelot nle choppa');
    } catch (err) {
      console.log('[!] Error getting video URL', err)
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

    player.play(resource);
  
    const subscription = connection.subscribe(player);

    voiceState.connection = connection;
    voiceState.subscription = subscription;
  }
}