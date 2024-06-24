import React from 'react';
import { Box, Container, TextField, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';

const LoginAdminPanel = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      {/* Left side (White background) */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Container maxWidth="xs">
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
            />
            <Button
            fullWidth
            variant="text"
            color="primary"
            sx={{ mt: 1 }}
          >
            Forgot Password?
          </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          
          </form>
        </Container>
      </Box>
      {/* Right side (Red background) */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'red',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography variant="h4">
          Welcome to the Admin Panel
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginAdminPanel;
