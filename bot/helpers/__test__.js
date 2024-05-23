const { PlayerController } = require('../controllers/PlayerController.js');

async function __test__() {
  const playerController = new PlayerController('261601676941721602');
  await playerController.__test__();
}

module.exports = { __test__ };