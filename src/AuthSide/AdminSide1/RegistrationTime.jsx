import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import MyTextField from "../../page/components/MyTextField";
import MyButton from "../../page/components/MyButton";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const AddRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contestName } = location.state || {};
  const name = contestName;

  const expo_id = localStorage.getItem("expo_id");
  const token = localStorage.getItem("token");
  console.log(token, "token");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [maxContestant, setMaxContestant] = useState("");

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleMaxContestantChange = (event) => {
    setMaxContestant(event.target.value);
  };

  const handleNextClick = async () => {
    try {
      // Prepare payload data
      const payload = {
        expo_id: expo_id,
        name: name,
        start_date_time: startDate.format("YYYY-MM-DD HH:mm:ss"),
        end_date_time: endDate.format("YYYY-MM-DD HH:mm:ss"),
        max_contestent: maxContestant,
        description: "description",
      };

      const apiUrl =
        "https://expoproject.saeedantechpvt.com/api/admin/contests";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      localStorage.setItem("add_register_response", responseData.payload.id);
      localStorage.setItem("end_date_time", responseData.payload.end_date_time);
      console.log("API response:", responseData.payload.end_date_time);

      // Handle successful API call, e.g., navigate to the next step
      navigate("/admin/add-participant");
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., display error message to user
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "1rem 5%",
    }}
  >
    <Typography
      sx={{
        fontSize: "36px",
        fontWeight: 700,
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      Add Registration
    </Typography>
    <Typography
      sx={{
        color: "#949494",
        fontSize: "16px",
        fontWeight: 300,
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet <br />
      consectetur lorem ipsum dolor sit amet.
    </Typography>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} justifyContent="center" maxWidth={{xs:'100%', md:'30%'}}>
        <Grid item xs={6} md={6}>
          <DatePicker
            label="Start Contest Time"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <MyTextField {...params} />}
            
            sx={{ marginBottom: "16px" }}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <DatePicker
            label="End Contest Time"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <MyTextField {...params} />}
           
            sx={{ marginBottom: "16px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            label="Max Contestant"
            type='number'
            placeholder="e.g 100"
            value={maxContestant}
            onChange={handleMaxContestantChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <MyButton
            onClick={handleNextClick}
            text="Next"
            fullWidth
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  </Box>
  );
};

export default AddRegistration;
