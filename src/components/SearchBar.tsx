import React from 'react';
import { IonSearchbar } from '@ionic/react';

function SearchBar({ props }) {
  return (
    <>
      <IonSearchbar animated={true} placeholder={props}></IonSearchbar>
    </>
  );
}

export default SearchBar;
