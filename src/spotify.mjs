import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export default async function getSpotifyInfo(q, type='track') {
  const api = SpotifyApi.withClientCredentials(
    process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
  );

  const data = await api.search(q, [type]);

  return {
    'song': data.tracks.items[0].name,
    'artist': data.tracks.items[0].artists[0].name,
    'explicit': data.tracks.items[0].explicit,
    'duration_s': data.tracks.items[0].duration_ms / 1000,
    'thumbnailURL': data.tracks.items[0].album.images[0].url,
  };
}