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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress'; 
//
const stages = ['Payment Method', 'Dietary & Allergens', 'Payment Details']; 


const stripePromise = loadStripe("pk_test_51OapAiKs38rzN4gUyWjhXy3UeuJSVDz0dNgbIclUebfolO5w6DPNfcEzWsp7ru50HY7Owsv7v5oGB1vt4NsQN3V800xQi79AZ2");

function CopyBox({ text, copyText }) {
    const handleCopy = () => {
      navigator.clipboard.writeText(copyText).then(() => {
        
        console.log(copyText, 'Text copied to clipboard');
      }, (err) => {
        
        console.error(copyText, 'Could not copy text: ', err);
      });
    };
  
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column' }}>
        <Typography variant="body1">{text}</Typography>
        <Tooltip title="Copy to clipboard">
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }
const BookingModal = ({ open, onClose, eventId, ticketPrice }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [transactionConfirmationCode, setTransactionConfirmationCode] = useState(null);
    const [dietaryRestriction, setDietaryRestriction] = useState('');
    const [allergen, setAllergen] = useState('');
    const [allergenSeverity, setAllergenSeverity] = useState('');
    const [notes, setNotes] = useState('');
    const [email, setEmail] = useState('');
    const [fetching, setFetching] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern

    const initPayment = async () => { 
        const response = await axios.post(`https://evdfbs5cqj.execute-api.ca-central-1.amazonaws.com/Prod/v1/event/${eventId}/payments`, {ticketQuantity: 1, allergen, allergenSeverity, notes});
        
        setClientSecret(response?.data?.data?.clientSecret)
        return response?.data?.data?.clientSecret;
    };

    const initEtransfer = async () => { 
        setFetching(true);
        const response = await axios.put(`https://evdfbs5cqj.execute-api.ca-central-1.amazonaws.com/Prod/v1/event/${eventId}/payments`, {ticketQuantity: 1, allergen, allergenSeverity, notes, email});
        
        setTransactionConfirmationCode(response?.data?.data?.code);
        setFetching(false);
        return response?.data?.data?.code;
    };
    // const { data, error, isLoading } = useQuery("initPayment", initPayment);
///v1/event/{eventId}/payments
    useEffect(() => {

        if(currentStage === 2 && paymentMethod === ccId){
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
                        <FormControlLabel value={etranId} sx={{ color: 'black' }} control={<Radio />} label="E-Transfer" />
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column' }}>
                    <Typography>E-Transfer ${ticketPrice} (CAD)</Typography>
                    {!transactionConfirmationCode && <Button onClick={initEtransfer} disabled={fetching} >Confirm Ticket For E-transfer Instructions</Button>}
                    {transactionConfirmationCode && <Typography>Include the following in the Message box of the E-transfer</Typography>}
                    {transactionConfirmationCode && <CopyBox text={transactionConfirmationCode} copyText={transactionConfirmationCode}/>}
                    {transactionConfirmationCode && <CopyBox text={"send to Payments@mail.afterhours.2many.ca"} copyText={"Payments@mail.afterhours.2many.ca"}/>}
                    {transactionConfirmationCode && <Typography>Set the transaction password to</Typography>}
                    {transactionConfirmationCode && <CopyBox text={"AfterHours"} copyText={"AfterHours"}/>}
                </Box>
            ) : (
            <>
                {(clientSecret) && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm clientSecret={clientSecret} email={email}/>
                </Elements>
              )}
              {!clientSecret && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
                </div>
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
        width: { xs: '85vw', sm: '33vw' },  
        height: { xs: '70vh', sm: '75vh' }, 
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