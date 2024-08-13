import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../../store/actions/authActions';
import { useSnackbar } from 'notistack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const NewPasswordSet = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { token } = useParams(); // Extract the token from the URL

    const [password, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            enqueueSnackbar('Passwords do not match', { variant: 'error' });
            return;
        }
        try {
            await dispatch(resetPassword({ email, token, password, password_confirmation: confirmPassword }));
            navigate('/admin-login');
        } catch (err) {
          
            enqueueSnackbar(err.response.data.error, { variant: 'error' });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '90vh', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Enter Email</Typography>
                <TextField
                    fullWidth
                    type="email"
                   
                    size='small'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ marginBottom: 2 }}
                />
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>Enter New Password</Typography>
                <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    
                    size='small'
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    sx={{ marginBottom: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <br />
                <Typography variant="h6" sx={{fontSize:'1rem'}}>Confirm Password</Typography>
                <TextField
                    fullWidth
                    type={showConfirmPassword ? 'text' : 'password'}
                   
                    size='small'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    sx={{ marginBottom: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <br />
                <Button type="submit" variant="contained" sx={{ width: '100%' }}>Submit</Button>
            </form>
        </Box>
    );
};

export default NewPasswordSet;
