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
import { Navigate, useNavigate } from "react-router";
import {useDispatch} from 'react-redux'
import { adminRegister } from "../../store/actions/authActions";

const AdminSignUpForm = () => {
    const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error message when user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


const [formValues, setFormValues] = useState()
const dispatch = useDispatch()


  // const handleSubmit = async (event) => {
  //   event.preventDefault();


  //   dispatch(adminRegister(formData))
  //   .then((res) => {

  //     setFormValues(res.data.payload);

  //     enqueueSnackbar("User Registered Successfully", { variant: "success" });



  //     navigate("/admin-login");
  //   })
  //   .catch((err) => {


  //     enqueueSnackbar('Failed to Register', { variant: "error" });
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);

      try {
        const res = await dispatch(adminRegister(formData));
        setSnackbarMessage("Registered Successfully");
        setSnackbarOpen(true);
        navigate("/admin-login");
      } catch (err) {
        
        setSnackbarMessage("Failed to Register");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };


  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
      valid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Email address is invalid";
      valid = false;
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
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
          Admin Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="label" htmlFor="name" sx={{ marginBottom: 1 }}>
                Name
              </Typography>
              <TextField
                fullWidth
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" htmlFor="phone">
                Phone
              </Typography>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!formErrors.phone}
                helperText={formErrors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" htmlFor="email" sx={{ marginBottom: 1 }}>
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
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="label" htmlFor="password" sx={{ marginBottom: 1 }}>
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
                error={!!formErrors.password}
                helperText={formErrors.password}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 , padding:'9px'}}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default AdminSignUpForm;
