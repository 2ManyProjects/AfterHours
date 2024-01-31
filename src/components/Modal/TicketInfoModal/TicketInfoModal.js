import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: { xs: '85vw', sm: '40vw' },  
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const TicketInfoModal = ({ open, onClose, ticketData}) => {
    

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', color: 'grey' }}>
        Ticket Info:
        </Typography>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', color: 'grey' }}>
          ID: {ticketData?.id}
        </Typography>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', color: 'grey' }}>
          email: {ticketData?.userEmail}
        </Typography>
        <Typography variant="h6" component="h2"sx={{ textAlign: 'center', color: 'grey' }}>
          payment: {ticketData?.paymentType}
        </Typography>
        <Typography variant="h6" component="h2"sx={{ textAlign: 'center', color: 'grey' }}>
            allergen: {ticketData?.metadata?.allergen}
        </Typography>
        <Typography variant="h6" component="h2"sx={{ textAlign: 'center', color: 'grey' }}>
            allergenSeverity: {ticketData?.metadata?.allergenSeverity}
        </Typography>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', color: 'grey' }}>
            notes: {ticketData?.metadata?.notes}
        </Typography>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center', color: 'grey' }}>
            Over18: {!!ticketData?.metadata?.isOver18}
        </Typography>
      </Box>
    </Modal>
  );
};

export default TicketInfoModal;
