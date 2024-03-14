import React, { useState } from 'react';
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { IonSearchbar } from '@ionic/react';
import environment from "../settings.js"

function SearchBar() {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [spotifyInfo, setSpotifyInfo] = useState('');

  // const guildID = '261601676941721602';

  function handleSearchChange(e) {
    setSearchBarValue(e.detail.value);
  }

  async function getSpotifyInfo(q, type='track') {
    const api = SpotifyApi.withClientCredentials(
      environment().SPOTIFY_CLIENT_ID,
      environment().SPOTIFY_CLIENT_SECRET
    );

    const data = await api.search(q, [type]);

    return {
      'song': data.tracks.items[0].name,
      'artist': data.tracks.items[0].artists[0].name,
      'explicit': data.tracks.items[0].explicit,
      'duration_s': data.tracks.items[0].duration_ms / 1000
    };
  }

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      if (searchBarValue !== '') {
        await getSpotifyInfo(searchBarValue).then((val) => {setSpotifyInfo(val)});
      }
    }
  }

  return (
      <IonSearchbar
        animated={true}
        placeholder={"Search for a song"}
        onIonChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
  );
}

export default SearchBar;
