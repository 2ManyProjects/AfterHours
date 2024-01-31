import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
// Similar to LoginModal, but specific for changing the password

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
  
const ChangePasswordModal = ({ open, onClose, changePassword }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
  
    const handleChangePassword = () => {
        changePassword(currentPassword, newPassword)
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Change Password
          </Typography>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            inputProps={{ minLength: 12 }}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" fullWidth onClick={handleChangePassword}>
              Change Password
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export default ChangePasswordModal;
  