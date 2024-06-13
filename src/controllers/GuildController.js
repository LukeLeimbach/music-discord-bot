const { EmbedController } = require('./EmbedController.js');
const { QueueController } = require('./QueueController.js');
const { FirestoreController } = require('./FirestoreController.js');
const { PlayerController } = require('./PlayerController.js');


class GuildController {
  constructor(guildID) {
    this.guildID = guildID.toString();
    this.FirestoreController = new FirestoreController(this);
    this.QueueController = new QueueController(this);
    this.PlayerController = new PlayerController(this);
    this.EmbedController = new EmbedController(this);
  }


  async _initialize() {
    console.log('[+] Initializing GuildController for guild:', this.guildID);
    await this.EmbedController._initialize();
    await this.QueueController._initialize();
  }


  async __test__() {
    await this.FirestoreController.__test__();
    await this.QueueController.__test__();
    await this.EmbedController.__test__();
  }
}


module.exports = { GuildController };