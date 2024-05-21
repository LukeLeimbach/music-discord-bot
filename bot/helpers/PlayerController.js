const { EmbedController } = require('./EmbedController.js');
const { QueueController } = require('./QueueController.js');
const { FirestoreController } = require('./FirestoreController.js');

class PlayerController {
  constructor(guildID) {
    this.guildID = guildID;
    this.FirestoreController = new FirestoreController(guildID);
    this.QueueController = new QueueController(guildID);
    this.EmbedController = new EmbedController(guildID, FirestoreController);
  }
}