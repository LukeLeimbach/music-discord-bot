const { GuildController } = require('./GuildController');
const { getAllCachedGuildIDs } = require('./firestoreCommands');
const { InteractionHandler } = require('./InteractionHandler');
const { client } = require('../helpers/client');


class GuildManager {
  constructor() {
    this.guildMap = new Map();
    this.interactionHandler = null;
    this._initialize();
  }


  async _initialize() {
    // Get all guilds from firestore and create a GuildController for each
    await this.crossValidateClientGuildsWithFirestore();

    // Initialize the interaction handler
    this.interactionHandler = new InteractionHandler(this);
    
  }


  async addGuild(guildID) {
    console.log('addGuild:', guildID)
    this.guildMap.set(guildID, new GuildController(guildID));
  }


  async removeGuild(guildID) {
    const e = this.guildMap.get(guildID);
    if (e) e.destroy();
    this.guildMap.delete(guildID);
  }


  async crossValidateClientGuildsWithFirestore() {
    const firestoreGuildIDs = await getAllCachedGuildIDs();
    const clientGuildIDs = client.guilds.cache.map(guild => guild.id);

    const guildsToRemove = clientGuildIDs.filter(id => !firestoreGuildIDs.includes(id));
    const guildsToAdd = firestoreGuildIDs.filter(id => !clientGuildIDs.includes(id));

    for (const guildID of guildsToRemove) this.removeGuild(guildID);
    for (const guildID of guildsToAdd) this.addGuild(guildID);
  }
}

const guildManagerInstance = new GuildManager();

module.exports = { guildManagerInstance };
