import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router";
const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://expoproject.saeedantechpvt.com/api/admin/login",
          formData
        );
        console.log("API response:", response.data.payload.token);
        localStorage.setItem("token", response.data.payload.token);

        setFormData({
          email: "",
          password: "",
        });

        setSnackbarMessage("Login successful!");
        setSnackbarOpen(true);
        navigate("/");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Invalid email or password");
        } else {
          console.error("Error:", error);
          setSnackbarMessage("An error occurred. Please try again later.");
          setSnackbarOpen(true);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* Email */}
            <Grid item xs={12}>
              <Typography
                component="label"
                htmlFor="email"
                sx={{ marginBottom: 1 }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!error}
                helperText={error}
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <Typography
                component="label"
                htmlFor="password"
                sx={{ marginBottom: 1 }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                required
                error={!!error}
                helperText={error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </Box>
      </Box>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default AdminLoginForm;
