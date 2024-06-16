const { createAudioPlayer, NoSubscriberBehavior, PlayerSubscription } = require('@discordjs/voice');
const {
  joinVC,
  destroyConSub,
  play,
  isUserInVC,
  _validateInteraction,
} = require('./playerCommands');
const { ButtonInteraction } = require('discord.js');

/**
 * Represents a player controller for managing audio playback
 */
class PlayerController {
  /**
   * Represents a PlayerController.
   * @constructor
   * @param {GuildController} GuildController - The parent GuildController.
   */
  constructor(GuildController) {
    this.parentGuildController = GuildController;
    this.AudioPlayer = createAudioPlayer({behaviors: {noSubscriber: NoSubscriberBehavior.Stop}});
    this.connection = null;
    this.subscription = null;
  }


  /**
   * INTERACTION BASED: Connects to the .
   * Handles interaction upon failure.
   * 
   * @param {ButtonInteraction} interaction - The interaction object.
   */
  async joinVC(interaction) {
    return await joinVC(this.AudioPlayer, interaction);
  }

  /**
   * Destroys the connection and subscription for the player.
   */
  destroyConSub() {
    console.log('Subscription:', this.subscription);
    destroyConSub(this.subscription);
    this.subscription = null;
    this.connection = null;
  }

  /**
   * INTERACTION BASED: Joins the vc and plays the next song in the queue.
   * 
   * @param {Interaction} interaction - The interaction object.
   * @returns {PlayerSubscription|null} Object subscription if successful, null otherwise.
   */
  async play(interaction) {
    // TODO: Handle error by retrying connect
    // this.AudioPlayer.on('error', (error) => {
    //   console.error('[-] Error in play. Retrying in 5 seconds:', error.message);
    //   setTimeout(() => this.play(interaction), 5000);
    // });
    
    this.subscription = await play(this.parentGuildController.QueueController, this.AudioPlayer, interaction);
    if (!this.subscription) return null;
    this.connection = this.subscription.connection;
  }

  /**
   * INTERACTION BASED: Checks if the user responsible for interaction is currently in a voice channel.
   * Handles interaciton upon failure.
   * 
   * @param {ButtonInteraction} interaction - The interaction object representing the user's interaction with the bot.
   * @returns {boolean} Returns true if the user is in a voice channel, false otherwise.
   */
  async isUserInVC(interaction) {
    return await isUserInVC(interaction);
  }

  /**
   * INTERACTION BASED: Validates the interaction object.
   * Handles interaction upon failure.
   *
   * @param {ButtonInteraction} interaction - The interaction object to validate.
   * @returns {boolean} Returns true if the interaction is valid, false otherwise.
   */
  async _validateInteraction(interaction) {
    return await _validateInteraction(interaction);
  }
}


module.exports = { PlayerController };