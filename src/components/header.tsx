import React from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle } from 'ionicons/icons';

const Header: React.FC = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="primary">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="start">
                        <IonButton>
                            <IonMenuButton autoHide={false}></IonMenuButton>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Icon Buttons</IonTitle>
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default Header;