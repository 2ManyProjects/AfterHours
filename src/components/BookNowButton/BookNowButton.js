import React from 'react';
import Button from '@mui/material/Button';

const BookNowButton = () => {
  const handleBookNow = () => {
    console.log('Booking process initiated');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleBookNow}>
      Book Now
    </Button>
  );
};

export default BookNowButton;
