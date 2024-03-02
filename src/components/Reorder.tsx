import React from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ItemReorderEventDetail } from '@ionic/react';
import '../css/Reorder.css'

function Reorder() {
  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  return (
    <IonContent scrollY={true} color='primary' className='reorder-content'>
      <div className='ion-content-scroll-host drag-container'>
        <IonList className='test'>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            <IonItem color='primary'>
              <IonLabel>Item 1</IonLabel>
              <IonReorder slot="end"></IonReorder>
            </IonItem>

            <IonItem color='primary'>
              <IonLabel>Item 2</IonLabel>
              <IonReorder slot="end"></IonReorder>
            </IonItem>

            <IonItem color='primary'>
              <IonLabel>Item 3</IonLabel>
              <IonReorder slot="end"></IonReorder>
            </IonItem>

            <IonItem color='primary'>
              <IonLabel>Item 4</IonLabel>
              <IonReorder slot="end"></IonReorder>
            </IonItem>

            <IonItem color='primary'>
              <IonLabel>Item 5</IonLabel>
              <IonReorder slot="end"></IonReorder>
            </IonItem>

            <IonItem color='primary'>
              <IonLabel>Item 6</IonLabel>
              <IonReorder slot="end"></IonReorder>
            </IonItem>
          </IonReorderGroup>
        </IonList>
      </div>
    </IonContent>
  );
}

export default Reorder;