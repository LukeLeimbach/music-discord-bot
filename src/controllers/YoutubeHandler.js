const { youtubeApiKey } = require('../youtubeConfig.json');
const { YTSearcher, YTSearch } = require('ytsearcher');
const { Song } = require('../helpers/Song.js');


/**
 * Represents a YouTube handler for searching and retrieving video information.
 */
class YoutubeHandler {
  constructor() {
    this._searcher = new YTSearcher(youtubeApiKey);
  }

  /**
   * Searches YouTube for videos based on the provided query.
   * 
   * @param {string} query - The search query.
   * @returns {Promise<YTSearch>|null} A promise that resolves to the search results, or null no results are found.
   */
  async search(query) {
    try {
      return this._searcher.search(query, { type: 'video' });
    } catch (error) {
      console.log('[!] Error in search, Search failed:', error);
      return null;
    }
  }

  /**
   * Retrieves the information of the top video from the search results.
   * 
   * @param {YTSearch|String} resultsOrQuery - The results of this.search(query) or a query string.
   * @returns {Promise<Song>|null} The top video information, or null if the search results are of incorrect type.
   */
  async getTopVideoInfo(resultsOrQuery) {
    // Handle YT Search results
    if (resultsOrQuery instanceof YTSearch) {
      return new Song(resultsOrQuery.first);
    }
    // Handle query string
    else if (typeof resultsOrQuery === 'string' || resultsOrQuery instanceof String) {
      const searchResults = await this.search(resultsOrQuery);
      if (searchResults === null) return null;
      return new Song(searchResults.first);
    }
    // Handle invalid argument
    else {
      console.log('[-] Error in getTopVideoInfo, searchResults of incorrect type:', resultsOrQuery);
      return null;
    }
  }
}

const youtubeHandler = new YoutubeHandler();

module.exports = { youtubeHandler };



// ---------------------------- TESTING ----------------------------

/**
 * A test function to demonstrate the usage of YoutubeHandler methods.
 */
async function __test__() {
  const youtubeHandler = new YoutubeHandler();
  const searchResult = await youtubeHandler.search('test');
  console.log('[+] Search Result:', searchResult);

  const topVideoInfoSR = await youtubeHandler.getTopVideoInfo(searchResult);
  console.log('[+] Top Video Info:', topVideoInfoSR);

  const topVideoInfoQuery = await youtubeHandler.getTopVideoInfo("test");
  console.log('[+] Top Video Info:', topVideoInfoQuery);

  topVideoInfoSR.title !== null
    ? console.log('[+] Tests passed successfully for SR "test"')
    : console.log('[-] Tests failed for test SR "test"');

  topVideoInfoQuery.title !== null
    ? console.log('[+] Tests passed successfully for Query "test"')
    : console.log('[-] Tests failed for test Query "test"');
}

// __test__();