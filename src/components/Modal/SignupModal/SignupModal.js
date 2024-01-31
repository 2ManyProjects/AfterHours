import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: { xs: '85vw', sm: '33vw' },  
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
  

const SignUpModal = ({ open, onClose, signUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignUp = () => {
        signUp(email, password);
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Sign Up
          </Typography>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ minLength: 12 }}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" fullWidth onClick={handleSignUp}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export default SignUpModal;
  