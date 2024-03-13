import React, { useState } from 'react';
import Header from './Header.jsx';
import Reorder from './Reorder.jsx';
import MusicControls from './MusicControls.jsx';
import SearchBar from './SearchBar.jsx';
import '../css/MusicDashboard.css';


function MusicDashboard() {
  const [queue, setQueue] = useState([]);

  const guildID = '261601676941721602';

  return (
    <>
      <Header />
      <div className="music-dashboard-container">
        <div className="box border">
          <h1>Wall Moment's Queue</h1>
          <Reorder queue={queue} />
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