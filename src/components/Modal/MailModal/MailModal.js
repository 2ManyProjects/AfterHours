import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';

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

const MailModal = ({ open, onClose,}) => {
    const [email, setEmail] = useState('');

    const [isFetching, setIsFetching] = useState(false);
    const [isMaillist, setIsMailList] = useState(false);
    const [isWaitlist, setIsWaitList] = useState(false);

    const submit = async () => { 
        const response = await axios.post(`https://evdfbs5cqj.execute-api.ca-central-1.amazonaws.com/Prod/v1/email/list`, {isMaillist, isWaitlist, email});
        
        return response;
    };
    const handleSubmit = async() => {
        // Handle login logic
        setIsFetching(true);
        console.log(isMaillist, isWaitlist); 
        await submit().catch(() => {
            reset();
        });
        reset();
    }; 

    const reset = () => {
        setEmail('');
        setIsFetching(false);
        setIsMailList(false);
        setIsWaitList(false);
        onClose();
    }

    return (
    <Modal open={open} onClose={onClose}>
        <Box sx={style}>
        <Typography variant="h6" component="h2"  sx={{ color: 'grey' }} >
            Email List
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
        <FormGroup >
            <FormControlLabel control={<Checkbox value={isMaillist} onChange={(e) => setIsMailList(!isMaillist)}/>} label="Mailing List" sx={{ color: 'grey' }} />
            <FormControlLabel control={<Checkbox  value={isWaitlist} onChange={(e) => setIsWaitList(!isWaitlist)} />} label="Wait List" sx={{ color: 'grey' }} />
        </FormGroup>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" disabled={isFetching || email?.length < 4} onClick={handleSubmit}>
            Submit
            </Button>
        </Box>
        </Box>
    </Modal>
    );
};

export default MailModal;
