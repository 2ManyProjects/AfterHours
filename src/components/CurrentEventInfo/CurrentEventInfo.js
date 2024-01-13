import React from 'react';

const CurrentEventInfo = () => {
  // Placeholder data. Replace with actual data from your backend or state management.
  const eventTheme = 'Gourmet Night';
  const menuDetails = 'A 5-course tasting journey through modern gastronomy.';

  return (
    <div>
      <h2>{eventTheme}</h2>
      <p>{menuDetails}</p>
    </div>
  );
};

export default CurrentEventInfo;
