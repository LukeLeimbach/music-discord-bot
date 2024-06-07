const { GuildController } = require('../controllers/GuildController');
const { __client_test__ } = require('./client');

async function __test__() {
  const guildController = new GuildController('261601676941721602');
  await guildController.__test__();
  await __client_test__();
}

module.exports = { __test__ };