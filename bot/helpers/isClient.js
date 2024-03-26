/**
 * Determines if an object belongs to the client
 *    @param {Object} obj -> message or author object.
 *    @returns {boolean} -> Whether or not obj is from client.
 */

// Constants
const BOT_ID = 924079497412767844;

module.exports = {
  isClient: (obj=NaN) => {
    if (Object.hasOwn(obj, 'author')) return obj.author.id == BOT_ID;
    if (Object.hasOwn(obj, 'id')) return obj.id == BOT_ID;
    else {
        console.log('[-] ERROR: is_client given incorrect object');
        console.log('Object:\n' + obj + '\n');
        return NaN
    }
  }
};
