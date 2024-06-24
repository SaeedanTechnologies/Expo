import React from 'react';
import { Box, Container, Typography, TextField, Button, FormControl, InputLabel } from '@mui/material';

const JudgePanelReg = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
    <Container >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '12px',
        }}
      >
        <Typography
          variant='h4'
          sx={{
            color: 'black',
            fontFamily: 'Roboto',
            fontSize: { xs: '22px', md: '46px' },
            fontWeight: 800,
            lineHeight: '36px',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          HAMZA YASIN
        </Typography>
        <Typography
          variant='h6'
          sx={{
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '28px',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#949494',
          }}
        >
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />
          sit amet consectetur lorem ipsum dolor sit amet.
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '500px' }}>
          <form onSubmit={handleSubmit}>
          <Box>
          <InputLabel
          htmlFor='contextname'
          sx={{
            marginBottom: '0rem',
            fontFamily: 'Roboto',
            fontSize: '22px',
            fontWeight: 1000,
            lineHeight: '28px',
            letterSpacing: '0.25px',
            textAlign: 'left',
            color: '#000000',
          }}
        >
          Context Name
        </InputLabel>
        <Typography sx={{color:"#D8D8D8"}}>Event Exhibition</Typography>
        <FormControl fullWidth >
          <TextField
            id='contextname'
            fullWidth
            variant='outlined'
            margin='normal'
            required
            InputProps={{
            
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderBottom: '1px solid #D1D1D1', 
                  borderLeft: 'none', 
                  borderRight: 'none', 
                  borderTop: 'none', 
                  padding:'0px'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderBottom: '2px solid #D1D1D1', 
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderBottom: '2px solid #D1D1D1', 
                },
              },
            }}
            sx={{
            
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none', 
                },
              },
            }}
          />
        </FormControl>
        
       
          </Box>
          <Typography
          variant="h5"
          sx={{
            fontFamily: 'Roboto',
            fontSize: '34px',
            fontWeight: 700,
            lineHeight: '28px',
            letterSpacing: '0.25px',
            textAlign: 'left',
            color: '#000000',
            marginBottom: '1rem',
          }}
        >
          Give Score
        </Typography>
          <InputLabel
          htmlFor='linework'
          sx={{
            marginBottom: '0.5rem',
            fontFamily: 'Roboto',
            fontSize: '22px',
            fontWeight: 1000,
            lineHeight: '28px',
            letterSpacing: '0.25px',
            textAlign: 'left',
            color: '#000000',
          }}
        >
          LineWork
        </InputLabel>
        <FormControl fullWidth sx={{ marginBottom: '1rem', }}>
          <TextField
            id='linework'
            fullWidth
            variant='outlined'
            margin='normal'
            required
            InputProps={{ style: { height: '60px' } }} // Apply height to the input element
            sx={{ height: '60px' }} 
          />
        </FormControl>
          <InputLabel
          htmlFor='shading'
          sx={{
            marginBottom: '0.5rem',
            fontFamily: 'Roboto',
            fontSize: '22px',
            fontWeight: 1000,
            lineHeight: '28px',
            letterSpacing: '0.25px',
            textAlign: 'left',
            color: '#000000',
          }}
        >
          Shading
        </InputLabel>
        <FormControl fullWidth sx={{ marginBottom: '1rem', }}>
          <TextField
            id='shading'
            fullWidth
            variant='outlined'
            margin='normal'
            placeholder='e.g 0-10'
            required
            InputProps={{ style: { height: '60px' } }} // Apply height to the input element
            sx={{ height: '60px' }} 
          />
        </FormControl>
            <InputLabel
              htmlFor='design'
              sx={{
                marginBottom: '0.5rem',
                fontFamily: 'Roboto',
                fontSize: '22px',
                fontWeight: 1000,
                lineHeight: '28px',
                letterSpacing: '0.25px',
                textAlign: 'left',
                color: '#000000',
              }}
            >
              Design
            </InputLabel>
            <FormControl fullWidth sx={{ marginBottom: '1rem', }}>
              <TextField
                id='design'
                fullWidth
                variant='outlined'
                margin='normal'
                required
                InputProps={{ style: { height: '60px' } }} // Apply height to the input element
                sx={{ height: '60px' }} 
              />
            </FormControl>

            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{ marginTop: '1rem' , padding:'22px',  fontFamily: 'Roboto',}}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default JudgePanelReg;
