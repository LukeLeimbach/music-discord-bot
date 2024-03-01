import React from 'react';
import '../css/MusicDashboard.css';
import Header from './Header.tsx';
import { IonContent } from '@ionic/react';
import SearchBar from './SearchBar.tsx';

function MusicDashboard() {
    return (
        <>
            <Header />
            <IonContent>
                <SearchBar props="This is a test search bar" />
                <h1>TEST</h1>
            </IonContent>
        </>
    );
}

export default MusicDashboard;