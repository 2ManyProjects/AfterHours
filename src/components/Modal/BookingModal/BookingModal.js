import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField, Button, Select, MenuItem, FormControl, FormLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {validate} from "email-validator";
import {
    PaymentElement,
    useStripe,
    useElements,
    Elements
  } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";
  import axios from 'axios'; 
  import CheckoutForm from "./CheckoutForm";

import { useQuery } from "react-query";
//
const stages = ['Payment Method', 'Dietary & Allergens', 'Payment Details']; 


const stripePromise = loadStripe("pk_test_51OapAiKs38rzN4gUyWjhXy3UeuJSVDz0dNgbIclUebfolO5w6DPNfcEzWsp7ru50HY7Owsv7v5oGB1vt4NsQN3V800xQi79AZ2");


const BookingModal = ({ open, onClose, eventId }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    
    const [dietaryRestriction, setDietaryRestriction] = useState('');
    const [allergen, setAllergen] = useState('');
    const [allergenSeverity, setAllergenSeverity] = useState('');
    const [notes, setNotes] = useState('');
    const [email, setEmail] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern

    const initPayment = async () => { 
        const response = await axios.post(`https://evdfbs5cqj.execute-api.ca-central-1.amazonaws.com/Prod/v1/event/${eventId}/payments`, {ticketQuantity: 1});
        console.log(response?.data?.data?.clientSecret);
        setClientSecret(response?.data?.data?.clientSecret)
        return response?.data?.data?.clientSecret;
    };
    // const { data, error, isLoading } = useQuery("initPayment", initPayment);
///v1/event/{eventId}/payments
    useEffect(() => {

        if(currentStage === 1 && paymentMethod === ccId){
            initPayment();
        }
    },[currentStage] )


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const isEmailValid = emailRegex.test(email) || validate(email);

    const localClose = () => {
        setCurrentStage(0);
        setPaymentMethod('');
        setDietaryRestriction('');
        setAllergen('');
        setAllergenSeverity('');
        setNotes('');
        setEmail('');
        // console.log('LocalClose');
        onClose();
    }

    const ccId = "CreditCard";
    const etranId = "eTransfer";
    const handleNextStage = () => setCurrentStage((prev) => prev + 1);
    const handlePreviousStage = () => setCurrentStage((prev) => prev - 1);


    const disableContinue = () => {
        switch (currentStage) {
        case 0:
            
            return ![etranId, ccId ].includes(paymentMethod) || !isEmailValid;
        case 1:
            return false;
        case 2:
            return true;
        default:
            return null;
        }
    };


    const renderStageContent = () => {
        switch (currentStage) {
        case 0:
            return (
                <FormControl component="fieldset">
                    <FormLabel component="legend">Payment Method</FormLabel>
                        <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <FormControlLabel value={etranId} disabled sx={{ color: 'black' }} control={<Radio />} label="E-Transfer" />
                        <FormControlLabel value={ccId} sx={{ color: 'black' }} control={<Radio />} label="Credit/Debit Card" />
                    </RadioGroup>
                    <TextField
                    label="Email Address For E-Ticket"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={!isEmailValid && email !== ''}
                    helperText={!isEmailValid && email !== '' ? "Enter a valid email address" : ""}
                    />
                    <Typography sx={{fontSize: 12, color: 'black'}}>* We do not store your email or add you to any mailing list</Typography>
                </FormControl>
            );
        case 1:
            return (
            <>
                <TextField
                label="Allergen(s)"
                value={allergen}
                onChange={(e) => setAllergen(e.target.value)}
                fullWidth
                />
                <Select
                label="Severity"
                value={allergenSeverity}
                onChange={(e) => setAllergenSeverity(e.target.value)}
                fullWidth
                >
                    <MenuItem value='none'>None</MenuItem>
                <MenuItem value="mild">Mild (Coughing, Rash, Localized itching,  digestive issues)</MenuItem>
                <MenuItem value="medium">Medium (Facial swelling, widespreach rash / itching, Hives, difficulty breathing, nausea)</MenuItem>
                <MenuItem value="severe">Medically Severe (requires Epi-pen or medical assistance on exposure, high risk of anaphylaxis shock)</MenuItem>
                </Select>
                <TextField
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                multiline
                />
            </>
            );
        case 2:
            return paymentMethod === etranId ? (
            <Typography>Placeholder for E-Transfer Instructions</Typography>
            ) : (
    <>      {(clientSecret) && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm clientSecret={clientSecret} email={email}/>
                </Elements>
              )}
              
            </>
            );
        default:
            return null;
        }
    };

    return (
        <Modal open={open} onClose={localClose}>
        <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '33vw',
        height: '75vh',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        overflowY: 'auto',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: `#e8c7d0`, 
        borderRadius: '16px' 
        }}>
        <IconButton 
            onClick={localClose} 
            sx={{ 
                position: 'absolute',
                top: 8, 
                left: 8, 
                color: 'grey'
            }}>
            <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'grey' }}>
            {stages[currentStage]}
        </Typography>
        {renderStageContent()}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button onClick={handlePreviousStage} disabled={currentStage === 0}>Back</Button>
            <Button onClick={handleNextStage} disabled={currentStage === stages.length - 1 || disableContinue()} >Continue</Button>
        </Box>
        </Box>
    </Modal>
    );
};

export default BookingModal;