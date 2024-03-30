const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, IntentsBitField } = require('discord.js');
const { token } = require('./config.json');
const { voiceState } = require('./helpers/audio_handling/voiceState.js');

// Init client intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildIntegrations, IntentsBitField.Flags.GuildVoiceStates] });

// Load commands from command files
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Load events from event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login Client
client.login(token);


// // Handle exit proceedures 
// process.stdin.resume(); // so the program will not close instantly

// function exitHandler(exitCode) {
//   console.log(exitCode == 'SIGINT' ? '[!] Ctrl+C Detected' : exitCode == 0 ? '[...] Exiting Program' : `[+] Exit code: ${exitCode}`);

//   // On exit to program
//   if (exitCode == 'SIGINT') {
// 		// Handle voice player
// 		if (voiceState.subscription) {
// 			voiceState.subscription.unsubscribe();
// 			console.log("[+] Player has been unsubscribed");
// 		}

// 		if (voiceState.connection) {
// 			if (voiceState.connection.disconnect()) console.log("[+] Player disconnected");
// 			if (voiceState.connection.destroy()) console.log("[+] Connection Destroyed");
// 		}

//     // console.log("[...] Sending embed message ID to Firestore")
//     // console.log("[+] Sent embed message ID to Firestore")
//   }
//   process.exit(1);
// }

// // do something when app is closing
// process.on('exit', exitHandler.bind(null));

// // catches ctrl+c event
// process.on('SIGINT', exitHandler.bind(null));

// // catches "kill pid" (for example: nodemon restart)
// process.on('SIGUSR1', exitHandler.bind(null));
// process.on('SIGUSR2', exitHandler.bind(null));

// // catches uncaught exceptions
// process.on('uncaughtException', exitHandler.bind(null));