import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormJudegFormTesting,
  submitJudegFormData,
} from "../../store/actions/addJudegsActions";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";
import { FaEye } from "react-icons/fa";

const TestingApi = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState([]);
  const [participantName, setParticipantName] = useState("");
  const [showParticipantId, setShowParticipantId] = useState("");
  const [formData, setFormData] = useState({});
  const [judgeId, setJudgeId] = useState(null);
  const [participantId, setParticipantId] = useState(null);
  const [contestId, setContestId] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const judge_idd = useSelector((state) => state?.admin?.user?.id);
  const [fetchError, setFetchError] = useState(null);
  const [scoreCard, setScoreCard] = useState(null);
  const [participantDataVisible, setParticipantDataVisible] = useState(false);
  const [participantData, setParticipantData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  // console.log(contestId, "YEEEEEEEEEE");
  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await dispatch(fetchFormJudegFormTesting(id));
        if (response.data && response.data.original) {
          const { scoreCard, participantData } = response.data.original;
          const fields = JSON.parse(scoreCard.fields);
          const mappedFields = fields.map((item) => ({
            id: item.name,
            label: item.label,
            name: item.name,
            type: item.type,
            required: item.required,
          }));

          setScoreCard(scoreCard);
          setParticipantName(scoreCard.current_participant_name);
          setShowParticipantId(scoreCard.current_participant_id);
          setFormFields(mappedFields);
          setJudgeId(scoreCard.judge_id);
          setParticipantId(scoreCard.current_participant_id);
          setContestId(scoreCard.contest_id);
          localStorage.setItem("judge_response", JSON.stringify(scoreCard));
          setParticipantData(participantData); // Set participant data from API response
        } else {
          console.log("Unexpected response structure:", response.data.message);
        }
      } catch (error) {
        setFetchError(error?.response?.data?.message);
      }
    };
    const toggleParticipantData = () => {
      setParticipantDataVisible((prev) => !prev);
    };
    fetchFormFields();
  }, [dispatch, id]);
  useEffect(() => {
    // Pusher.logToConsole = true;
    const pusher = new Pusher("022c57db694789c9f227", {
      cluster: "ap2",
    });
    const channel1 = pusher.subscribe(`scorecard-updates${id}`);
    channel1.bind("App\\Events\\ScoreCardUpdated", function (data) {
      setParticipantName(data?.scorecard?.current_participant_name);
      setShowParticipantId(data?.scorecard?.current_participant_id);
      setParticipantId(data?.scorecard?.current_participant_id);
      const mappedFields = data?.scorecard?.fields.map((item) => ({
        id: item.name,
        label: item.label,
        name: item.name,
        type: item.type,
        required: item.required,
      }));
      setFormFields(mappedFields);
      setParticipantData(data?.scorecard?.participant_data);
      // console.log(data?.scorecard, "PUSHER DATA+++++++++++++++++++");
    });

    return () => {
      pusher.unsubscribe(`scorecard-updates${id}`);
    };
  }, []);
  useEffect(() => {
    if (participantId === null) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [participantId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      enqueueSnackbar("Please enter a number between 0 and 10 for the score.", {
        variant: "error",
      });
    }
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    setSubmitDisabled(true);

    const scoresArray = formFields.map((field) => ({
      field_name: field.name,
      score: formData[field.name] || "",
    }));

    const dataToSubmit = {
      scores: scoresArray,
      judge_id: judge_idd,
      participant_id: participantId,
      contest_id: id,
    };

    dispatch(submitJudegFormData(dataToSubmit))
      .then((response) => {
        setLoading(false); // Stop loading
        setSubmitDisabled(false);
        setFormData({});
        enqueueSnackbar("Score Assigned ", { variant: "success" });
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        if (error.response && error.response.data) {
          enqueueSnackbar(error.response.data.error, { variant: "error" });
        } else {
          console.error("Unexpected error:", error);
        }
      });
  };

  const toggleParticipantData = () => {
    setParticipantDataVisible((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "1rem 8%",
      }}
    >
      {fetchError ? (
        <Typography
          variant="h5"
          sx={{
            color: "red",
            fontWeight: 800,
            fontSize: "2rem",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          {fetchError}
        </Typography>
      ) : (
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "12px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "black",
                fontFamily: "Roboto",
                fontSize: { xs: "22px", md: "46px" },
                fontWeight: 800,
                lineHeight: "36px",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {participantName ? participantName : "Participant Name"}
              <FaEye
                onClick={handleDialogOpen}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: "black",
                fontFamily: "Roboto",
                fontSize: { xs: "10px", md: "24px" },
                fontWeight: 800,
                lineHeight: "26px",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {showParticipantId ? showParticipantId : "Participant ID"}
            </Typography>

            <Dialog
              open={dialogOpen}
              onClose={handleDialogClose}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>Participant Data</DialogTitle>
              <DialogContent dividers>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "500px",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {/* {Object.keys(participantData).map((key) => {
                    return (
                      <Typography
                        key={key}
                        variant="h4"
                        sx={{
                          color: "black",
                          fontFamily: "Roboto",
                          fontSize: { xs: "14px", md: "24px" },
                          fontWeight: 800,
                          lineHeight: "26px",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {key}: {participantData[key]}
                      </Typography>
                    );
                  })} */}
                  {/* {console.log(participantData, "JJJJJJJJJJJ")} */}
                  {Object.keys(participantData).map((key) => {
                    const value = participantData[key];
                    return (
                      <div key={key}>
                        {key}:
                        {typeof value === "string" &&
                        value.startsWith("data:image") ? (
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <img
                              src={value}
                              alt={key}
                              style={{
                                width: "25%",
                                height: "25%",
                                display: "block",
                                marginBottom: "0.5rem",
                              }}
                            />
                          </Box>
                        ) : (
                          <Typography
                            variant="h4"
                            sx={{
                              color: "black",
                              fontFamily: "Roboto",
                              fontSize: { xs: "14px", md: "24px" },
                              fontWeight: 800,
                              lineHeight: "26px",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {value}
                          </Typography>
                        )}
                      </div>
                    );
                  })}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <Box sx={{ width: "100%", maxWidth: "500px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  lineHeight: "28px",
                  letterSpacing: "0.25px",
                  textAlign: "left",
                  color: "#000000",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Give Score
              </Typography>
              <form onSubmit={handleSubmit}>
                {/* {console.log(formFields, "YE FORM FIELDS")} */}
                {formFields?.map((field) => (
                  <Box key={field.id}>
                    <InputLabel
                      htmlFor={field.name}
                      sx={{
                        marginBottom: "0.5rem",
                        fontFamily: "Roboto",
                        fontSize: "1.1rem",
                        fontWeight: 1000,
                        lineHeight: "13px",
                        letterSpacing: "0.25px",
                        textAlign: "left",
                        color: "#000000",
                      }}
                    >
                      {field.label}
                    </InputLabel>
                    <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                      <TextField
                        id={field.name}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required={field.required}
                        InputProps={{ style: { height: "60px" } }}
                        sx={{ height: "60px" }}
                      />
                    </FormControl>
                  </Box>
                ))}
                <Button
                  disabled={submitDisabled || loading} // Disable when loading
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    marginTop: "1rem",
                    marginBottom: "12px",
                    padding: "12px",
                    fontFamily: "Roboto",
                    position: "relative",
                  }}
                >
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}{" "}
                  {/* Loader */}
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default TestingApi;
