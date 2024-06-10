const { GuildController } = require('./GuildController');
const { getAllCachedGuildIDs } = require('./firestoreCommands');

class GuildManager {
  constructor() {
    this.guildManagers = new Map();
  }

  async _initialize() {
    // Get all guilds from firestore and create a GuildController for each
    const guildIDs = await getAllCachedGuildIDs();
    for (const guildID of guildIDs) await this.addGuild(guildID);
  }

  async addGuild(guildID) {
    this.guildManagers.set(guildID, new GuildController(guildID));
  }
}