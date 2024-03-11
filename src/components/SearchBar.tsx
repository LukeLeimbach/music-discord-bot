import React, { useState } from 'react';
import { IonSearchbar } from '@ionic/react';

function SearchBar({ onSearchSubmit }) {
  const [tempValue, setTempValue] = useState('');

  const handleSearchChange = (e) => {
    setTempValue(e.detail.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (tempValue !== '') {
        onSearchSubmit(tempValue);
      }
    }
  }

  return (
      <IonSearchbar
        animated={true}
        placeholder={"Search for a song"}
        value={tempValue}
        onIonInput={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
  );
}

export default SearchBar;
