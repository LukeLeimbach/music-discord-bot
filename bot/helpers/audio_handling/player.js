const { createAudioPlayer, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
  // Enable debug for development
  debug: true,
});

// Song has finished playing
player.on(AudioPlayerStatus.Idle, () => {
  
  console.log("Song done");
});

module.exports = {
  player: player
}
