// import React from 'react'
// import MyTextField from '../../page/components/MyTextField'
// import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
// import MyButton from '../../page/components/MyButton'
// import { useNavigate } from 'react-router'

// const SignUpForm = () => {
//     const navigate = useNavigate()
// const theme = useTheme()
//     const isSmall = useMediaQuery(theme.breakpoints.down('sm'));


//     return (
//         <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding:'1rem 10%',
//             height: isSmall ? '80vh':'100vh', // Full viewport height
//         }}>
//             <Box sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '20px',
//                 // alignItems: 'center',
//                 justifyContent: 'center',
//                 width: '400px',
//                 margin: '0 auto'
//             }}>
//                 <Typography sx={{
//                     fontSize: '36px',
//                     fontWeight: 700,
//                     textAlign: 'center'

//                 }}>
//                     Sign Up As a Participant
//                 </Typography>
//                 <Typography sx={{
//                     color: '#949494',
//                     fontSize: '16px',
//                     fontWeight: 300,
//                     textAlign: 'center'
//                 }}>
//                     Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
//                 </Typography>
//                 <Box>
//                     <MyTextField label="Name" placeholder="Enter Your Name " />
//                     <MyTextField label="Email" placeholder="Enter Your Email " />
//                     <MyTextField label="Skill" placeholder="Enter Your Skill " />
//                 </Box>
//                 <MyButton onClick={() => navigate('/add-judges')} text="Submit" />
//             </Box>

//         </Box>
//     )
// }

// export default SignUpForm

import React, { useEffect, useState } from 'react';
import MyTextField from '../../page/components/MyTextField';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import MyButton from '../../page/components/MyButton';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const contest_id = localStorage.getItem('add_register_response');
    const token = localStorage.getItem('token');
    const [formFields, setFormFields] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
        try {
            const apiUrl = `https://expoproject.saeedantechpvt.com/api/admin/form_fields/${contest_id}`;
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            if (response.ok) {
                setFormFields(responseData.payload);
            } else {
                throw new Error(responseData.message || 'Failed to fetch form fields');
            }
        } catch (error) {
            console.error('Error fetching form fields:', error);
        }
    };

    if (contest_id && token) {
        fetchData();
    }
}, [contest_id, token]);
 

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 10%',
                height: isSmall ? '80vh' : '100vh', // Full viewport height
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    justifyContent: 'center',
                    width: '400px',
                    margin: '0 auto',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '36px',
                        fontWeight: 700,
                        textAlign: 'center',
                    }}
                >
                    Sign Up As a Participant
                </Typography>
                <Typography
                    sx={{
                        color: '#949494',
                        fontSize: '16px',
                        fontWeight: 300,
                        textAlign: 'center',
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet.
                </Typography>
                <Box>
                    {formFields.map((field, index) => (
                        <MyTextField
                            key={index}
                            label={field.label}
                            placeholder={`Enter Your ${field.label}`}
                        />
                    ))}
                </Box>
                <MyButton onClick={() => navigate('/add-judges')} text="Submit" />
            </Box>
        </Box>
    );
};

export default SignUpForm;
