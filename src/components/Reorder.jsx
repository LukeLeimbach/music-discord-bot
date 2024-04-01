import React, { useState, useEffect } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, IonThumbnail, IonImg, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { deleteQueueItem } from '../queue.mjs';
import { doc, updateDoc, collection, query, onSnapshot } from "firebase/firestore";
import getDb from '../firebaseConfig.mjs';
import '../css/Reorder.css';

function Reorder() {
  const [queue, setQueue] = useState([]);

  const devTestGuildId = process.env.REACT_APP_DEV_GUILD_ID;

  useEffect(() => {
    console.log("Getting db..")
    const db = getDb();
    console.log("Querying queue collection...")
    const q = query(collection(db, "guilds", devTestGuildId, "queue"));
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
  }, [devTestGuildId]);

  async function handleDeleteClick(item) {
    try {
      // Delete item from Firestore
      await deleteQueueItem(devTestGuildId, { id: item.id }); // Assuming we use the document ID to delete

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

    // Setting queue
    setQueue(currentQueue => {
      const newQueue = [...currentQueue];
      const itemToMove = newQueue.splice(from, 1)[0];
      newQueue.splice(to, 0, itemToMove);

      // Asynchronously update Firestore in the background
      newQueue.forEach((item, index) => {
        const itemDocRef = doc(getDb(), "guilds", devTestGuildId, "queue", item.id);
        updateDoc(itemDocRef, {
          order: index
        }).catch(error => console.error("Error updating document:", error));
      });

      // Complete reordering event
      event.detail.complete(newQueue);

      // Return the new state
      return newQueue;
    });
  }

  const c = 'dark'; // Dark Color
  const t = 'tertiary'; // Primary color

  return (
    <IonContent scrollY={true} color={c} className='reorder-content'>
      <IonList>
        <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
          {queue.map((item, index) => (
            <IonItem key={index} color={index === 0 ? t : c}>
              <div className='item-container'>
                <IonThumbnail slot="start">
                  <IonImg src={item.thumbnailURL}/>
                </IonThumbnail>
                <IonLabel>
                  <h2>Song: {item.song}</h2>
                  <p>Artist: {item.artist}</p>
                </IonLabel>
              </div>
              <IonButton slot='end' color={'danger'} fill='outline' onClick={() => handleDeleteClick(item)}>
                <IonIcon slot="icon-only" color='danger' size='large' icon={trashOutline}></IonIcon>
              </IonButton> 
              <IonReorder slot="end" />
            </IonItem>
          ))}
        </IonReorderGroup>
      </IonList>
    </IonContent>
  );
}

export default Reorder;
