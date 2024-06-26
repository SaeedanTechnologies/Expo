import React, { useEffect, useState } from 'react';
import MyTextField from '../../page/components/MyTextField';
import { Box, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import MyButton from '../../page/components/MyButton';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getFormFields } from '../../store/actions/authActions';

const SignUpForm = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    useEffect(() => {

        console.log('resultttt')

        dispatch(getFormFields(id))
            .then((result) => {
                setData(result.data.payload);
                console.log(result, 'resultttt')
                setLoading(false); // Update loading state when data is fetched
            })
            .catch((err) => {
                console.log(err);
                setLoading(false); // Update loading state on error
            });
    }, [dispatch, id]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 10%',
                minHeight: isSmall ? '80vh' : '100vh', // Full viewport height
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
                {/* Render form fields dynamically */}





                {data &&
                    data.map((field) => (
                        <MyTextField
                            key={field.id}
                            label={field.label}
                            placeholder={`Enter Your ${field.label}`}
                            type={field.type}
                        />
                    ))}
                <MyButton onClick={() => navigate('/add-judges')} text="Submit" />
            </Box>
        </Box>
    );
};

export default SignUpForm;
