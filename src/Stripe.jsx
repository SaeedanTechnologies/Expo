import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import {
    PayPalScriptProvider,
    PayPalHostedFieldsProvider,
    PayPalHostedField,
    usePayPalHostedFields
} from '@paypal/react-paypal-js';

const SubmitPayment = () => {
    const hostedFields = usePayPalHostedFields();

    const submitHandler = () => {
        if (typeof hostedFields.submit !== 'function') return;
        hostedFields
            .submit({
                cardholderName: 'John Wick',
            })
            .then((order) => {
                fetch('/your-server-side-integration-endpoint/capture-payment-info')
                    .then((response) => response.json())
                    .then((data) => {
                        // Handle successful payment capture
                    })
                    .catch((err) => {
                        // Handle any error
                    });
            });
    };

    return <button onClick={submitHandler}>Pay</button>;
};

const Stripe = () => {
    const payments = [
        { amount: 10, currency: 'USD' },
        { amount: 20, currency: 'USD' },
        { amount: 30, currency: 'USD' },
    ];

    return (
        <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID", dataClientToken: "YOUR_DATA_CLIENT_TOKEN" }}>
            <Grid container spacing={3} sx={{ margin: '20px 0px' }}>
                {payments.map((payment, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Pay {payment.currency} {payment.amount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Enter your payment details below.
                                </Typography>
                                <PayPalHostedFieldsProvider
                                    createOrder={() => {
                                        return fetch('/your-server-side-integration-endpoint/orders')
                                            .then((response) => response.json())
                                            .then((order) => order.id)
                                            .catch((err) => {
                                                // Handle any error
                                            });
                                    }}
                                >
                                    <div>
                                        <PayPalHostedField
                                            id={`card-number-${index}`}
                                            hostedFieldType="number"
                                            options={{ selector: `#card-number-${index}` }}
                                        />
                                    </div>
                                    <div>
                                        <PayPalHostedField
                                            id={`cvv-${index}`}
                                            hostedFieldType="cvv"
                                            options={{ selector: `#cvv-${index}` }}
                                        />
                                    </div>
                                    <div>
                                        <PayPalHostedField
                                            id={`expiration-date-${index}`}
                                            hostedFieldType="expirationDate"
                                            options={{
                                                selector: `#expiration-date-${index}`,
                                                placeholder: 'MM/YY',
                                            }}
                                        />
                                    </div>
                                    <SubmitPayment />
                                </PayPalHostedFieldsProvider>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </PayPalScriptProvider>
    );
}

export default Stripe;
