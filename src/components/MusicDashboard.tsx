import React from 'react';
import '../css/MusicDashboard.css';
import Header from './Header.tsx';
import { IonContent } from '@ionic/react';

function MusicDashboard() {
    return (
        <>
            <Header />
            <IonContent>
                <h1>TEST</h1>
            </IonContent>
        </>
    );
}

export default MusicDashboard;