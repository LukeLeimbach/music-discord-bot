const { Client, GatewayIntentBits, IntentsBitField, Message, Channel, BaseInteraction, Collection } = require('discord.js');
const { addGuildToFirestore, isGuildInFirestore } = require('../controllers/firestoreCommands');


const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildIntegrations, 
    IntentsBitField.Flags.GuildVoiceStates
  ]
});

client.commands = new Collection();

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


/**
 * Retrieves the default text channel for a given guild.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<Discord.TextChannel|null>} A promise that resolves to the default text channel, or null if the guild is not found.
 */
async function getDefaultTextChannel(guildID) {
  const guild = await client.guilds.fetch(guildID);
  if (!guild) {
    console.log('[-] Error in getDefaultTextChannel, Failed to fetch guild:', guildID);
    return null;
  }

  return guild.channels.cache.find(channel => channel.type === 'text');
}


/**
 * Prompts the user to set the text channel for the bot to use.
 * 
 * @param {string} guildID - The ID of the guild.
 * @returns {Promise<void>} A promise that resolves when the prompt is completed.
 */
async function promptUserForTextChannel(guildID) {
  const guild = client.guilds.cache.get(guildID);
  if (!guild) {
    console.log('[-] Error in promptUserForTextChannel, Failed to get guild');
    return;
  }

  let defaultTextChannel = null;
  try {
    defaultTextChannel = await getDefaultTextChannel(guildID);
    if (!defaultTextChannel) {
      console.log('[-] Error in promptUserForTextChannel, Failed to get default text channel (returned false)');
      return;
    }

  } catch (error) {
    console.log('[-] Error in promptUserForTextChannel, Failed to get default text channel:', error);
    return;
  }

  await defaultTextChannel.send('Please set the text channel for the bot to use by typing `!setchannel` in the desired channel.');
}


/**
 * Caches guilds by checking if they are already stored in Firestore.
 * If a guild is not cached, it is added to Firestore.
 * 
 * @returns {Promise<boolean>} A promise that resolves to true if all guilds are cached successfully, false otherwise
 */
async function cacheGuilds() {
  try {
    const guilds = await client.guilds.fetch();
    guilds.forEach(async guild => {
      const isGuildCached = await isGuildInFirestore(guild.id);
      if (!isGuildCached) {
        const didCacheGuilds = await addGuildToFirestore(guild.id);
        if (!didCacheGuilds) {
          console.log('[-] Error in cacheGuilds, Failed to cache guild (returned false):', guild.id);
          return false;
        }
        await promptUserForTextChannel(guild.id);
      }
    });
    return true;
  } catch (error) {
    console.log('[-] Error in cacheGuilds, Failed to cache guilds:', error);
    return false
  }
}


async function __client_test__() {
  console.log('[+] Client tests...');
  await cacheGuilds()
    ? console.log('[+] Successfully cached guilds')
    : console.log('[-] Failed to cache guilds');

  await promptUserForTextChannel('261601676941721602');
}

module.exports = {
  client,
  getMessageFromID,
  getChannelFromID,
  isClient,
  getDefaultTextChannel,
  CLIENT_ID,
  cacheGuilds,
  __client_test__,
};