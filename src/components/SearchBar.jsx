import React, { useState } from 'react';
import { IonSearchbar, IonButton } from '@ionic/react';
import getSpotifyInfo from '../spotify.mjs';
import { addToQueue, guildID_dev } from '../queue.mjs';
import '../css/SearchBar.css';

function SearchBar() {
  const [searchBarValue, setSearchBarValue] = useState('');

  const guildID = guildID_dev;

  function handleSearchChange(e) {
    setSearchBarValue(e.detail.value);
  }

  async function handleSearchBarValue() {
    console.log("Searchbar value is:", searchBarValue, "| Starting search...")
    await getSpotifyInfo(searchBarValue).then((spotify_obj) => {
      console.log("Found Spotify Song...");
      addToQueue(guildID, spotify_obj.song, spotify_obj.artist, spotify_obj.thumbnailURL, spotify_obj.explicit, spotify_obj.duration_s)
    });
    console.log('Clearing searchbar...')
    setSearchBarValue('');
  }
  
  function handleKeyPress(e) {
    if (e.key === 'Enter' || e.key === 'Return') {
      if (searchBarValue !== '') {
        handleSearchBarValue()
      }
    }
  }

  return (
    <div className='searchbar-container'>
      <IonSearchbar
        animated={false}
        placeholder={"Search for a song"}
        onIonInput={handleSearchChange}
        onKeyDown={handleKeyPress}
        showCancelButton="focus"
        class='custom'
        value={searchBarValue}
      />
      <IonButton fill="solid" onClick={() => handleSearchBarValue()}>Submit</IonButton>
    </div>
  );
}

export default SearchBar;
