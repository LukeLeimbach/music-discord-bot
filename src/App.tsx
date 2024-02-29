import React from 'react';
import { IonApp } from '@ionic/react';
import MusicDashboard from './components/MusicDashboard.tsx';

const App: React.FC = () => {
  return (
    <>
      <IonApp>
        <MusicDashboard />
      </IonApp>
    </>
  );
}


export default App;