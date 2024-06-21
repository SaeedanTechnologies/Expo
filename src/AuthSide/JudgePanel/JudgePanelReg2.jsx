import React from 'react';
import { Box, Container, Typography, TextField, Button, FormControl, InputLabel } from '@mui/material';

const JudgePanelReg2 = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your submit logic here
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
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: { xs: '12px', md: '24px' },
          }}
        >
          <Typography
            variant='h4'
            sx={{
              color: 'black',
              fontFamily: 'Roboto',
              fontSize: { xs: '24px', md: '46px' },
              fontWeight: 800,
              lineHeight: '1.2',
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
              fontSize: { xs: '16px', md: '20px' },
              fontWeight: 400,
              lineHeight: '1.4',
              textAlign: 'center',
              marginBottom: '2rem',
              color: '#949494',
            }}
          >
            Lorem ipsum dolor sit amet consectetur lorem ipsum dolor <br />
            sit amet consectetur lorem ipsum dolor sit amet.
          </Typography>

          <Box sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: '1rem' }}>
            
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
                <Box >
                  <Typography sx={{    fontFamily: 'Roboto',
                    fontSize: {xs:'16px', md:'23px'},
                    fontWeight: 700,
                    lineHeight: '1.2',
                    letterSpacing: '0.25px',
                    textAlign: 'left',
                    color: '#000000',
                  }}>Context Name</Typography>
                  
                </Box>
                <Box sx={{display:{xs:'flex', md:'block',}}}>
                  <Typography sx={{    fontFamily: 'Roboto',
                    fontSize: {xs:'16px', md:'23px'},
                    fontWeight: 700,
                    lineHeight: '1.2',
                    letterSpacing: '0.25px',
                    textAlign: 'left',
                    color: '#000000',
                  }}>Context Name</Typography>
                  <Typography sx={{ color: 'red', marginLeft: '0.5rem' }}>01</Typography>
                </Box>
                <Box sx={{display:{xs:'flex', md:'block',}}}>
                  <Typography sx={{    fontFamily: 'Roboto',
                    fontSize: {xs:'16px', md:'23px'},
                    fontWeight: 700,
                    lineHeight: '1.2',
                    letterSpacing: '0.25px',
                    textAlign: 'left',
                    color: '#000000',
                  }}>Context Name</Typography>
                  <Typography sx={{ color: 'red', marginLeft: '0.5rem' }}>47</Typography>
                </Box>
              </Box>
              
                <Typography sx={{ color: "#D8D8D8", marginBottom: '0.5rem' }}>Event Exhibition</Typography>
                <FormControl fullWidth>
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
                          padding: '0px'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderBottom: '1px solid #D1D1D1',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderBottom: '1px solid #D1D1D1',
                          padding: '0px'
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none',
                          padding: '0px'
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
                  lineHeight: '1.2',
                  letterSpacing: '0.25px',
                  textAlign: 'left',
                  color: '#000000',
                  marginBottom: '1rem',
                }}
              >
                Give Score
              </Typography>
              <Box sx={{ marginBottom: '1rem' }}>
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
                <FormControl fullWidth>
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
              </Box>
              <Box sx={{ marginBottom: '1rem' }}>
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
                <FormControl fullWidth>
                  <TextField
                    id='shading'
                    fullWidth
                    variant='outlined'
                    margin='normal'
                   
                    required
                    InputProps={{ style: { height: '60px' } }} // Apply height to the input element
                    sx={{ height: '60px' }}
                  />
                </FormControl>
              </Box>
              <Box sx={{ marginBottom: '1rem' }}>
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
                <FormControl fullWidth>
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
              </Box>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{
                  marginTop: '1rem',
                  padding: '16px',
                  fontFamily: 'Roboto',
                  fontSize: '16px',
                }}
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

export default JudgePanelReg2;
