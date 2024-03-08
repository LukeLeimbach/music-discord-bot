import React from 'react';
import '../css/MusicDashboard.css';
import Header from './Header';
import Reorder from './Reorder';
import MusicControls from './MusicControls';
import SearchBar from './SearchBar';
import Dropzone from './Dropzone';

function MusicDashboard() {
    return (
        <>
            <Header />
            <div className="music-dashboard-container">
                <div className="box border">
                    <h1>[GUILD_NAME]'s Queue</h1>
                    <Reorder />
                    <div className='music-dashboard-sub-container'>
                        <MusicControls />
                        <SearchBar props={"Search for a song"} />
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