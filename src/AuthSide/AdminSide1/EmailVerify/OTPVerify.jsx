// import React from 'react'

// const OTPVerify = () => {
//   return (
//     <div>OTPVerify</div>
//   )
// }

// export default OTPVerify



import {
    Avatar,
    Box,
    Button,
    Card,
    TextField,
    Typography,
    useTheme,
    CircularProgress,
  } from "@mui/material";
  import React from "react";
  import { useState } from "react";
  import { useRef } from "react";
  import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDeferredValue } from "react";
import { useDispatch } from "react-redux";
import { otpConfirmation } from "../../../store/actions/authActions";
import { useSnackbar } from "notistack";
  const OTPVerify = () => {

    const theme = useTheme()
    const [loading, setLoading] = useState(false);

const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const {enqueueSnackbar} = useSnackbar()

  const [otp, setOTP] = useState(['', '', '', '', '', '']);

  const handleChange = (index, event) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = event.target.value;
    setOTP(updatedOTP);
  };




  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredOTP = otp.join('');
    setLoading(true);


    dispatch(otpConfirmation( {otp: enteredOTP  }))
      .then((res) => {

          navigate("/admin-login");
          enqueueSnackbar("Email Verified", { variant: 'success' });
          setLoading(false);

        })
      .catch((err) => {
        console.error('API Error:', err.response.data.error); // Log the error to debug
        enqueueSnackbar(err.response.data.error, { variant: 'error' });

      setLoading(false);

      });


  };


  const handleKeyPress = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && !otp[index]) {

      document.getElementsByName(`otp${index}`)[0].focus();
    } else if (event.key >= '0' && event.key <= '9' && index < 5 && otp[index]) {

      document.getElementsByName(`otp${index + 2}`)[0].focus();
    }
  };

    return (
      <>
<Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', width:'100%', height:'100vh' }}>



<Typography sx={{textAlign:'center', marginTop:'1rem', fontSize:'2rem', fontWeight:'600'}}>Enter You OTP that you recevied on your Email</Typography>




<form onSubmit={handleSubmit}>
      <div className="otpContainer">
        {otp.map((value, index) => (
          <input
            key={index}
            name={`otp${index + 1}`}
            type="text"
            autoComplete="off"
            className="otpInput"
            value={value}
            onChange={(e) => handleChange(index, e)}
            maxLength="1"
            onKeyDown={(e) => handleKeyPress(index, e)}
            style={{ marginRight: '5px' }}
            required
          />
        ))}
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '5rem' }}>



        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 , padding:'9px'}}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Verify"}
          </Button>
      </Box>
    </form>

</Box>
      </>
    );
  };

  export default OTPVerify;
