import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { styled, darken } from '@mui/system';

const CustomTextField = styled(TextField)(({ txtColor, bgColor, borderColor, borderRadius, padding }) => ({
    color: txtColor || 'black',
    backgroundColor: bgColor || 'white',
    borderColor: borderColor || '#ccc',
    borderRadius: borderRadius || '4px',
    padding: padding || '6px 0px',
    width: "100%",
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: borderColor || '#ccc',
        },
        '&:hover fieldset': {
            borderColor: borderColor ? darken(borderColor, 0.2) : '#aaa',
        },
        '&.Mui-focused fieldset': {
            borderColor: borderColor || '#ccc',
        },
    },
}));

const MyTextField = ({ label, placeholder, ...props }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>
                {label}
            </Typography>
            <CustomTextField {...props} variant="outlined" placeholder={placeholder} />
        </Box>
    );
};

export default MyTextField;
