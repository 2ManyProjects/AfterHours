import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

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

const MailInfoModal = ({ open, onClose,}) => {
    const {isLoggedIn, user, session, userData} = useSelector(state => state.auth)
    const [isFetching, setIsFetching] = useState(false);
    const [emails, setEmails] = useState([]);
    

    const getInfo = async (str) => { 
        // "Maillist" : "Waitlist"
        const response = await axios.get(`https://evdfbs5cqj.execute-api.ca-central-1.amazonaws.com/Prod/v1/email/list`, {params: { reqType: str , returnVals: true },
        headers: {
          'Authorization': `Bearer ${session?.AccessToken}`
        }}).catch(() => {
        });
        setIsFetching(false);
        // console.log(response);
        if(response.status === 200){
            setEmails(response.data.data.emails)
        }
    };
    const handleSubmit = async(str) => {
        // Handle login logic
        setIsFetching(true);
        
        await getInfo(str).catch(() => {
            reset();
        });
    }; 

    const reset = () => {
        onClose();
    }

    return (
    <Modal open={open} onClose={onClose}>
        <Box sx={style}>
            <Typography variant="h6" component="h2"  sx={{ color: 'grey' }} >
                Email List
            </Typography>
            {emails && emails.map((item, index) => {
                return(
                    <Typography key={index} variant="h8" component="h2"  sx={{ color: 'grey' }} >
                        {item}
                    </Typography>
                )
            })}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" disabled={isFetching} onClick={() => handleSubmit("Waitlist")}>
                    WaitList
                </Button>
                <Button variant="contained" disabled={isFetching} onClick={() => handleSubmit("Maillist")}>
                    MailList
                </Button>
            </Box>
        </Box>
    </Modal>
    );
};

export default MailInfoModal;
