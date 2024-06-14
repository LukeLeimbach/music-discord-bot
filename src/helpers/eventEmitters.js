const { EventEmitter } = require('events');

// All Emitters
const queueChangeEmitter = new EventEmitter();
const clientInitiatedEmitter = new EventEmitter();
const defaultTextChannelChangeEmitter = new EventEmitter();


module.exports = {
  queueChangeEmitter,
  clientInitiatedEmitter,
  defaultTextChannelChangeEmitter,
}