import React from 'react';
import Header from './Header.jsx';
import Reorder from './Reorder.jsx';
import MusicControls from './MusicControls.jsx';
import SearchBar from './SearchBar.jsx';
import '../css/MusicDashboard.css';


function MusicDashboard() {
  return (
    <>
      <Header />
      <div className="music-dashboard-container">
        <div className="box border">
          <h1>Wall Moment's Queue</h1>
          <p>Attention: This app does <u>not</u> play audio through the browser. You need the Discord bot to listen (which I'm still working on ;-; )</p>
          <Reorder />
          <div className='music-dashboard-sub-container'>
            <MusicControls />
            <SearchBar />
          </div>
        </div>
        {/* <div className="box">
          <div className='box border'><Dropzone /></div>
          <div className='box border'>Box 3</div>
        </div> */}
      </div>
    </>
  );
}

export default MusicDashboard;