import React, { useState } from 'react';
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { IonSearchbar } from '@ionic/react';
import { addToQueue, guildID_dev } from '../queue.mjs';

function SearchBar() {
  const [searchBarValue, setSearchBarValue] = useState('');

  const guildID = guildID_dev;

  function handleSearchChange(e) {
    setSearchBarValue(e.detail.value);
  }

  async function getSpotifyInfo(q, type='track') {
    console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID)
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

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      if (searchBarValue !== '') {
        console.log("Searchbar value is:", searchBarValue, "| Starting search...")
        await getSpotifyInfo(searchBarValue).then((spotify_obj) => {
          console.log("Found Spotify Song...")
          addToQueue(guildID, spotify_obj.song, spotify_obj.artist, spotify_obj.thumbnailURL, spotify_obj.explicit, spotify_obj.duration_s)
        });
      }
    }
  }

  return (
      <IonSearchbar
        animated={true}
        placeholder={"Search for a song"}
        onIonInput={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
  );
}

export default SearchBar;
