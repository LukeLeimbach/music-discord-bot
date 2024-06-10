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
  constructor(GuildController) {
    this.ParentGuildController = GuildController;
    this.AudioPlayer = createAudioPlayer({behaviors: {noSubscriber: NoSubscriberBehavior.Stop}});
  }

  async joinVC(interaction) {
    return await joinVC(this.AudioPlayer, interaction);
  }

  destroyConSub(con, sub) {
    return destroyConSub(con, sub);
  }

  async play(interaction, song) {
    return await play(this.AudioPlayer, interaction, song);
  }

  async isUserInVC(interaction) {
    return await isUserInVC(interaction);
  }

  async _validateInteraction(interaction) {
    return await _validateInteraction(interaction);
  }
}


module.exports = { PlayerController };