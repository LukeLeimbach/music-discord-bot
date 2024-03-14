import React, { useState, useEffect } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, IonThumbnail, IonImg, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { guildID_dev, deleteQueueItem } from '../queue.mjs';
import { doc, updateDoc, collection, query, onSnapshot } from "firebase/firestore";
import getDb from '../firebaseConfig.mjs';
import '../css/Reorder.css';

function Reorder() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const db = getDb();
    const q = query(collection(db, "guilds", guildID_dev, "queue"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const queueData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => a.order - b.order);

      setQueue(queueData);
    }, (err) => {
      console.error("Failed to subscribe to queue updates:", err);
    });

    return () => unsubscribe();
  }, []);

  async function handleDeleteClick(item) {
    try {
      // Delete item from Firestore
      await deleteQueueItem(guildID_dev, { id: item.id }); // Assuming we use the document ID to delete

      // Optimistically remove the item from local state to update UI
      setQueue(currentQueue => currentQueue.filter(qItem => qItem.id !== item.id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  function handleReorder(event) {
    const { from, to } = event.detail;
    if (from === to) {
      event.detail.complete();
      return;
    }

    setQueue(currentQueue => {
      const newQueue = [...currentQueue];
      const itemToMove = newQueue.splice(from, 1)[0];
      newQueue.splice(to, 0, itemToMove);

      // Optimistically update the UI immediately
      event.detail.complete(newQueue);

      // Asynchronously update Firestore in the background
      newQueue.forEach((item, index) => {
        const itemDocRef = doc(getDb(), "guilds", guildID_dev, "queue", item.id);
        updateDoc(itemDocRef, {
          order: index
        }).catch(error => console.error("Error updating document:", error));
      });

      // Return the new state
      return newQueue;
    });
  }

  const c = 'dark'; // Your desired color

  return (
    <IonContent scrollY={true} color={c} className='reorder-content'>
      <IonList>
        <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
          {queue.map((item, index) => (
            <IonItem key={index} color={c}>
              <div className='item-container'>
                <IonLabel>
                  <h2>{item.song} - {item.artist}</h2>
                  <p>Explicit: {item.explicit ? 'Yes' : 'No'} | Duration: {item.duration_s} seconds</p>
                </IonLabel>
                <IonThumbnail slot="start">
                  <IonImg src={item.thumbnailURL}/>
                </IonThumbnail>
                <IonButton color={'danger'} onClick={() => handleDeleteClick(item)}>
                  <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
                </IonButton>
              </div>
              <IonReorder slot="end" />
            </IonItem>
          ))}
        </IonReorderGroup>
      </IonList>
    </IonContent>
  );
}

export default Reorder;
