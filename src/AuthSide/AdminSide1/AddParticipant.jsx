import React, { useState } from 'react';
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router';
import { SlCloudDownload } from 'react-icons/sl';

const AddParticipant = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleYesClick = () => {
        if (!inputValue.includes('*')) {
            setInputValue((prevValue) => prevValue + '*');
        }
    };

    const handleNoClick = () => {
        setInputValue((prevValue) => prevValue.replace('*', ''));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileUpload = () => {
        // Implement file upload logic here
        console.log('Uploaded file:', selectedFile);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    justifyContent: 'center',
                    margin: '0 auto',
                    maxWidth: '600px', // Adjust as per your layout
                    width: '100%', // Adjust as per your layout
                }}
            >
                <Typography
                    sx={{
                        fontSize: '36px',
                        fontWeight: 700,
                        textAlign: 'center',
                    }}
                >
                    Add Participant
                </Typography>
                <Typography
                    sx={{
                        color: '#D90B0F',
                        fontSize: '16px',
                        fontWeight: 300,
                        textAlign: 'center',
                    }}
                >
                    Note: You have an option to mark yes or no. If you click yes, that field will not be seen by the judge.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        height: '100%',
                        gap: '20px',
                    }}
                >
                    <Box
                        flex={1}
                        sx={{
                            backgroundColor: '#F9FAFC',
                            padding: '20px',
                            borderRight: '1px solid #D8D8D8',
                        }}
                    >
                        <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>Field Selection</Typography>
                        <Box sx={{ display: 'flex', gap: '10px', mt: '10px' }}>
                            <Button
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#F7F7F7',
                                    border: '1px solid #D1D1D1',
                                    borderRadius: '4px',
                                    color: 'black',
                                    padding: '5px 10px',
                                }}
                            >
                                Text Field
                            </Button>
                            <Button
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#F7F7F7',
                                    border: '1px solid #D1D1D1',
                                    borderRadius: '4px',
                                    color: 'black',
                                    padding: '5px 10px',
                                }}
                            >
                                Picture
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        flex={1}
                        sx={{
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            variant="outlined"
                            placeholder="Enter text"
                            value={inputValue}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            onClick={handleYesClick}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{ marginRight: '4px' }}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            onClick={handleNoClick}
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                        >
                                            No
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ width: '100%' }}
                        />
                        <Box
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            sx={{
                                backgroundColor: '#FBF1F1',
                                border: '2px dashed #D90B0F',
                                borderRadius: '12px',
                                padding: '20px',
                                width: '95%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px',
                                textAlign: 'center',
                                minHeight: '150px', // Set a minimum height to make drop area more visible
                            }}
                        >
                            <SlCloudDownload size={40} style={{ color: '#D90B0F' }} />
                            <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Drop Here</Typography>
                            <Typography sx={{ color: '#676767', fontSize: '11px' }}>
                                Supported formats: Any image format, pdf, doc, docx, txt
                            </Typography>
                            {selectedFile && (
                                <Typography sx={{ fontSize: '12px', fontWeight: 600, marginTop: '10px' }}>
                                    Selected File: {selectedFile.name}
                                </Typography>
                            )}
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/admin/add-QR')}
                            sx={{ width: '100%', marginTop: '20px' }}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddParticipant;