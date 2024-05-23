const { client } = require('./helpers/Client');
const { loadCommands } = require('./helpers/loadCommands');
const { loadEvents } = require('./helpers/loadEvents');


loadCommands(client);
loadEvents(client);
