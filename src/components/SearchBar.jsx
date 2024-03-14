import React, { useState } from 'react';
import { IonSearchbar } from '@ionic/react';
import getSpotifyInfo from '../spotify.mjs';
import { addToQueue, guildID_dev } from '../queue.mjs';

function SearchBar() {
  const [searchBarValue, setSearchBarValue] = useState('');

  const guildID = guildID_dev;

  function handleSearchChange(e) {
    setSearchBarValue(e.detail.value);
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
