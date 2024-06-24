import React, { useState } from 'react';
import MyTextField from '../../page/components/MyTextField';
import { Box, Typography, Snackbar } from '@mui/material';
import MyButton from '../../page/components/MyButton';
import { useNavigate } from 'react-router';

const AddContent = () => {
  const navigate = useNavigate();
  const [contestName, setContestName] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleContestNameChange = (event) => {
    setContestName(event.target.value);
    setError('');
  };

  const handleSubmit = () => {
    if (!contestName.trim()) {
      setError('Contest Name is required');
      setSnackbarMessage('Please enter the contest name.');
      setSnackbarOpen(true);
      return;
    }
    // Pass contestName to the next page
    navigate('/admin/add-registration', { state: { contestName } });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        padding: '1rem 10%',
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
          Add Contest
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
          <MyTextField
            label="Contest Name"
            placeholder="Please Write Your Contest Name"
            value={contestName}
            onChange={handleContestNameChange}
            error={!!error}
            helperText={error}
          />
        </Box>
        <MyButton onClick={handleSubmit} text="Next" />
      </Box>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default AddContent;
