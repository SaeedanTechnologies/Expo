// import React, { useState } from "react";
// import { Box, Typography, Grid } from "@mui/material";
// import MyTextField from "../../page/components/MyTextField";
// import MyButton from "../../page/components/MyButton";
// import { useNavigate, useLocation } from "react-router-dom";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { width } from "@fortawesome/free-solid-svg-icons/fa0";

// const AddRegistration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { contestName } = location.state || {};
//   const name = contestName;

//   const expo_id = localStorage.getItem("expo_id");
//   const token = localStorage.getItem("token");
//   console.log(token, "token");
//   const [startDate, setStartDate] = useState(dayjs());
//   const [endDate, setEndDate] = useState(dayjs());
//   const [maxContestant, setMaxContestant] = useState("");

//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//   };

//   const handleEndDateChange = (date) => {
//     setEndDate(date);
//   };

//   const handleMaxContestantChange = (event) => {
//     setMaxContestant(event.target.value);
//   };

//   const handleNextClick = async () => {
//     try {
//       // Prepare payload data
//       const payload = {
//         expo_id: expo_id,
//         name: name,
//         start_date_time: startDate.format("YYYY-MM-DD HH:mm:ss"),
//         end_date_time: endDate.format("YYYY-MM-DD HH:mm:ss"),
//         max_contestent: maxContestant,
//         description: "description",
//       };

//       const apiUrl =
//         "https://expoproject.saeedantechpvt.com/api/admin/contests";

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const responseData = await response.json();
//       localStorage.setItem("add_register_response", responseData.payload.id);
//       localStorage.setItem("end_date_time", responseData.payload.end_date_time);
//       console.log("API response:", responseData.payload.end_date_time);

//       // Handle successful API call, e.g., navigate to the next step
//       navigate("/admin/add-participant");
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error, e.g., display error message to user
//     }
//   };

//   return (
//     <Box
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       height: "100vh",
//       padding: "1rem 5%",
//     }}
//   >
//     <Typography
//       sx={{
//         fontSize: "36px",
//         fontWeight: 700,
//         textAlign: "center",
//         marginBottom: "20px",
//       }}
//     >
//       Add Registration
//     </Typography>
//     <Typography
//       sx={{
//         color: "#949494",
//         fontSize: "16px",
//         fontWeight: 300,
//         textAlign: "center",
//         marginBottom: "20px",
//       }}
//     >
//       Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet <br />
//       consectetur lorem ipsum dolor sit amet.
//     </Typography>

//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Grid container spacing={2} justifyContent="center" maxWidth={{xs:'100%', md:'30%'}}>
//         <Grid item xs={6} md={6}>
//           <DatePicker
//             label="Start Contest Time"
//             value={startDate}
//             onChange={handleStartDateChange}
//             renderInput={(params) => <MyTextField {...params} />}

//             sx={{ marginBottom: "16px" }}
//           />
//         </Grid>
//         <Grid item xs={6} md={6}>
//           <DatePicker
//             label="End Contest Time"
//             value={endDate}
//             onChange={handleEndDateChange}
//             renderInput={(params) => <MyTextField {...params} />}

//             sx={{ marginBottom: "16px" }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <MyTextField
//             label="Max Contestant"
//             type='number'
//             placeholder="e.g 100"
//             value={maxContestant}
//             onChange={handleMaxContestantChange}
//             fullWidth
//             sx={{ marginBottom: "16px" }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <MyButton
//             onClick={handleNextClick}
//             text="Next"
//             fullWidth
//             sx={{ width: "100%" }}
//           />
//         </Grid>
//       </Grid>
//     </LocalizationProvider>
//   </Box>
//   );
// };

// export default AddRegistration;


// import React, { useState } from "react";
// import { Box, Typography, Grid } from "@mui/material";
// import MyTextField from "../../page/components/MyTextField";
// import MyButton from "../../page/components/MyButton";
// import { useNavigate, useLocation } from "react-router-dom";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker, TimePicker } from "@mui/x-date-pickers";
// import { FormControl, FormHelperText } from "@mui/material";

