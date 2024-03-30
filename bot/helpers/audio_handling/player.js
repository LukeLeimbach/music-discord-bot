const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
  // Enable debug for development
  debug: true,
});

module.exports = {
  player: player
}
