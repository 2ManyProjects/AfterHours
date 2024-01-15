"use client";
import React from 'react';
import {Button} from '../../lib/mui'; 

const BookNowButton = () => {
  const handleBookNow = () => {
    console.log('Bookingprocess click');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleBookNow}>
      Book Now
    </Button>
  );
};

export default BookNowButton;
