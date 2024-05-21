/**
 * Represents a song
 */
class Song {
  constructor(searchResult) {
    this.kind = searchResult.kind;
    this.url = searchResult.url;
    this.id = searchResult.id;
    this.publishedAt = searchResult.publishedAt;
    this.channelId = searchResult.channelId;
    this.title = searchResult.title;
    this.description = searchResult.description;
    this.thumbnailUrlDefault = searchResult.thumbnails.default.url;
    this.thumbnailUrlHigh = searchResult.thumbnails.high.url;
    this.channelTitle = searchResult.channelTitle;
  }

  /**
   * Checks if the song is valid.
   * 
   * @returns {boolean} Returns true if the song is a YouTube video, false otherwise.
   */
  isValid() {
    return this.kind === 'youtube#video';
  }
}


module.exports = { Song };