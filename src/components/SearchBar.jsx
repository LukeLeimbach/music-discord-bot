import React, { useState } from 'react';
import { IonSearchbar, IonButton } from '@ionic/react';
import { addToQueue } from '../queue.mjs';
import { getTopVideoInfo } from '../youtubeHandler.js';
import '../css/SearchBar.css';

function SearchBar() {
  const [searchBarValue, setSearchBarValue] = useState('');

  const devTestGuildId = process.env.REACT_APP_DEV_GUILD_ID;

  function handleSearchChange(e) {
    setSearchBarValue(e.detail.value);
  }

  async function handleSearchBarValue() {
    console.log("Searchbar value is:", searchBarValue, "| Starting search...")
    await getTopVideoInfo(searchBarValue).then((obj) => {
      console.log("Found Youtube Song...");
      addToQueue(devTestGuildId, obj.url, obj.song, obj.artist, obj.thumbnailURL)
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
