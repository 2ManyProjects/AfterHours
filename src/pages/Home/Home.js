import React from 'react';
import CurrentEventInfo from '../../components/CurrentEventInfo/CurrentEventInfo.js';
import BookNowButton from '../../components/BookNowButton/BookNowButton.js';

const HomePath = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <CurrentEventInfo />
      <BookNowButton />
    </div>
  );
};

export default HomePath;
