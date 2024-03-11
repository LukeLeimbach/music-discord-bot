import React, { useState } from 'react';
import Header from './Header.tsx';
import Reorder from './Reorder.tsx';
import MusicControls from './MusicControls.tsx';
import SearchBar from './SearchBar.tsx';
// import Dropzone from './Dropzone.tsx';
import { collection, addDoc } from 'firebase/firestore'
import '../css/MusicDashboard.css';


function MusicDashboard() {
  const [queue, setQueue] = useState<string[]>([]);

  const handleNewQueueItem = (newValue: string) => {
    setQueue((prevQueue) => [newValue, ...prevQueue]);
    console.log(queue);
  };

  return (
    <>
      <Header />
      <div className="music-dashboard-container">
        <div className="box border">
          <h1>Wall Moment's Queue</h1>
          <Reorder queue={queue} />
          <div className='music-dashboard-sub-container'>
            <MusicControls />
            <SearchBar onSearchSubmit={handleNewQueueItem} />
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