import { Box, Typography } from '@mui/material';
import React from 'react';
import { MdOutlineWavingHand } from "react-icons/md";
import { useNavigate } from 'react-router';

const Welcome = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Full viewport height
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '500px',
                margin: '0 auto'
            }}>
                <Typography sx={{
                    fontSize: '36px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    Welcome Hamza
                    <MdOutlineWavingHand style={{ color: '#D90B0F' }} />
                </Typography>
                <Typography sx={{
                    color: '#949494',
                    fontSize: '16px',
                    fontWeight: 300,
                    textAlign: 'center'
                }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem molestias quae quisquam
                </Typography>
                <Box onClick={() => navigate('/admin/add-event')} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#F6F6F6',
                    borderRadius: '12px',
                    padding: '20px',
                    gap: '10px',
                    cursor: 'pointer'
                }}>
                    <img src="/expoLogo.png" alt="" style={{ height: '10vh' }} />
                    <Box>
                        <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Add Event</Typography>
                        <Typography sx={{ fontSize: '13px', color: '#949494' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores necessitatibus magni explicabo!</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Welcome;
