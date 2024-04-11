const { createAudioResource, joinVoiceChannel, VoiceConnection } = require('@discordjs/voice');

const playerInfo = {
  connection: null,
  subscription: null,
}

module.exports = {
  playerInfo: playerInfo,

  /**
   * Creates a new connection based on interaction
   * 
   * @param {BaseInteraction} interaction 
   * @returns {VoiceConnection}
   */
  createConnection: async (interaction) => {
    // Ensure user is in a voice channel
    if (!interaction.voiceChannel.exists()) {
      console.error('[!] Tried to create connection without voice channel');
    }

    const vc = interaction.voiceChannel;
    let connection;

    try {
      connection = joinVoiceChannel({
        channelId: vc,
        guildId: interaction.guildId,
        adapterCreator: vc.guild.voiceAdapterCreator
      });
    } catch (err) {
      console.error('[!] Error creating connection: ', err);
      playerInfo.connection = null;
      return null;
    }

    playerInfo.connection = connection;
    return connection;
  },

  /**
   * Destroys the connection and unsubscribes
   * 
   * @param {VoiceConnection} connection 
   */
  destroyConnection: async (connection) => {
    try {
      connection.disconnect();
      console.log('[+] Disconnected from connection')
    } catch (err) {
      console.warn('[-] Could not disconnect from connection: ', err);
    }

    try {
      connection.destroy();
      console.log('[+] Successfully destroyed connection\nNOTE: The above action unsubscribes');
      return true;
    } catch (err) {
      console.error('[!] Could not destroy connection: ', err);
      return false;
    }
    
  }
}