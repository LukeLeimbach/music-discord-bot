const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
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
  }

  async joinVC(interaction) {
    return await joinVC(this.AudioPlayer, interaction);
  }

  destroyConSub(con, sub) {
    return destroyConSub(con, sub);
  }

  /**
   * INTERACTION BASED: Joins the vc and plays the next song in the queue.
   * 
   * @param {Interaction} interaction - The interaction object.
   * @returns {Object|null} Object { connection, subscription } if successful, null otherwise.
   */
  async play(interaction) {
    return await play(this.parentGuildController.QueueController, this.AudioPlayer, interaction);
  }

  async isUserInVC(interaction) {
    return await isUserInVC(interaction);
  }

  async _validateInteraction(interaction) {
    return await _validateInteraction(interaction);
  }
}


module.exports = { PlayerController };