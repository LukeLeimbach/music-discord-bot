const { Client, GatewayIntentBits, IntentsBitField, Message, Channel, BaseInteraction } = require('discord.js');
const { token } = require('../discordConfig.json');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildIntegrations, 
    IntentsBitField.Flags.GuildVoiceStates
  ]
});

client.login(token);

const CLIENT_ID = client.id;

/**
 * Retrieves a message from a given message ID in a specific channel.
 * 
 * @param {string} messageID - The ID of the message to retrieve.
 * @param {Channel} channel - The channel where the message is located.
 * @returns {Promise<Message|null>} A promise that resolves to the Discord message object, or null if the message could not be found.
 */
async function getMessageFromID(messageID, channel) {
  try {
    return await channel.messages.fetch(messageID);
  } catch (error) {
    console.log('[-] Error in getMessageFromID, Failed to fetch message:', error);
    return null;
  }
}


/**
 * Retrieves a Discord channel object from the given channel ID.
 * 
 * @param {string} channelID - The ID of the channel to retrieve.
 * @returns {Promise<Channel|null>} A promise that resolves to the Discord channel object, or null if the channel could not be found.
 */
async function getChannelFromID(channelID) {
  try {
    return await client.channels.fetch(channelID);
  } catch (error) {
    console.log('[-] Error in getChannelFromID, Failed to fetch channel:', error);
    return null;
  }
}


/**
 * Checks if the given object is the client.
 * 
 * @param {BaseInteraction|Message} object - The object to check.
 * @returns {boolean|null} Returns true if the object is the client, false otherwise. Returns null if the object is incompatible.
 */
function isClient(object) {
  if (Object.hasOwn(object, 'author')) return object.author.id == CLIENT_ID;
  else if (Object.hasOwn(object, 'id')) return object.id == CLIENT_ID;
  else {
    console.log('[-] Error in isClient, Given incompatible object:', object);
    return null;
  }
}


module.exports = {
  client,
  getMessageFromID,
  getChannelFromID,
  isClient
};