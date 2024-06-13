const {
  Client,
  GatewayIntentBits,
  IntentsBitField,
  PermissionsBitField,
  Message,
  Channel,
  BaseInteraction,
  Collection,
  ChannelType
} = require('discord.js');
const { addGuildToFirestore, isGuildInFirestore, updateClientTextChannelID } = require('../controllers/firestoreCommands');


const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildIntegrations, 
    IntentsBitField.Flags.GuildVoiceStates,
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
 * @returns {Promise<TextChannel|null>} A promise that resolves to the default text channel, or null if the guild is not found.
 */
async function getDefaultTextChannel(guildID) {
  const guild = await client.guilds.fetch(guildID);
  if (!guild) {
    console.log('[-] Error in getDefaultTextChannel, Failed to fetch guild:', guildID);
    return null;
  }

  // Get System channel ID (if exists)
  if (guild.systemChannelId) return guild.channels.cache.get(guild.systemChannelId);

  // Get the first text channel if no system channel exists
  for (let key in guild.channels.cache) {
    let c = channels[key];
    if (c[1].type === 'text') return guild.channels.cache.get(c[0]);
  }

  return null;
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
    console.error('[-] Error in promptUserForTextChannel, Failed to get guild');
    return;
  }

  // Get the default text channel. Handle errors.
  try {
    const _defaultTextChannel = await getDefaultTextChannel(guildID);
    if (!_defaultTextChannel) {
      console.error('[-] Error in promptUserForTextChannel, Failed to get default text channel (returned null)');
      return;
    }
    await _defaultTextChannel.send('Please set the text channel for the bot to use by typing `/setchannel` in the desired channel.');
  } catch (error) {
    console.error('[-] Error in promptUserForTextChannel, Failed to get default text channel:', error);
    return;
  }
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
      }
    });
    return true;
  } catch (error) {
    console.log('[-] Error in cacheGuilds, Failed to cache guilds:', error);
    return false
  }
}


/**
 * Creates the Wall Music text channel in the specified guild. Updates the default text channel in Firestore if successfull.
 * 
 * @param {string} guildID - The ID of the guild where the text channel should be created.
 * @returns {Promise<TextChannel|null>} A promise that resolves to the created text channel, or null if an error occurred.
 */
// Function to create a text channel
async function createTextChannel(guildID) {
  const guild = client.guilds.cache.get(guildID);
  if (!guild) {
    console.error('[-] Error in createTextChannel, Failed to get guild');
    return null;
  }

  try {
    const permissions = [
      PermissionsBitField.Flags.ManageChannels,
      PermissionsBitField.Flags.ViewChannel,
      PermissionsBitField.Flags.SendMessages,
    ];

    const textChannel = await guild.channels.create({
      name: 'wall-music-channel',
      type: ChannelType.GuildText,
      position: 0,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id, // Ensure to use the .id property
          allow: permissions,
        }
      ],
    });

    const didUpdateClientTextChannelID = await updateClientTextChannelID(guildID, textChannel.id);
    if (!didUpdateClientTextChannelID) {
      console.error('[-] Error in createTextChannel, Failed to update client text channel ID');
      return null;
    }
    return textChannel;
  } catch (error) {
    console.error('[-] Error in createTextChannel, Failed to create text channel. Prompting user to set text channel manually:', error);
    try {
      await promptUserForTextChannel(guildID);
      return null;
    } catch (error) {
      console.error('[-] Error in createTextChannel, Failed to prompt user for text channel:', error);
      return null;
    }
  }
}


async function __client_test__() {
  console.log('[+] Client tests...');
  await cacheGuilds()
    ? console.log('[+] Successfully cached guilds')
    : console.log('[-] Failed to cache guilds');

  // await promptUserForTextChannel('261601676941721602');  // Test prompt functionality
}


module.exports = {
  client,
  getMessageFromID,
  getChannelFromID,
  isClient,
  getDefaultTextChannel,
  CLIENT_ID,
  cacheGuilds,
  promptUserForTextChannel,
  createTextChannel,
  __client_test__,
};