import React from 'react';
import '../css/MusicControls.css';
import { IonButton, IonIcon } from '@ionic/react';
import { infiniteOutline, playCircleOutline, playSkipBackCircleOutline, playSkipForwardCircleOutline, shuffleOutline } from 'ionicons/icons'

function MusicControls() {
  const c = 'primary'
  return (
    <div className='control-container'>
      <IonButton color={'dark'}><IonIcon icon={shuffleOutline} size='large' color={c} /></IonButton>
      <IonButton color={'dark'}><IonIcon icon={playSkipBackCircleOutline} size='large' color={c} /></IonButton>
      <IonButton color={'dark'}><IonIcon icon={playCircleOutline} size='large' color={c} /></IonButton>
      <IonButton color={'dark'}><IonIcon icon={playSkipForwardCircleOutline} size='large' color={c} /></IonButton>
      <IonButton color={'dark'}><IonIcon icon={infiniteOutline} size='large' color={c} /></IonButton>
    </div>
  );
}

export default MusicControls;