// const AddRegistration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { contestName } = location.state || {};
//   const name = contestName;

//   const expo_id = localStorage.getItem("expo_id");
//   const token = localStorage.getItem("token");

 
//   const [startDate, setStartDate] = useState(dayjs().startOf("day")); 
//   const [startTime, setStartTime] = useState(dayjs().startOf("hour").add(1, "hour")); 
//   const [endDate, setEndDate] = useState(dayjs().startOf("day").add(1, "day")); 
//   const [endTime, setEndTime] = useState(dayjs().startOf("hour").add(2, "hour")); 
//   const [maxContestant, setMaxContestant] = useState("");
//   const [timeError, setTimeError] = useState(false);

//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//     // Ensure end date is not before start date
//     if (endDate.isBefore(date)) {
//       setEndDate(date);
//     }
//     // If start and end dates are the same, adjust end time accordingly
//     if (dayjs(endDate).isSame(date, "day")) {
//       setEndTime((prevEndTime) => {
//         return prevEndTime.isBefore(startTime) ? startTime : prevEndTime;
//       });
//     }
//   };

//   const handleEndDateChange = (date) => {
//     // Ensure end date is not before start date
//     if (date.isBefore(startDate)) {
//       setEndDate(startDate);
//     } else {
//       setEndDate(date);
//     }
//     // If start and end dates are the same, adjust end time accordingly
//     if (dayjs(date).isSame(startDate, "day")) {
//       setEndTime((prevEndTime) => {
//         return prevEndTime.isBefore(startTime) ? startTime : prevEndTime;
//       });
//     }
//   };

//   const handleStartTimeChange = (time) => {
//     setStartTime(time);
//     // Validate if end time is before start time
//     if (endDate.isSame(startDate, "day") && endTime.isBefore(time)) {
//       setEndTime(time.add(1, "hour")); // Set end time to start time + 1 hour if it's before start time
//     }
//   };

//   const handleEndTimeChange = (time) => {
//     setEndTime(time);
//     // Validate if end time is before start time
//     if (endDate.isSame(startDate, "day") && time.isBefore(startTime)) {
//       setTimeError(true); // Show error if end time is before start time
//     } else {
//       setTimeError(false);
//     }
//   };

//   const handleMaxContestantChange = (event) => {
//     setMaxContestant(event.target.value);
//   };

//   const handleNextClick = async () => {
//     try {
//       // Prepare payload data
//       const payload = {
//         expo_id: expo_id,
//         name: name,
//         start_date_time: dayjs(startDate).add(startTime.hour(), "hour").add(startTime.minute(), "minute").format("YYYY-MM-DD HH:mm:ss"),
//         end_date_time: dayjs(endDate).add(endTime.hour(), "hour").add(endTime.minute(), "minute").format("YYYY-MM-DD HH:mm:ss"),
//         max_contestent: maxContestant,
//         description: "description",
//       };

//       const apiUrl =
//         "https://expoproject.saeedantechpvt.com/api/admin/contests";

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const responseData = await response.json();
//       localStorage.setItem("add_register_response", responseData.payload.id);
//       localStorage.setItem("end_date_time", responseData.payload.end_date_time);
//       console.log("API response:", responseData.payload.end_date_time);

