
import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendEmail } from '../../../store/actions/authActions';


const SendEmailForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendEmail({ email }))
            .then((res) => {
                enqueueSnackbar(res.data.message, { variant: 'success' });
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.error || 'Failed to send email';
                enqueueSnackbar(errorMessage, { variant: 'error' });
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '90vh', justifyContent: 'center', flexDirection:'column', width:'100%' }}>
            <Typography variant="h6" >Enter Email to Reset Password</Typography>
            <br/>
            <form onSubmit={handleSubmit}>
                <TextField
                fullWidth
                    type="email"
                    label="Email"
                    size='small'
            
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ marginBottom: 2, }}
                />
<br/>
                <Button type="submit" variant="contained" sx={{width:'100%'}}>Submit</Button>
            </form>
        </Box>
    );
};

export default SendEmailForgotPassword;
