import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../store/actions/authActions";
import { useNavigate } from "react-router";
const LoginAdminPanel = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password: "",
    rememberMe: false,
  });

  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await dispatch(adminLogin(formData));
      console.log("Login successful", response);
     const contestId = response.data.payload.user.contest_id;

     console.log(contestId, 'id on judge login')

     navigate(`/judge-score-card/${contestId}`);



    } catch (error) {
      console.error("Login failed", error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Container maxWidth="xs">
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              fontFamily: "Roboto",
              fontSize: { xs: "28px", md: "46px" },
              fontWeight: "400",
              lineHeight: "76.82px",
              textAlign: "center",
            }}
          >
            Welcome back!
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "24px",
              color: "#666687",
              textAlign: "center",
            }}
          >
            Please input your information in the fields below to enter your
            Journey platform.
          </Typography>
          <form onSubmit={handleSubmit}>
          <Typography
          component="label"
          sx={{
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "700",
            lineHeight: "20px",
            color: "#666687",
            marginTop: "16px",
            display: "block",
            color: "black",
          }}
        >
         Email
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          type="text"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}

        />
            <Typography
              component="label"
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "20px",
                color: "#666687",
                marginTop: "16px",
                display: "block",
                color: "black",
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    color="primary"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                }
                label="Remember me"
                sx={{ mt: 1 }}
              />
            
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ mt: 2, padding: "16px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>
        </Container>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#C61013",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            width: "70%",
            height: "70%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(165, 23, 26, 0.2) 0%, rgba(173, 21, 24, 0.2) 100%), linear-gradient(162.74deg, rgba(198, 16, 19, 0.2) 6.85%, rgba(0, 0, 0, 0) 89.34%)",
            zIndex: 999,
            clipPath: "circle(50% at 100% 0%)",
          }}
        />
        <Box>
          <Typography
            variant="h4"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            What's new
          </Typography>
          <Box sx={{ mt: 2, display: "flex" }}>
            <Box sx={{ padding: "8px", height: "42px" }}>
              <FontAwesomeIcon icon={faInfoCircle} size="2x" />
            </Box>
            <Box>
              <Typography>
                New Module
                <br />
                Go4Clients - Send a SMS
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2, display: "flex" }}>
            <Box sx={{ padding: "8px", height: "42px" }}>
              <FontAwesomeIcon icon={faInfoCircle} size="2x" />
            </Box>
            <Box>
              <Typography>
                New Module
                <br />
                Go4Clients - Send an Email
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2, display: "flex" }}>
            <Box sx={{ padding: "8px", height: "42px" }}>
              <FontAwesomeIcon icon={faInfoCircle} size="2x" />
            </Box>
            <Box>
              <Typography>
                New Module
                <br />
                Go4Clients - Initiate a DRIP (Automation) with a SMS
              </Typography>
            </Box>
          </Box>
          <Button
            sx={{
              width: "122px",
              marginLeft: "12px",
              height: "36px",
              padding: "10px 16px",
              gap: "8px",
              borderRadius: "4px 0px 0px 0px",
              border: "1px solid #ababc1",
              color: "white",
              mt: 2,
            }}
          >
            See More
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginAdminPanel;
