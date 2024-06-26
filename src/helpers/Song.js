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
    this.firebaseID = `${this.id}_${this.title}`.replace(/\s/g, '_');
  }

  /**
   * Returns an object representation of the Song instance suitable for storing in Firebase.
   * 
   * @returns {Object} The object representation of the Song instance.
   */
  forFirebase() {
    return {
      kind: this.kind,
      url: this.url,
      id: this.id,
      publishedAt: this.publishedAt,
      channelId: this.channelId,
      title: this.title,
      description: this.description,
      thumbnailUrlDefault: this.thumbnailUrlDefault,
      thumbnailUrlHigh: this.thumbnailUrlHigh,
      channelTitle: this.channelTitle,
      firebaseID: this.firebaseID,
    };
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