import React from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ItemReorderEventDetail } from '@ionic/react';
import '../css/Reorder.css'

function Reorder({ queue }) {
  const c = 'dark';

  const itemList = queue.map((item, index) => (
    <IonItem key={index} color={c}>
      <div className='item-container'>
        <IonLabel>Item: {item}</IonLabel>
        <div className='fake-img'>ALBUM COVER</div>
      </div>
      <IonReorder slot="end" />
    </IonItem>
  ));
  
  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }

  return (
    <IonContent scrollY={true} color={c} className='reorder-content'>
      <div className='ion-content-scroll-host'>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {itemList}
          </IonReorderGroup>
        </IonList>
      </div>
    </IonContent>
  );
}

export default Reorder;