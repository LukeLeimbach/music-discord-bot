const { GuildController } = require('./GuildController');
const { getAllCachedGuildIDs, queueChangeListener } = require('./firestoreCommands');
const { InteractionHandler } = require('./InteractionHandler');
const { client } = require('../helpers/client');


/**
 * Represents a manager for handling guilds in the bot.
 */
class GuildManager {
  /**
   * Represents a GuildManager.
   * @constructor
   */
  constructor() {
    this.guildMap = new Map();
    this.interactionHandler = null;
  }

  /**
   * Initializes the GuildManager by fetching guilds from Firestore and creating a GuildController for each guild.
   * Also initializes the interaction handler.
   * 
   * @returns {Promise<void>} A promise that resolves once the initialization is complete.
   */
  async _initialize() {
    // Get all guilds from firestore and create a GuildController for each
    await this._initializeGuildControllers();

    // Initialize the interaction handler
    this.interactionHandler = new InteractionHandler(this);

    console.log('---Guilds in GuildMap:', Array.from(this.guildMap.keys()));
    queueChangeListener();
  }

  /**
   * Adds a guild from the guild manager.
   * 
   * @param {string} guildID - The ID of the guild to be removed.
   */
  addGuild(guildID) {
    console.log('---addGuild:', guildID)
    this.guildMap.set(guildID, new GuildController(guildID));
  }

  /**
   * Removes a guild from the guild manager.
   * 
   * @param {string} guildID - The ID of the guild to be removed.
   */
  removeGuild(guildID) {
    const e = this.guildMap.get(guildID);
    if (e) e.destroy();
    this.guildMap.delete(guildID);
  }

  /**
   * Cross-validates the client's guilds with the guilds stored in Firestore.
   * Adds the guilds that exist in both the client and Firestore to the GuildManager.
   * 
   * @returns {Promise<void>} A promise that resolves once the cross-validation is complete.
   */
  async _initializeGuildControllers() {
    const firestoreGuildIDs = await getAllCachedGuildIDs();
    console.log('firestoreGuildIDS:', firestoreGuildIDs);
    const clientGuildIDs = client.guilds.cache.map(guild => guild.id); 
    const guildsInBoth = firestoreGuildIDs.filter(id => clientGuildIDs.includes(id));

    for (const guildID of guildsInBoth) {
      this.addGuild(guildID);
      this.guildMap.get(guildID)._initialize();
    };
  }
}

module.exports = { GuildManager };
