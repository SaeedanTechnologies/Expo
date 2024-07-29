import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PushBack from "../../../components/PushBack/PushBack";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddJudgeMain = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [judges, setJudges] = useState([
    { judge_name: "", email: "", phone: "", profile_picture: null },
  ]);
  const savedJudges = useSelector((state) => state?.stepper?.judges);



  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // const savedJudges = JSON.parse(localStorage.getItem("judges"));
    if (savedJudges) {
      // const updatedJudges = savedJudges.map((judge) => {
      //   if (judge.profile_picture) {
      //     return {
      //       ...judge,
      //       profile_picture: judge.profile_picture,
      //     };
      //   }
      //   return judge;
      // });
      setJudges(savedJudges);
    }
  }, []);

  const handleNext = () => {
    dispatch({
      type: "JUDGES",
      payload: judges,
    });
    if (activeStep === judges.length - 1) {
      navigate("/create-score-card", { state: { judges } });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleAddNewJudge = () => {
    const newJudges = [
      ...judges,
      { judge_name: "", email: "", phone: "", profile_picture: "" },
    ];
    setJudges(newJudges);
    setActiveStep(newJudges.length - 1);
  };

  const handleChange = (index, field, value) => {
    const newJudges = [...judges];
    newJudges[index][field] = value;
    setJudges(newJudges);
  };

  const handlePhotoChange = async (index, event) => {
    const file = event.target.files[0];
    const base64 = await toBase64(file);
    handleChange(index, "profile_picture", base64);
  };

  const handleRemoveJudge = (index) => {
    const newJudges = judges.filter((_, i) => i !== index);
    setJudges(newJudges);
    setActiveStep((prevActiveStep) =>
      prevActiveStep > 0 ? prevActiveStep - 1 : 0
    );
  };

  const isNextButtonDisabled = () => {
    const currentJudge = judges[activeStep];
    return !currentJudge.judge_name || !currentJudge.email;
  };

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        padding: isSmall ? "2rem 8%" : "2rem 30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PushBack />
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Add Judges
          </Typography>
        </Box>
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
          consectetur lorem ipsum dolor sit amet.
        </Typography>
        <Box sx={{ overflowX: "auto", width: isSmall ? "80vw" : "40vw" }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ width: "100%" }}
          >
            {judges.map((_, index) => (
              <Step key={index} onClick={() => setActiveStep(index)}>
                <StepLabel>
                  {`Judge ${index + 1}`}
                  {judges.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveJudge(index);
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ mb: 3, p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                src={judges[activeStep]?.profile_picture || ""}
                sx={{ width: 76, height: 76, mr: 2 }}
              />
              <Box>
                <Button variant="outlined" component="label">
                  Upload Your Photo
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handlePhotoChange(activeStep, e)}
                  />
                </Button>
                <Typography
                  sx={{ fontSize: "0.8rem", color: "grey", width: "80%" }}
                >
                  Image format must be PNG/JPG and size less than 500 kb
                </Typography>
              </Box>
            </Box>
            <label style={{ fontWeight: 600 }}>Judge Name</label>
            <br />
            <br />
            <TextField
              label="Judge Name"
              variant="outlined"
              fullWidth
              value={judges[activeStep]?.judge_name || ""}
              onChange={(e) =>
                handleChange(activeStep, "judge_name", e.target.value)
              }
              sx={{ mb: 2 }}
            />
            <label style={{ fontWeight: 600 }}>Email</label>
            <br />
            <br />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={judges[activeStep]?.email || ""}
              onChange={(e) =>
                handleChange(activeStep, "email", e.target.value)
              }
              sx={{ mb: 2 }}
            />
            <br />
            <br />
            <Box gap={3} sx={{ display: "flex", alignItems: "center", mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleAddNewJudge}
                sx={{
                  mr: 2,
                  width: "100%",
                  fontSize: isSmall ? "0.7rem" : "0.9rem",
                  textTransform: "none",
                }}
              >
                + Add New Judge
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{
                  width: "100%",
                  fontSize: isSmall ? "0.7rem" : "0.9rem",
                  textTransform: "none",
                }}
                disabled={isNextButtonDisabled()}
              >
                {activeStep === judges.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddJudgeMain;
