const {
  updateEmbedMessageID,
  updateClientTextChannelID,
  getClientTextChannel,
  getEmbedMessage,
  __test_firestore_controller__,
} = require('./firestoreCommands.js');

/**
 * Represents a FirestoreController for managing data in Firestore.
 */
class FirestoreController {
  /**
   * Creates a new instance of FirestoreController.
   * 
   * @param {GuildController} GuildController - The supervising GuildController instance.
   */
  constructor(GuildController) {
    this.GuildController = GuildController;
    this.guildID = GuildController.guildID;
  }

  /**
   * Updates the embed message for a specific guild.
   * 
   * @param {string} messageID - Updated message ID.
   * @returns {Promise<boolean>} A promise that resolves to true if the message was successfully updated, false otherwise.
   */
  async updateEmbedMessageID(messageID) {
    await updateEmbedMessageID(this.guildID, messageID);
  }

  /**
   * Updates the embed message for a specific guild.
   * 
   * @param {string} textChannelID - Updated text channel ID.
   * @returns {Promise<boolean>} A promise that resolves to true if the text channel was successfully updated, false otherwise.
   */
  async updateClientTextChannelID(textChannel) {
    await updateClientTextChannelID(this.guildID, textChannel);
  }

  /**
   * Gets the client text channel for a specific guild.
   * 
   * @returns {Promise<string|null>} The ID of the client text channel, or null if not found or encountered an error.
   */
  async getClientTextChannel() {
    return await getClientTextChannel(this.guildID);
  }

  /**
   * Gets the embed message for a specific guild.
   * 
   * @returns {Promise<Message>} A promise that resolves to the message object.
   */
  async getEmbedMessage() {
    return await getEmbedMessage(this.guildID);
  }

  /**
   * Test function for FirestoreController.
   */
  async __test__() {
    await __test_firestore_controller__();
  }
}


module.exports = { FirestoreController };
