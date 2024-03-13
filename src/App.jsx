import React, { useEffect } from 'react';
import { IonApp } from '@ionic/react';
import MusicDashboard from './components/MusicDashboard.jsx';

function App() {
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