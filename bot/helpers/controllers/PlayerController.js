const { EmbedController } = require('./EmbedController.js');
const { QueueController } = require('./QueueController.js');
const { FirestoreController } = require('./FirestoreController.js');
// const { getChannelFromID } = require('../client.js');

class PlayerController {
  constructor(guildID) {
    this.guildID = toString(guildID);
    this.FirestoreController = new FirestoreController(this);
    this.QueueController = new QueueController(this);
    this.EmbedController = new EmbedController(this, FirestoreController);
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
    console.log('[+] Initializing PlayerController...');
  }

  async __test__() {
    await this.FirestoreController.__test__();
    await this.QueueController.__test__();
    await this.EmbedController.__test__();
  }
}


async function __test__() {
  const playerController = new PlayerController('261601676941721602');
  await playerController.__test__();
}

__test__().then(() => {
  console.log('[+] PlayerController test completed successfully');
}).catch(error => {
  console.error('[-] Error in PlayerController test:', error);
});
