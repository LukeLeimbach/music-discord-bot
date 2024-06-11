const { EmbedController } = require('./EmbedController.js');
const { QueueController } = require('./QueueController.js');
const { FirestoreController } = require('./FirestoreController.js');
const { PlayerController } = require('./PlayerController.js');


class GuildController {
  constructor(guildID) {
    console.log('CREATED NEW GUILD CONTROLLER')
    this.guildID = guildID.toString();
    this.FirestoreController = new FirestoreController(this);
    this.QueueController = new QueueController(this);
    this.EmbedController = new EmbedController(this, this.FirestoreController);
    this.PlayerController = new PlayerController(this, this.QueueController);
    this.player;
    this.textChannel = null;
    this.embedMessage = null;
  }


  async _initialize() {
    return;
  }


  async __test__() {
    await this.FirestoreController.__test__();
    await this.QueueController.__test__();
    await this.EmbedController.__test__();
  }
}


module.exports = { GuildController };