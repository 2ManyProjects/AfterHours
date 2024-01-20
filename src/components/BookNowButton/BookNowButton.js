"use client";
import React from 'react';
import {Button} from '@mui/material'; 

const BookNowButton = () => {
  const handleBookNow = () => {
    console.log('Booking processInitiated');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleBookNow}>
      Book Now
    </Button>
  );
};

export default BookNowButton;
