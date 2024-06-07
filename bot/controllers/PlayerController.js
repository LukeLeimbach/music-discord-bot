const {
  createPlayer,
  
} = require('./playerCommands');
const { GuildController } = require('./GuildController');

class PlayerController {
  constructor(GuildController) {
    this.GuildController = GuildController;
    this.AudioPlayer = new AudioPlayer();
  }
}


module.exports = { PlayerController };