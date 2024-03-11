import React, { useState } from 'react';
import '../css/MusicDashboard.css';
import Header from './Header.tsx';
import Reorder from './Reorder.tsx';
import MusicControls from './MusicControls.tsx';
import SearchBar from './SearchBar.tsx';
import Dropzone from './Dropzone.tsx';

function MusicDashboard() {
  const [searchText, setSearchText] = useState('');

  const setSearchTextFromSearchBar = (newValue: string) => {
    setSearchText(newValue);
  }

  return (
    <>
      <Header />
      <div className="music-dashboard-container">
        <div className="box border">
          <h1>Wall Moment's Queue</h1>
          <Reorder searchText={searchText} />
          <div className='music-dashboard-sub-container'>
            <MusicControls />
            <SearchBar onSearchSubmit={setSearchTextFromSearchBar} />
          </div>
        </div>
        <div className="box">
          <div className='box border'><Dropzone /></div>
          <div className='box border'>Box 3</div>
        </div>
      </div>
  </>
  );
}

export default MusicDashboard;