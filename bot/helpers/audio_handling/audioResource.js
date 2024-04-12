const ytdl = require('ytdl-core');
const { createAudioResource, AudioResource } = require('@discordjs/voice');
const { BaseInteraction } = require('discord.js');

module.exports = {
  /**
   * Returns a streaming resource from a Youtube URL
   * 
   * @param {BaseInteraction} interaction
   * @returns {AudioResource}
   */
  getResource: async (interaction) => {
    const { getQuerySnapshot } = await import('../queue.mjs');

    // Get the videoUrl from Firestore queue
    let videoUrl = await getQuerySnapshot(interaction.guild.id).then(snapshot => {
      if (!snapshot) return 'https://www.youtube.com/watch?v=0lhhrUuw2N8';
      return snapshot.docs[snapshot.docs.length - 1].data().url;
    }).catch(err => {
      console.error('[!] Could not get Query Snapshot: ', err)
    });

    if (!videoUrl) {
      console.error('[!] No video url passed to joinVoice');
      // Windows OS error sound
      videoUrl = 'https://www.youtube.com/watch?v=0lhhrUuw2N8';
    }

    try {
      const stream = ytdl(videoUrl, { filter: 'audioonly' });
      return createAudioResource(stream);
    } catch (err) {
      console.error('[!] Could not create audio resource: ', err);
    }
  }
}