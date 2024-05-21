const { enqueue, dequeue, getQueue, destroyQueue, queueLen } = require('./firestoreController.js');

class QueueController {
  constructor(guildID) {
    this.guildID = guildID;
  }

  async enqueue(song) {
    return await enqueue(this.guildID, song);
  }

  async dequeue(peek = false) {
    return await dequeue(this.guildID, peek);
  }

  async getQueue() {
    return await getQueue(this.guildID);
  }

  async destroyQueue() {
    return await destroyQueue(this.guildID);
  }

  async queueLen() {
    return await queueLen(this.guildID);
  }
}

module.exports = QueueController;


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

__test__();