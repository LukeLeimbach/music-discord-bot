import React from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import '../css/Header.css'

function Header() {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Wall Music Dashboard</IonTitle>
                    <IonButtons slot="primary">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="start">
                        <IonButton>
                            <IonMenuButton autoHide={false} color='light'></IonMenuButton>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default Header;
