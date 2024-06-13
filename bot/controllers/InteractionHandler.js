/**
 * Represents the InteractionHandler class.
 */
class InteractionHandler {
  /**
   * Represents the InteractionHandler class.
   * @constructor
   * @param {GuildManager} guildManager - The guild manager instance.
   */
  constructor(guildManager) {
    this.guildMap = guildManager.guildMap;
  }


  async handleButtonInteraction(interaction) {
    console.log('[+] Handling button interaction.')
    if (!interaction.isButton()) {
      console.error(`[-] Error in handleInteraction. Interaction is not a button.`);
      await interaction.reply({ content: 'Something has gone horrible wrong...', ephemeral: true });
      return false;
    }

    const guildID = interaction.guildId;
    const guildController = this.guildMap.get(guildID);
    if (!guildController) {
      console.error(`[-] Error in handleInteraction. No guild controller found for guild ID ${guildID}`);
      await interaction.reply({ content: 'Something has gone horrible wrong...', ephemeral: true });
      return false;
    }

    const buttonCustomId = interaction.customId;
    switch (buttonCustomId) {
      case 'togglePlay':
        const subscription = guildController.PlayerController.play(interaction);
        guildController.PlayerController.subscription = subscription;
        guildController.PlayerController.connection = subscription.connection;
        break;
      case 'stop':
        await guildController.PlayerController.destroyConSub();
        await guildController.QueueController.destroyQueue();
        break;
      case 'skip':
        console.log('[!] Loop button pressed. No Functionality yet.');
        break;
      case 'loop':
        console.log('[!] Loop button pressed. No Functionality yet.');
        break;
      case 'shuffle':
        console.log('[!] Shuffle button pressed. No Functionality yet.');
        break;
      default:
        break;
    }
  }
}


module.exports = { InteractionHandler };