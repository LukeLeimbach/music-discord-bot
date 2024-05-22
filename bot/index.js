const { client } = require('./init/client');
const { loadCommands } = require('./init/loadCommands');
const { loadEvents } = require('./init/loadEvents');

loadCommands(client);
loadEvents(client);