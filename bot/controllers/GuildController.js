const { EmbedController } = require('./EmbedController.js');
const { QueueController } = require('./QueueController.js');
const { FirestoreController } = require('./FirestoreController.js');
const { PlayerController } = require('./PlayerController.js');

class GuildController {
  constructor(guildID) {
    this.guildID = guildID.toString();
    this.FirestoreController = new FirestoreController(this);
    this.QueueController = new QueueController(this);
    this.EmbedController = new EmbedController(this, this.FirestoreController);
    this.AudioController = new this.AudioController(this, this.QueueController);
    this.player; // TODO: Implement player
    this.textChannel = null;
    this.embedMessage = null; // TODO: Handle embed being deleted
  }

  async _initialize() {
    // TODO:
    /**
     * 1. Get text channel from Firestore
     * 2. Create embed 
     * 
     */

    let clientTextChannel = null;
    try {
      clientTextChannel = await this.FirestoreController.getClientTextChannel();
    } catch (error) {
      clientTextChannel = await this.promptUserForTextChannel();
    }
    console.log('[+] Initializing GuildController...');
  }

  async __test__() {
    await this.FirestoreController.__test__();
    await this.QueueController.__test__();
    await this.EmbedController.__test__();
  }
}


module.exports = { GuildController };