const { joinVoiceChannel, VoiceConnection, getVoiceConnection  } = require('@discordjs/voice');
const { player } = require('./player');
const { BaseInteraction } = require('discord.js');

module.exports = {
  /**
   * Creates a new connection based on interaction
   * 
   * @param {BaseInteraction} interaction 
   * @returns {VoiceConnection | undefined}
   */
  createConnection: (interaction) => {
    // Ensure user is in a voice channel
    if (!interaction.member.voice.channel) {
      console.error('[!] Tried to create connection without voice channel');
      return;
    }

    const vc = interaction.member.voice.channel;
    let connection;

    try {
      connection = joinVoiceChannel({
        channelId: vc.id,
        guildId: interaction.guildId,
        adapterCreator: vc.guild.voiceAdapterCreator
      });
      console.log('[+] Successfully created connection')
      return connection
    } catch (err) {
      console.error('[!] Error creating connection: ', err);
      return undefined;
    }
  },

  /**
   * Destroys the connection and unsubscribes
   * 
   * @param {VoiceConnection} connection 
   */
  destroyConnection: (connection) => {
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
  },

  /**
   * Creates a subscription to the connection.
   * 
   * @param {VoiceConnection} connection Guild's voice connection
   * @returns subscription
   */
  createSubscription: (connection) => {
    // Create new subscription
    if (!(connection instanceof VoiceConnection)) {
      console.error('[!] Cannot create subscription because connection is not VoiceConnection!');
    }
    try {
      const subscription = connection.subscribe(player);
      console.log('[+] Subscription created successfully');
      return subscription;
  } catch (err) {
      console.error('[!] Error creating subscription:', err);
      return null;
  }
  }
}