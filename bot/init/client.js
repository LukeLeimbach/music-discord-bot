const { Client, GatewayIntentBits, IntentsBitField } = require('discord.js');
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

module.exports = { client };