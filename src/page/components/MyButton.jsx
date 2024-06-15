import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ bgColor, txtColor, padding, borderRadius }) => ({
    backgroundColor: bgColor || '#D90B0F',
    color: txtColor || 'white',
    padding: padding || '8px 16px',
    borderRadius: borderRadius || '4px',
    '&:hover': {
        backgroundColor: bgColor ? '#D90B0F' : '#D90B0F',
    },
}));

const MyButton = ({ text, ...props }) => {
    return (
        <CustomButton {...props}>
            {text}
        </CustomButton>
    );
};

export default MyButton;
