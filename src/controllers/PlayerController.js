const { createAudioPlayer, NoSubscriberBehavior, PlayerSubscription } = require('@discordjs/voice');
const {
  joinVC,
  destroyConSub,
  play,
  isUserInVC,
  _validateInteraction,
} = require('./playerCommands');

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

  async joinVC(interaction) {
    return await joinVC(this.AudioPlayer, interaction);
  }

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
    this.subscription = await play(this.parentGuildController.QueueController, this.AudioPlayer, interaction);
    if (!this.subscription) return null;
    this.connection = this.subscription.connection;
  }

  async isUserInVC(interaction) {
    return await isUserInVC(interaction);
  }

  async _validateInteraction(interaction) {
    return await _validateInteraction(interaction);
  }
}


module.exports = { PlayerController };