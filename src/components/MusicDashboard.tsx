import React from 'react';
import '../css/MusicDashboard.css';
import Header from './Header.tsx';
import Reorder from './Reorder.tsx'
import MusicControls from './MusicControls.tsx'
import SearchBar from './SearchBar.tsx'

function MusicDashboard() {
    return (
        <>
            <Header />
            <div className="music-dashboard-container">
                <div className="left-box">
                    <h1>[GUILD_NAME]'s Queue</h1>
                    <Reorder />
                    <div className='music-dashboard-sub-container'>
                        <MusicControls />
                        <SearchBar props={"Search for a song"} />
                    </div>
                </div>
                <div className="right-boxes">
                    <div>Box 2</div>
                    <div>Box 3</div>
                </div>
            </div>
        </>
    );
}

export default MusicDashboard;