import React, { useEffect, useState } from "react";
import MyTextField from "../../page/components/MyTextField";
import {
  Box,
  Typography,
  Snackbar,
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import MyButton from "../../page/components/MyButton";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PushBack from "../../components/PushBack/PushBack";

const AddContent = () => {
  const navigate = useNavigate();
  const [contestName, setContestName] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false); // Corrected state variable name
  const dispatch = useDispatch();
  const cont_name = useSelector(
    (state) => state.stepper.contest_name.contestName
  );
  const r_value = useSelector((state) => state.stepper.contest_name.status);
  const [value, setValue] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleContestNameChange = (event) => {
    setContestName(event.target.value);
    setError("");
  };
  useEffect(() => {
    if (cont_name) {
      setContestName(cont_name);
    }
    if (r_value) {
      setValue(r_value);
    }
  }, []);
  const handleSubmit = async () => {
    setLoading(true);
    if (!contestName || !contestName.trim()) {
      setError("Contest Name is required");
      setSnackbarMessage("Please enter the contest name.");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }
    const values = {
      contestName: contestName,
      status: value,
    };
    dispatch({
      type: "CONT_NAME",
      payload: values,
    });

    // Simulating async operation with a timeout
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace with your actual async operation

    // Example navigation
    navigate("/admin/add-registration", { state: { values } });

    setLoading(false); // This should be outside of the if block as well
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        padding: "1rem 10%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          width: "400px",
          margin: "0 auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PushBack />
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Add Contest
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "#949494",
            fontSize: "16px",
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
          consectetur lorem ipsum dolor sit amet.
        </Typography>
        <Box>
          <MyTextField
            label="Contest Name"
            placeholder="Please Write Your Contest Name"
            value={contestName}
            onChange={handleContestNameChange}
            error={!!error}
            helperText={error}
          />
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Show only total score"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Show total score and score by role"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <MyButton
          onClick={handleSubmit}
          text={
            loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Next"
            )
          }
          disabled={loading} // Disable button when loading
        />
      </Box>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default AddContent;
