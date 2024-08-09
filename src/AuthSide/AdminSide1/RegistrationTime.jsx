import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import MyTextField from "../../page/components/MyTextField";
import MyButton from "../../page/components/MyButton";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import PushBack from "../../components/PushBack/PushBack";

const AddRegistration = () => {
  // debugger;
  const navigate = useNavigate();
  const { state } = useLocation();
  const name = state?.values?.contestName;
  const status = state?.values?.status;
  const dispatch = useDispatch();
  const expo_id = localStorage.getItem("expo_id");
  const token = localStorage.getItem("token");
  const [startDate, setStartDate] = useState(dayjs().startOf("day"));
  const [startTime, setStartTime] = useState(
    dayjs().startOf("hour").add(1, "hour")
  );
  const [endDate, setEndDate] = useState(dayjs().startOf("day").add(1, "day"));
  const [endTime, setEndTime] = useState(
    dayjs().startOf("hour").add(2, "hour")
  );
  const [maxContestant, setMaxContestant] = useState("");
  const [timeError, setTimeError] = useState(false);
  const [dateTimeError, setDateTimeError] = useState(false);
  const [loading, isLoading] = useState(false);
  const start_date = useSelector((state) => state.stepper.start_date);
  const end_date = useSelector((state) => state.stepper.end_date);
  const start_time = useSelector((state) => state.stepper.start_time);
  const end_time = useSelector((state) => state.stepper.end_time);
  const max_cont = useSelector((state) => state.stepper.max_contestants);
  const cont_id = useSelector((state) => state.stepper.cont_id);
  useEffect(() => {
    if (start_date) {
      setStartDate(dayjs(start_date));
    }
    if (end_date) {
      setEndDate(dayjs(end_date));
    }
    if (start_time) {
      setStartTime(dayjs(start_time));
    }
    if (end_time) {
      setEndTime(dayjs(end_time));
    }
    if (max_cont) {
      setMaxContestant(max_cont);
    }
  }, []);
  const handleStartDateChange = (date) => {
    setStartDate(date);

    setEndDate(dayjs(date).add(1, "day"));

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
    const minEndTime = dayjs(startTime).add(5, "minute");
    if (time.isBefore(minEndTime)) {
      setEndTime(minEndTime);
    }

    // Validate against start time if end date is the same as start date
    if (endDate.isSame(startDate, "day")) {
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
    const redux_data = {
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
    };
    dispatch({
      type: "REG_TIME",
      payload: redux_data,
    });
    try {
      isLoading(true);
      const payload = {
        expo_id: expo_id,
        id: cont_id ? cont_id : "",
        name: name,
        total_score_status: status,
        start_date_time: dayjs(startDate)
          .add(startTime.hour(), "hour")
          .add(startTime.minute(), "minute")
          .format("YYYY-MM-DD HH:mm:ss"),
        end_date_time: dayjs(endDate)
          .add(endTime.hour(), "hour")
          .add(endTime.minute(), "minute")
          .format("YYYY-MM-DD HH:mm:ss"),
        max_contestent: maxContestant,
        description: "description",
      };
      const redux_data = {
        max_contestants: payload.max_contestent,
      };
      dispatch({
        type: "MAX_CONT",
        payload: redux_data,
      });
      const apiUrl = "https://deeplink.saeedantechpvt.com/api/admin/contests";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const res = await response.json();
      console.log(res.payload?.id, "++++++++++++++");
      dispatch({
        type: "CONT_ID",
        payload: res.payload?.id,
      });
      if (response.ok) {
        navigate("/admin/add-participant");
      } else {
        isLoading(false);
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      localStorage.setItem("add_register_response", responseData.payload.id);
      localStorage.setItem("end_date_time", responseData.payload.end_date_time);
      console.log("API response:", responseData.payload.end_date_time);
    } catch (error) {
      isLoading(false);
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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <PushBack />
        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: 700,
            textAlign: "center",
            // marginBottom: "20px",
          }}
        >
          Add Registration
        </Typography>
      </Box>
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
              minTime={
                dayjs().isSame(startDate, "day")
                  ? dayjs()
                  : dayjs().startOf("day")
              }
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
              minTime={
                dayjs().isSame(endDate, "day")
                  ? dayjs().add(10, "minute")
                  : dayjs().startOf("day")
              }
              // Optionally, set maxTime if needed
              // maxTime={dayjs().add(1, 'week')}
              error={timeError}
              helperText={
                timeError
                  ? "End time cannot be before or the same as start time, or exceed the current time"
                  : ""
              }
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
              text={
                loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Next"
                )
              }
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
