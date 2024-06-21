import React from 'react'
import MyTextField from '../../page/components/MyTextField'
import { Box, Typography } from '@mui/material'
import MyButton from '../../page/components/MyButton'
import { useNavigate } from 'react-router'

const AddEvent = () => {
    const navigate = useNavigate()

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh', // Full viewport height
        padding:'1rem 10%'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                // alignItems: 'center',
                justifyContent: 'center',
                width: '400px',
                margin: '0 auto'
            }}>
                <Typography sx={{
                    fontSize: '36px',
                    fontWeight: 700,
                    textAlign: 'center'

                }}>
                    Add Event
                </Typography>
                <Typography sx={{
                    color: '#949494',
                    fontSize: '16px',
                    fontWeight: 300,
                    textAlign: 'center'
                }}>
                    Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
                </Typography>
                <Box>
                    <MyTextField label="Event Name" placeholder="Please Write Convention Name " />
                </Box>
                <MyButton onClick={() => navigate('/admin/add-content')} text="Next" />
            </Box>

        </Box>
    )
}

export default AddEvent