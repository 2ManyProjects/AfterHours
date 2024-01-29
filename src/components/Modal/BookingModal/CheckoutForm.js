import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function CheckoutForm({clientSecret, email}) {
    // console.log(clientSecret)
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!stripe) {
            return;
        } 

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
            case "succeeded":
                setMessage("Payment succeeded!");
                break;
            case "processing":
                setMessage("Your payment is processing.");
                break;
            case "requires_payment_method":
                setMessage("Enter Payment details");
                break;
            default:
                setMessage("");
                break;
            }
            setIsLoading(false);
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        console.log("HandleSubmit")
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const stripeResponse = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://afterhours.2many.ca",
                receipt_email: email,
            },
        });
        const { error } = stripeResponse ;
        console.log(stripeResponse)

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
    layout: "tabs"
    }

    return (
    <form id="payment-form" >
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // This will center the child components vertically
            alignItems: 'center',}}>
            {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
                </div>
            )}
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <Button disabled={isLoading || !stripe || !elements} id="submit" onClick={handleSubmit}>
            <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
            </span>
            </Button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}

        </Box>
    </form>
    );
}