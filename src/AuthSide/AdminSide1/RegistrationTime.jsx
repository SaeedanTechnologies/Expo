import React from 'react'
import MyTextField from '../../page/components/MyTextField'
import { Box, Typography } from '@mui/material'
import MyButton from '../../page/components/MyButton'
import { Navigate, useNavigate } from 'react-router'

const AddRegistration = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh', // Full viewport height
            padding:'1rem 5%'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                // alignItems: 'center',
                justifyContent: 'center',
                width: '500px',
                margin: '0 auto'
            }}>
                <Typography sx={{
                    fontSize: '36px',
                    fontWeight: 700,
                    textAlign: 'center'

                }}>
                    Add Registration
                </Typography>
                <Typography sx={{
                    color: '#949494',
                    fontSize: '16px',
                    fontWeight: 300,
                    textAlign: 'center'
                }}>
                    Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <MyTextField label="Start Contest Time" placeholder="5:30 PM" />
                    <MyTextField label="End Contest Time" placeholder="6:30 PM" />
                </Box>
                <Box>
                    <MyTextField label="Max Contestant" placeholder="e.g 100" />
                </Box>
                <MyButton onClick={() => navigate('/admin/add-participant')} text="Next" />
            </Box>

        </Box>
    )
}

export default AddRegistration;