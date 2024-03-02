import React from 'react';
import '../css/MusicControls.css';
import { IonButton, IonIcon } from '@ionic/react';
import { infiniteOutline, pauseCircleOutline, playCircleOutline, playSkipBackCircleOutline, playSkipForwardCircleOutline, shuffleOutline } from 'ionicons/icons'

function MusicControls() {
  return (
    <div className='control-container'>
      <IonIcon icon={shuffleOutline} size='large' color='success' />
      <IonIcon icon={playSkipBackCircleOutline} size='large' color='success' />
      <IonIcon icon={playCircleOutline} size='large' color='success' />
      <IonIcon icon={playSkipForwardCircleOutline} size='large' color='success' />
      <IonIcon icon={infiniteOutline} size='large' color='success' />
    </div>
  );
}

export default MusicControls;