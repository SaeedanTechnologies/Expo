import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Stripe = () => {
    // Payment amounts and currencies for each card
    const payments = [
        { amount: 10, currency: 'USD' },
        { amount: 20, currency: 'USD' },
        { amount: 30, currency: 'USD' },
    ];

    // Handle successful payment
    const handlePaymentSuccess = (details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);
        // Additional code to handle payment success, e.g., updating your database
    };

    return (
        // Initialize PayPalScriptProvider with your client ID and preferred currency
        <PayPalScriptProvider options={{ "client-id": "AUZ2j3nbTN3Gw2KEVhfz_A_hmG8oP5JlZCkMaxquFk7SWbQyryUGm3EleGVr4vO8J1cmO8_3lPIf1tD1", currency: "USD" }}>
            <Grid container spacing={3} sx={{ margin: '20px 0px' }}>
                {payments.map((payment, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Pay {payment.currency} {payment.amount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Click the button below to proceed with the payment.
                                </Typography>
                                <PayPalButtons
                                    style={{ layout: 'vertical' }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [{
                                                amount: {
                                                    value: payment.amount,
                                                },
                                            }],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then(details => {
                                            handlePaymentSuccess(details, data);
                                        });
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </PayPalScriptProvider>
    );
}

export default Stripe;
