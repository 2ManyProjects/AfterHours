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

const LoginModal = ({ open, onClose, login, forgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleLogin = async() => {
    // Handle login logic
    setIsFetching(true);
    // setTimeout(()=> setIsFetching(false), 1500)
    await login(email,password);
    setIsFetching(false);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Login
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
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" disabled={isFetching} onClick={handleLogin}>
            Login
          </Button>
          <Button color="secondary" onClick={handleForgotPassword}>
            Forgot Password?
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
