import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useMediaQuery,
  Divider,
  CircularProgress,
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router";
import {
  getStartContest,
  setNextParticipant,
  setApprovidParticipant,
  getBehindScreen,
  setPublicApproved,
} from "../../store/actions/contestStartActions";
import { useDispatch } from "react-redux";
import UploadVideoDialogBox from "./UploadVideo";
import { Dialog } from "@mui/material";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import usePusher from "../../hooks/usePusher";
import useFetchContestData from "../../hooks/useFetchContestData";
import { LocalLaundryService } from "@mui/icons-material";
const AdminOperator = () => {
  const { id } = useParams();
  const contest_id = id;
  const [loadingbtn, setLoadingbtn] = useState(false);
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [judges, setJudges] = useState([]);
  const [score, setScore] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [allScoresGiven, setAllScoresGiven] = useState(false);
  const dispatch = useDispatch();
  const [allJudges, setAllJudges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [fieldScores, setFieldScores] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [publicButtonClicked, setPublicButtonClicked] = useState(false);
  usePusher(contest_id, participants, setParticipants, setScore);
  useFetchContestData(
    id,
    setJudges,
    setScore,
    setParticipants,
    setAllJudges,
    setLoading,
    setAllScoresGiven,
    setFieldScores
  );
  const handleFile = () => {
    navigate(`/upload-file/${contest_id}`);
  };

  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
  };
  const [selectedJudgeScores, setSelectedJudgeScores] = useState([]);

  const handleOpenModal = (judge) => {
    setSelectedJudge(judge);
    const judgeScores = score.filter((score) => score.judge_id === judge.id);
    setSelectedJudgeScores(judgeScores);
    setOpenModal(true);
  };

  const handleNext = () => {
    navigate(`/admin-contest-start/${contest_id}`);
  };
  const judges_current = score.filter(
    (score) => score?.participant_id === participants[0]?.id
  );
  useEffect(() => {
    if (judges_current.length === judges.length) {
      setAllScoresGiven(true);
    }
  }, [judges, judges_current]);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedJudge(null);
    setSelectedJudgeScores([]);
  };

  const StyledAvatar = styled(Avatar)(({ theme, isCurrent, judgeId }) => ({
    width: 60,
    height: 60,
    border: `4px solid ${
      score.some(
        (score) =>
          score.judge_id === judgeId &&
          score.participant_id === participants[0]?.id
      )
        ? "green"
        : "red"
    }`,
    margin: theme.spacing(1),
    cursor: "pointer",
  }));

  const [clickedParticipantId, setClickedParticipantId] = useState(null);

  useEffect(() => {
    // Check if the clicked participant is still in the array
    const participantExists = participants.some(
      (participant) => participant.id === clickedParticipantId
    );
    if (!participantExists) {
      setClickedParticipantId(null); // Reset if participant is not found
    }
  }, [participants]);
  const [loadingJ, setLoadingJ] = useState(false);
  const handleClick = async (id, contestId) => {
    setLoadingJ(true);
    try {
      const res = await dispatch(setNextParticipant(contestId, id));

      setClickedParticipantId(id);
      setLoadingJ(false);
    } catch (error) {
      console.error("Failed to send request:", error);
      setLoadingJ(false);
    }
  };
  const [loadingPublish, setLoadingPublish] = useState(false);
  const [loadingPublic, setLoadingPublic] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const handleApproved = async (id, contest_id) => {
    // yahan lagana ha
    setLoadingPublish(true);
    try {
      const res = await dispatch(setApprovidParticipant(contest_id, id));
      const res2 = await dispatch(getStartContest(contest_id));
      setAllScoresGiven(false);
      const filteredParticipants = res2.data.data.participants.filter(
        (participant) => participant.is_judged === 0
      );
      setParticipants(
        filteredParticipants.map((participant) => {
          const fieldsValuesString = participant.fields_values.slice(1, -1);
          const fieldsValues = JSON.parse(
            fieldsValuesString.replace(/\\/g, "")
          );
          return { ...participant, ...fieldsValues };
        })
      );
      setClickedParticipantId(id);
      setLoadingPublish(false);
      setNextButtonDisabled(false);
      setPublicButtonClicked(false);
    } catch (error) {
      console.error("Failed to send request:", error);
      setLoadingPublish(false);
    }
  };

  const handlePublic = async (id, contest_id) => {
    setLoadingPublic(true);
    try {
      const res = await dispatch(setPublicApproved(id, contest_id));
      setLoadingPublic(false);
      setPublicButtonClicked(true);

      setNextButtonDisabled(true);
    } catch (error) {
      setLoadingPublic(false);
      setPublicButtonClicked(true);
      console.error("Failed to send request:", error);
    }
  };

  const handleAllRecords = () => {
    navigate("/all-records", { state: { id: id } });
  };

  useEffect(() => {
    setParticipants(participants);
  }, [participants]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        padding: isSmall ? "1rem 5%" : "1rem 30%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Admin
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
          consectetur lorem ipsum dolor sit amet.
        </Typography>

        <TableContainer sx={{ marginY: 1, width: "100%" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
              <TableRow sx={{ display: "flex" }}>
                <TableCell sx={{ flex: 3 }}>Participant Name</TableCell>
                <TableCell sx={{ flex: 1 }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {participants.length === 0 ? (
                <TableRow sx={{ display: "flex" }}>
                  <TableCell sx={{ flex: 4, textAlign: "center" }}>
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      No participants remaining
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow sx={{ display: "flex" }}>
                  <TableCell sx={{ flex: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={participants[0]?.image}
                        alt={participants[0]?.name}
                        sx={{ marginRight: 2, height: "30px", width: "30px" }}
                      />
                      <Typography sx={{ fontSize: "0.9rem" }}>
                        {participants[0]?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        color: "green",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                      }}
                    >
                      Now in Progress
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ width: "100%", fontWeight: 600, textAlign: "left" }}
        >
          Judges
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            overflow: "auto",
          }}
        >
          {judges?.map((judge, index) => (
            <Box
              key={index}
              sx={{ textAlign: "center" }}
              onClick={() => handleOpenModal(judge)}
            >
              <StyledAvatar
                src={judge?.profile_picture}
                alt={judge?.name}
                isCurrent={judge?.isCurrent}
                judgeId={judge?.id}
              />

              <Typography sx={{ fontWeight: 600 }}>{judge?.name}</Typography>
              {score
                .filter(
                  (score) =>
                    score?.judge_id === judge?.id &&
                    score?.participant_id === participants[0]?.id
                )
                .map((score, ind) => (
                  <Typography
                    key={ind}
                    sx={{ color: "green", fontSize: "0.8rem" }}
                  >
                    Score{" "}
                    {score?.total_score ? score?.total_score : ""}
                  </Typography>
                ))}
            </Box>
          ))}
        </Box>
        <br />
        <Divider />
        {participants.length === 0 ? (
          <>
            <Box sx={{ width: "100%" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAllRecords}
                sx={{ width: "100%", textTransform: "none" }}
              >
                All Records
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 1,
                justifyContent: "space-between",
                padding: 2,
                borderRadius: "8px",
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Avatar
                  src={participants[0]?.image}
                  alt={participants[0]?.name}
                  sx={{ marginRight: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    {participants[0]?.name}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleClick(participants[0]?.id, participants[0]?.contest_id)
                }
                disabled={participants[0]?.id === clickedParticipantId}
                sx={{ textTransform: "none" }}
              >
                {loadingJ ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  <>Now Judge {participants[0]?.name}</>
                )}
              </Button>
            </Box>

            {allScoresGiven ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                  gap={5}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={nextButtonDisabled}
                    onClick={() =>
                      handlePublic(
                        participants[0]?.id,
                        participants[0]?.contest_id
                      )
                    }
                    sx={{ textTransform: "none", width: "100%" }}
                  >
                    {loadingPublic ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Show Publicly"
                    )}
                  </Button>

                  {publicButtonClicked && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleApproved(
                          participants[0]?.id,
                          participants[0]?.contest_id
                        )
                      }
                      sx={{ textTransform: "none", width: "100%" }}
                    >
                      {loadingPublish ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "Next Contestant"
                      )}
                    </Button>
                  )}
                </Box>
              </>
            ) : null}
          </>
        )}
        <br />
        <Box sx={{ marginTop: "12px" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleOpenUploadDialog}
          >
            Upload File
          </Button>
        </Box>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {selectedJudge && (
            <>
              <Typography sx={{ mt: 2 }}>
                <strong>Scores:</strong>
              </Typography>
              {selectedJudgeScores.length === 0 ? (
                <Typography sx={{ mt: 2 }}>No scores available.</Typography>
              ) : (
                <>
                  {/* --------------modal ka data ---------- */}

                  <div>
                    {selectedJudgeScores.map((score, index) => {
                      // Parse the participant name
                      const participantName = (() => {
                        try {
                          const outerParsed = JSON.parse(
                            score.participant.fields_values
                          );
                          const innerParsed = JSON.parse(outerParsed);
                          return innerParsed.name || "Unknown";
                        } catch (e) {
                          console.error("Failed to parse fields_values:", e);
                          return "Unknown";
                        }
                      })();

                      // Get the scores for the current participant
                      const participantFieldScores = fieldScores?.filter(
                        (val) =>
                          val.participant_id === score?.participant_id &&
                          val.judge_id === score?.judge.id
                      );

                      return (
                        <React.Fragment key={index}>
                          <Typography sx={{ mt: 1, fontWeight: "700" }}>
                            Participant Name : {participantName}
                          </Typography>

                          <Box>
                            {participantFieldScores?.map(
                              (fieldScore, scoreIndex) => (
                                <Box key={scoreIndex}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "0.2rem",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {fieldScore?.field_name}
                                    </Typography>
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        fontSize: "0.9rem",
                                        color: "red",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {fieldScore?.total_score}
                                    </Typography>
                                  </Box>
                                </Box>
                              )
                            )}
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <Typography>Total</Typography>
                            <Typography>
                              {score.total_score
                                ? score.total_score
                                : "No Score"}
                            </Typography>
                          </Box>

                          {index < selectedJudgeScores.length - 1 && (
                            <Divider sx={{ my: 2 }} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* -----------------------modal ka data end---------- */}
                </>
              )}
            </>
          )}
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={uploadDialogOpen}
        onClose={handleCloseUploadDialog}
        maxWidth="md"
        fullWidth
      >
        <UploadVideoDialogBox
          contest_id={contest_id}
          onClose={handleCloseUploadDialog}
        />
      </Dialog>
    </Box>
  );
};

export default AdminOperator;
