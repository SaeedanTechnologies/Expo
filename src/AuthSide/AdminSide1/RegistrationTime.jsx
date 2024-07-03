import React, { useState } from "react";
import { Box, Typography, Grid, FormControl, FormHelperText, CircularProgress } from "@mui/material";
import MyTextField from "../../page/components/MyTextField";
import MyButton from "../../page/components/MyButton";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const AddRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contestName } = location.state || {};
  const name = contestName;

  const expo_id = localStorage.getItem("expo_id");
  const token = localStorage.getItem("token");

  const [startDate, setStartDate] = useState(dayjs().startOf("day"));
  const [startTime, setStartTime] = useState(dayjs().startOf("hour").add(1, "hour"));
  const [endDate, setEndDate] = useState(dayjs().startOf("day").add(1, "day"));
  const [endTime, setEndTime] = useState(dayjs().startOf("hour").add(2, "hour"));
  const [maxContestant, setMaxContestant] = useState("");
  const [timeError, setTimeError] = useState(false);
  const [dateTimeError, setDateTimeError] = useState(false);
  const [loading, isLoading] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);

    // Set end date to start from the selected start date
    setEndDate(dayjs(date).add(1, "day"));

    // Adjust end time if end date is the same as start date
    if (dayjs(endDate).isSame(date, "day")) {
      setEndTime((prevEndTime) => {
        return prevEndTime.isBefore(startTime) ? startTime : prevEndTime;
      });
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);

    // Set end time to start from the selected end date
    setEndTime(dayjs(date));

    // Check for datetime error based on new end date
    if (date.isBefore(startDate) || date.isAfter(dayjs())) {
      setDateTimeError(true);
    } else {
      setDateTimeError(false);
    }
  };



  const handleStartTimeChange = (time) => {
    setStartTime(time);

    // Adjust minTime for end time picker if start and end date are the same
    if (endDate.isSame(startDate, "day")) {
      setEndTime((prevEndTime) => {
        if (prevEndTime.isBefore(time)) {
          return time.add(1, "hour"); // Ensure end time is at least 1 hour ahead of start time
        }
        return prevEndTime;
      });
    }
  };





  const handleEndTimeChange = (time) => {
    setEndTime(time);

    // Ensure end time is at least 5 minutes after start time
    const minEndTime = dayjs(startTime).add(5, 'minute');
    if (time.isBefore(minEndTime)) {
      setEndTime(minEndTime);
    }

    // Validate against start time if end date is the same as start date
    if (endDate.isSame(startDate, 'day')) {
      if (time.isBefore(startTime)) {
        setTimeError(true);
      } else {
        setTimeError(false);
      }
    }
  };


  const handleMaxContestantChange = (event) => {
    setMaxContestant(event.target.value);
  };

  const handleNextClick = async () => {
    try {
      isLoading(true);
      const payload = {
        expo_id: expo_id,
        name: name,
        start_date_time: dayjs(startDate).add(startTime.hour(), "hour").add(startTime.minute(), "minute").format("YYYY-MM-DD HH:mm:ss"),
        end_date_time: dayjs(endDate).add(endTime.hour(), "hour").add(endTime.minute(), "minute").format("YYYY-MM-DD HH:mm:ss"),
        max_contestent: maxContestant,
        description: "description",
      };

      const apiUrl = "https://expoproject.saeedantechpvt.com/api/admin/contests";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate('/admin/add-participant');
      } else {
        isLoading(false);
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      localStorage.setItem("add_register_response", responseData.payload.id);
      localStorage.setItem("end_date_time", responseData.payload.end_date_time);
      console.log("API response:", responseData.payload.end_date_time);
    } catch (error) {
      console.error("Error:", error);
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
        <Grid
          container
          spacing={2}
          justifyContent="center"
          maxWidth={{ xs: "100%", md: "30%" }}
        >
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Start Contest Date"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <MyTextField {...params} />}
              minDate={dayjs().startOf("day")}
              sx={{ marginBottom: "16px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TimePicker
              label="Start Contest Time"
              value={startTime}
              onChange={handleStartTimeChange}
              renderInput={(params) => <MyTextField {...params} />}
              minTime={dayjs().isSame(startDate, "day") ? dayjs() : dayjs().startOf("day")}
              sx={{ marginBottom: "16px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="End Contest Date"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <MyTextField {...params} />}
              minDate={startDate}
              sx={{ marginBottom: "16px" }}
            />
            {dateTimeError && (
              <FormHelperText error>
                End date cannot exceed the current date and time.
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
          <TimePicker
          label="End Contest Time"
          value={endTime}
          onChange={handleEndTimeChange}
          renderInput={(params) => <MyTextField {...params} />}
          minTime={dayjs().isSame(endDate, 'day') ? dayjs().add(10, 'minute') : dayjs().startOf('day')}
          // Optionally, set maxTime if needed
          // maxTime={dayjs().add(1, 'week')}
          error={timeError}
          helperText={timeError ? "End time cannot be before or the same as start time, or exceed the current time" : ""}
          sx={{ marginBottom: "16px" }}
        />


          </Grid>
          <Grid item xs={12}>
            <MyTextField
              label="Max Contestant"
              type="number"
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
              text={loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Next"}
              disabled={loading}
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
