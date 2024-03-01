import React from 'react';
import { IonSearchbar } from '@ionic/react';

function SearchBar({ props }) {
  return (
    <>
      <IonSearchbar placeholder={ props }></IonSearchbar>
    </>
  );
}

export default SearchBar;