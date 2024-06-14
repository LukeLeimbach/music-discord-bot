const { AudioPlayer, PlayerSubscription, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { ButtonInteraction } = require('discord.js');
const ytdl = require('ytdl-core');
const { Song } = require('../helpers/Song');


/**
 * INTERACTION BASED: Connects to the .
 * Handles interaction upon failure.
 * 
 * @param {ButtonInteraction} interaction - The interaction object.
 * @param {AudioPlayer} audioPlayer - The audio player object.
 */
async function joinVC(audioPlayer, interaction) {
  // Validate interaction, handle interaction if failed
  if (!(await _validateInteraction(interaction))) {
    console.error('[-] Error in createConSub, Invalid interaction:', interaction);
    return null;
  }

  // Define join config
  const joinConfig = {
    channelId: interaction.member.voice.channel.id,
    guildId: interaction.guild.id,
    adapterCreator: interaction.guild.voiceAdapterCreator,
  }

  // Create connection and subscription, handle interaction if failed
  try {
    const con = joinVoiceChannel(joinConfig);
    const sub = con.subscribe(audioPlayer);
    return sub;
  } catch (error) {
    console.error('[-] Error in createConSub, Failed to create connection/subscription:', error);
    await interaction.reply({ content: 'Something has gone horribly wrong, try again.', ephemeral: true })
    return null;
  }
}


/**
 * Destroys the connection and subscription.
 *
 * @param {PlayerSubscription} sub - The subscription object.
 */
function destroyConSub(sub) {
  try {
    const con = sub.connection;
    sub.unsubscribe();
    con.destroy();
  } catch (error) {
    console.error('[-] Error in destroyConSub, Failed to destroy connection/subscription:', error);
  }
}

/**
 * INTERACTION BASED: Validates the interaction object.
 * Handles interaction upon failure.
 *
 * @param {ButtonInteraction} interaction - The interaction object to validate.
 * @returns {boolean} Returns true if the interaction is valid, false otherwise.
 */
async function _validateInteraction(interaction) {
  if (!interaction.type) {
    console.error('[-] Error in _validateInteraction, Invalid interaction:', interaction);
    await interaction.reply({ content: 'Something has gone horribly wrong, try again.', ephemeral: true })
    return false;
  }

  if (interaction.type != 3) {
    console.error('[-] Error in _validateInteraction, Invalid interaction type:', interaction.type);
    await interaction.reply({ content: 'Something has gone horribly wrong, try again.', ephemeral: true })
    return false;
  }

  if (interaction.bot) {
    console.error('[-] Error in _validateInteraction, Bot cannot interact:', interaction);
    await interaction.reply({ content: '!', ephemeral: true })
    return false;
  }

  return true;
}


/**
 * INTERACTION BASED: Checks if the user responsible for interaction is currently in a voice channel.
 * Handles interaciton upon failure.
 * 
 * @param {ButtonInteraction} interaction - The interaction object representing the user's interaction with the bot.
 * @returns {boolean} Returns true if the user is in a voice channel, false otherwise.
 */
async function isUserInVC(interaction) {
  // Get the guild
  // Check if the user is in a VC
  // Return true if the user is in a VC, false otherwise

  if (!_validateInteraction(interaction)) {
    console.error('[-] Error in _isUserInVC, Invalid interaction');
    return false;
  }

  if (!interaction.member.voice.channel) {
    console.warn('[!] Warn in isUserInVC, User not in VC');
    await interaction.reply({ content: 'Join a voice channel bozo.', ephemeral: true })
    return false;
  }

  return true;
}


/**
 * Creates an audio resource for the given song.
 *
 * @param {Song} song - The song object
 * @returns {AudioResource|null} The created audio resource or null if an error occurred.
 */
function _createAudioResource(song) {
  try {
    const stream = ytdl(song.url, { filter: 'audioonly' });
    return createAudioResource(stream);
  } catch (error) {
    console.error('[-] Error in _createAudioResource, Failed to create audio resource:', error);
    return null;
  }
}


/**
 * INTERACTION BASED: Joins the vc and plays the next song in the queue.
 * TODO: Handle interaction in interactionCreate.js based on return value.
 * 
 * @param {QueueController} queueController - The queue controller object.
 * @param {AudioPlayer} audioPlayer - The audio player object.
 * @param {Interaction} interaction - The interaction object.
 * @returns {Object|null} Returns { connection, subscription } if successful, null otherwise.
 */
async function play(queueController, audioPlayer, interaction) {
  // Check if user is in VC
  if (!(await isUserInVC(interaction))) return false;

  // Check if queue exists
  if (queueController.queueLen() == 0) {
    console.warn('[!] Warning in _play, Queue is empty. Cannot play. Interaction handled.');
    await interaction.reply({ content: 'The queue is empty bozo. Queue something up by typing the name of the song in the text channel.', ephemeral: true });
    return null;
  }
  
  // Dequeue Song
  if (await queueController.queueLen() == 0) {
    console.warn('[!] Warning in _play, Queue is empty. Cannot play. Interaction handled.');
    await interaction.reply({ content: 'The queue is empty bozo. Queue something up by typing the name of the song in the text channel.', ephemeral: true });
    return null;
  }
  
  // Create con/sub
  const subscription = await joinVC(audioPlayer, interaction);

  if (!subscription) {
    console.error('[-] Error in _play, Failed to create connection/subscription.');
    await interaction.reply({ content: 'The bot could not connect to the voice channel. Please try again.', ephemeral: true })
    return null;
  }

  const song = await queueController.dequeue();
  if (!song) {
    console.error('[-] Error in _play, Failed to dequeue song.');
    await interaction.reply({ content: 'There is (supposed to be) nothing in the queue.', ephemeral: true })
    return null;
  }

  if (!song) {
    console.error('[-] Error in _play, Failed to dequeue song.');
    await interaction.reply({ content: 'The song failed to dequeue! Please try again.', ephemeral: true })
    return null;
  }

  // Create the audio resource
  const audioResource = _createAudioResource(song);

  // Begin Playing
  try {
    audioPlayer.play(audioResource);
  } catch (error) {
    console.error('[-] Error in _play, Failed to play audio:', error);
    await interaction.reply({ content: 'Something has gone horribly wrong, try again.', ephemeral: true })
    return null;
  }

  // Interaction will be handled by the caller
  return subscription;
}


async function __audio_player_test__() {
  return;
}



module.exports = {
  joinVC,
  destroyConSub,
  isUserInVC,
  play,
  _validateInteraction,
  _createAudioResource,
  __audio_player_test__,
};