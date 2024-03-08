import React, { useEffect } from 'react';
import { IonApp } from '@ionic/react';
import MusicDashboard from './components/MusicDashboard.tsx';

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Wall Music Dashboard"
  }, []);
  return (
    <>
      <IonApp>
        <MusicDashboard />
      </IonApp>
    </>
  );
}


export default App;