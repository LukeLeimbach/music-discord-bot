const { youtubeApiKey } = require('../config.json');
const { YTSearcher, YTSearch } = require('ytsearcher');

async function _(query) {
  try {
    const searcher = new YTSearcher(youtubeApiKey);
    return await searcher.search(query, { type: 'video' });
  } catch (err) {
    console.log('[!] Error getting video for queue', err);
    return null;
  }
}

module.exports = {
  // Takes a query and returns a ytdl search result.
  getVideoSearchResult: async (query) => {
    try {
      const searcher = new YTSearcher(youtubeApiKey);
      return await searcher.search(query, { type: 'video' });
    } catch (err) {
      console.log('[!] Error getting video for queue', err);
      return null;
    }
  },

  // Takes a search result or query and returns the video url
  getTopVideoInfo: async (obj) => {
    if (obj instanceof YTSearch) {
      return obj.currentPage[0].url;
    } else if (typeof obj === "string") {
      const searchResult = await _(obj);
      return {
        'url': searchResult.currentPage[0].url,
        'song': searchResult.currentPage[0].title,
        'artist': searchResult.currentPage[0].channelTitle,
        'thumbnailURL': searchResult.currentPage[0].thumbnails.default.url,
      }
    } else {
      console.log('[!] obj of incorrect type in GetTopVideoUrl.')
    }
  },
}
