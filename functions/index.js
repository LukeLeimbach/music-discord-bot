const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Functions
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Wall Music's Server!");
});