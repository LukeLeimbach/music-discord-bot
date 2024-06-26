const {
  enqueue,
  dequeue,
  getQueue,
  destroyQueue,
  queueLen,
  __test_guild_controller__,
} = require('./firestoreCommands.js');


/**
 * Represents a queue controller for managing song queues in a guild.
 */
class QueueController {
  /**
   * Constructs a new QueueController instance.
   * @param {GuildController} GuildController - The supervising GuildController instance.
   */
  constructor(GuildController) {
    this.GuildController = GuildController;
    this.guildID = GuildController.guildID;
    this.isLoop = false; //TODO: Implement loop feature
    this.queue = [];
  }

  async _initialize() {
    await this.destroyQueue();
  }

  /**
   * Enqueues a song to the guild's queue.
   * 
   * @param {Object} Song - The song to enqueue.
   * @returns {Promise} A promise that resolves when the song is enqueued.
   */
  async enqueue(song) {
    return await enqueue(this.guildID, song);
  }

  /**
   * Dequeues a song from the guild's queue.
   * 
   * @param {boolean} [peek=false] - Whether to peek at the next song without removing it.
   * @returns {Promise} A promise that resolves with the dequeued song.
   */
  async dequeue(peek=false) {
    return await dequeue(this.guildID, peek);
  }

  /**
   * Retrieves the guild's current queue.
   * 
   * @returns {Promise} A promise that resolves with the guild's queue.
   */
  async getQueue() {
    return await getQueue(this.guildID);
  }

  /**
   * Destroys the guild's queue.
   * 
   * @returns {Promise} A promise that resolves when the queue is destroyed.
   */
  async destroyQueue() {
    return await destroyQueue(this.guildID);
  }

  /**
   * Retrieves the length of the guild's queue.
   * 
   * @returns {Promise} A promise that resolves with the length of the queue.
   */
  async queueLen() {
    return await queueLen(this.guildID);
  }

  /**
   * Test function for QueueController.
   */
  async __test__() {
    await __test_guild_controller__();
  }
}

module.exports = { QueueController };


async function __test__() {
  const testSong1 = {
    "artist": `Test Track ${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}`,
    "order": 0,
    "song": "TEST",
    "thumbnailURL": "TEST",
    "url": "TEST"
  };
  const testSong2 = {
    "artist": `Test Track ${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}`,
    "order": 0,
    "song": "TEST",
    "thumbnailURL": "TEST",
    "url": "TEST"
  };
  const testSong3 = {
    "artist": `Test Track ${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}`,
    "order": 0,
    "song": "TEST",
    "thumbnailURL": "TEST",
    "url": "TEST"
  };

  const queueController = new QueueController('261601676941721602');

  // Test enqueue
  await queueController.enqueue(testSong1);
  await queueController.enqueue(testSong2);
  await queueController.enqueue(testSong3);

  // Test dequeue
  const dequeuedSong = await queueController.dequeue();
  console.log(dequeuedSong);

  // Test getQueue
  const queue = await queueController.getQueue();
  console.log(queue);

  // Test queueLen
  let length = await queueController.queueLen();
  console.log(length);

  // Test destroyQueue
  await queueController.destroyQueue();

  // Test queueLen
  length = await queueController.queueLen();
  console.log(length);

  console.log('[+] Tests completed successfully');
}

// __test__();