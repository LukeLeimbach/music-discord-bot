const { createAudioPlayer, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
  // Enable debug for development
  debug: true,
});

// On player Idle (ie song has ended), do SOMETHING --------------------------------------------------
player.on('stateChange', ((oldState, newState) => {
  if (newState.status === AudioPlayerStatus.Idle) {
    console.log(`!!STATE CHANGED TO Idle FROM ${oldState}`)
  }
  // TODO: Update embed here
}));

module.exports = {
  player: player
}
