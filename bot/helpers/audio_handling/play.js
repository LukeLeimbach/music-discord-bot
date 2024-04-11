const { player } = require('./player');
const { playerInfo, createConnection } = require('./connection');

module.exports = {
  play: (queue, interaction) => {
    // Stops playing (in case it isn't already) and destroys audio resource
    player.stop();

    // Creates a new connection
    if (!playerInfo.connection) {
      createConnection(interaction);
      createSubscription(playerInfo.connection);
    }

  }
}