//       // Handle successful API call, e.g., navigate to the next step
//       // navigate("/admin/add-participant");
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error, e.g., display error message to user
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         padding: "1rem 5%",
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: "36px",
//           fontWeight: 700,
//           textAlign: "center",
//           marginBottom: "20px",
//         }}
//       >
//         Add Registration
//       </Typography>
//       <Typography
//         sx={{
//           color: "#949494",
//           fontSize: "16px",
//           fontWeight: 300,
//           textAlign: "center",
//           marginBottom: "20px",
//         }}
//       >
//         Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet <br />
//         consectetur lorem ipsum dolor sit amet.
//       </Typography>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Grid
//           container
//           spacing={2}
//           justifyContent="center"
//           maxWidth={{ xs: "100%", md: "30%" }}
//         >
//           <Grid item xs={12} md={6}>
//           <DatePicker
//           label="Start Contest Date"
//           value={startDate}
//           onChange={handleStartDateChange}
//           renderInput={(params) => <MyTextField {...params} />}
//           minDate={dayjs().startOf("day")} 
//           sx={{ marginBottom: "16px" }}
//         />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TimePicker
//               label="Start Contest Time"
//               value={startTime}
//               onChange={handleStartTimeChange}
//               renderInput={(params) => <MyTextField {...params} />}
//               sx={{ marginBottom: "16px" }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <DatePicker
//               label="End Contest Date"
//               value={endDate}
//               onChange={handleEndDateChange}
//               renderInput={(params) => <MyTextField {...params} />}
//               minDate={startDate} // Disable past dates and ensure end date cannot be before start date
//               sx={{ marginBottom: "16px" }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TimePicker
//               label="End Contest Time"
//               value={endTime}
//               onChange={handleEndTimeChange}
//               renderInput={(params) => <MyTextField {...params} />}
//               error={timeError}
//               helperText={timeError ? "End time cannot be before start time" : ""}
//               sx={{ marginBottom: "16px" }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <MyTextField
//               label="Max Contestant"
//               type="number"
//               placeholder="e.g 100"
//               value={maxContestant}
//               onChange={handleMaxContestantChange}
//               fullWidth
//               sx={{ marginBottom: "16px" }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <MyButton
//               onClick={handleNextClick}
//               text="Next"
//               fullWidth
//               sx={{ width: "100%" }}
//             />
//           </Grid>
//         </Grid>
//       </LocalizationProvider>
//     </Box>
//   );
// };

// export default AddRegistration;


import React, { useState } from "react";
import { Box, Typography, Grid, FormControl, FormHelperText } from "@mui/material";
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

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate.isBefore(date)) {
      setEndDate(date);
    }
    if (dayjs(endDate).isSame(date, "day")) {
      setEndTime((prevEndTime) => {
        return prevEndTime.isBefore(startTime) ? startTime : prevEndTime;
      });
    }
  };

  const handleEndDateChange = (date) => {
    const now = dayjs();
    if (date.isBefore(startDate)) {
      setEndDate(startDate);
    } else if (date.isAfter(now)) {
      setEndDate(now);
      setEndTime(now);
      setDateTimeError(true);
    } else {
      setEndDate(date);
      setDateTimeError(false);
    }
    if (dayjs(date).isSame(startDate, "day")) {
      setEndTime((prevEndTime) => {
        return prevEndTime.isBefore(startTime) ? startTime : prevEndTime;
      });
    }
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    if (endDate.isSame(startDate, "day") && endTime.isBefore(time)) {
      setEndTime(time.add(1, "hour"));
    }
  };

  const handleEndTimeChange = (time) => {
    const now = dayjs();
    setEndTime(time);
    if (endDate.isSame(startDate, "day") && time.isBefore(startTime)) {
      setTimeError(true);
      if (time.hour() < startTime.hour() || (time.hour() === startTime.hour() && time.minute() < startTime.minute())) {
        // If end time is less than start time on the same day, adjust the start date
        setStartDate(startDate.subtract(1, 'day'));
      }
    } else if (endDate.isSame(dayjs(), "day") && time.isAfter(now)) {
      setTimeError(true);
    } else if (endDate.isSame(startDate, "day") && time.isSame(startTime)) {
      setTimeError(true);
    } else if (endDate.isSame(startDate, "day") && time.isBefore(startTime)) {
      setTimeError(true);
    } else {
      setTimeError(false);
    }
  };

  const handleMaxContestantChange = (event) => {
    setMaxContestant(event.target.value);
  };

  const handleNextClick = async () => {
    try {
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

      if (!response.ok) {
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



