import React, { useState } from 'react';
import { IonSearchbar } from '@ionic/react';

function SearchBar() {
  const [tempValue, setTempValue] = useState('');

  const guildID = '261601676941721602';

  function handleSearchChange(e) {
    setTempValue(e.detail.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (tempValue !== '') {
        
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
