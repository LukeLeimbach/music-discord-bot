const { PlayerController } = require('../controllers/PlayerController');
const { __client_test__ } = require('./client');

async function __test__() {
  const playerController = new PlayerController('TESTING_GUILD');
  await playerController.__test__();
  await __client_test__();
}

module.exports = { __test__ };