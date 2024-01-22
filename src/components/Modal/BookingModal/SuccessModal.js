import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { keyframes } from '@emotion/react';

function SuccessModal() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentIntent = searchParams.get('payment_intent');
    const redirectStatus = searchParams.get('redirect_status');

    if (paymentIntent && redirectStatus === 'succeeded') {
      setShowModal(true);
    }
  }, [location]);

  const handleClose = () => {
    setShowModal(false); 
  };

  const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  `;

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: { xs: '90vw', sm: '33vw' },  
    width: fullScreen ? '90%' : 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    animation: `${fadeIn} 500ms ease-out`
  };

  return (
    <Modal open={showModal} onClose={handleClose}>
      <Box sx={modalStyle}>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main' }} />
        <Typography variant="h6" sx={{ fontSize: 20, color: 'success.main' }} component="h2" textAlign="center">
          Payment Successful
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 20, color: 'success.main' }} textAlign="center">
          Your payment was processed successfully!
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 20, color: 'success.main' }} textAlign="center">
          Your tickets should be emailed to you shortly
        </Typography>
        <Button variant="contained" color="success" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default SuccessModal;