

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
  Snackbar,
} from "@mui/material";
import Positions from "../../page/components/Positions";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useDispatch } from "react-redux";
import {
  getAllRecords,
  saveToPublicScreen,
  rematchApi,
  pdfApi
} from "../../store/actions/contestStartActions";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

const AllRecords = () => {
  const location = useLocation();
  const contestId = location.state?.id;
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tied, setTied] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [showScreenloading, setShowScreenLoading] = useState(false);
  const [rematchloading, setResmatchLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAllRecords(contestId));
        const { data, tied: isTied } = response.data;
        setRecords(data);
        setLoading(false);
        setTied(isTied);

        if (isTied) {
          const firstSixRecords = data.slice(0, 6);
          const totalScores = firstSixRecords.map(record => record.total_score);

          const scoreCount = totalScores.reduce((acc, score) => {
            acc[score] = (acc[score] || 0) + 1;
            return acc;
          }, {});


          // const maxScore = Object.keys(scoreCount)
          //   .filter(score => scoreCount[score] > 1)
          //   .map(score => parseFloat(score));

          
          const maxScore = Object.keys(scoreCount)
          .filter(score => scoreCount[score] > 1)
          .map(score => (score));


          const tiedParticipants = firstSixRecords
            .filter(record => maxScore.includes(record.total_score))
            .map(record => record.participant_id);
console.log(tiedParticipants, 'hhah')
          setSelectedParticipants(tiedParticipants);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, contestId]);

  const handleShowOnPublicScreen = async () => {

    try {

      setShowScreenLoading(true);
      const response = await dispatch(saveToPublicScreen(contestId));
      setSnackbarOpen(true);
      setSnackbarMessage(response.data.message);

      localStorage.setItem("public-screen", response.data.success);
    navigate(`/iframe/${contestId}`)

    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarMessage(
        error.response?.data?.message || "An error occurred"
      );
      console.error("Error saving to public screen:", error);
    } finally {
      setShowScreenLoading(false);
    }
  };

  const handleSelectParticipant = (participantId) => {
    setSelectedParticipants((prevSelected) =>
      prevSelected.includes(participantId)
        ? prevSelected.filter((id) => id !== participantId)
        : [...prevSelected, participantId]
    );
  };

  const handleSubmitRematch = async () => {
    try {
      setResmatchLoading(true);
      const response = await dispatch(
        rematchApi(contestId, selectedParticipants)
      );
      setSnackbarOpen(true);
      setSnackbarMessage(response.message);
      navigate(`/admin-contest-start/${contestId}`);
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarMessage(
        error.response?.data?.message || "An error occurred"
      );
      console.error("Error during rematch:", error);
    } finally {
      setResmatchLoading(false);
    }
  };

  const generateAndSendPDF = async () => {
    // Create PDF document
    const doc = new jsPDF();
    doc.text("Contest Records", 20, 10);

    // Prepare table data
    const tableData = records.map((record, index) => [
      record.position,
      parseFormFields(record.participant.fields_values),
      record?.total_score,
    ]);

    // Set up the table
    doc.autoTable({
      startY: 20,
      head: [["Position", "Participant Name", "Score"]],
      body: tableData,
    });

    // Convert the PDF to a Blob
    const pdfBlob = doc.output("blob");

    // Send the PDF to the backend API
    const formData = new FormData();
    formData.append("contestId", contestId);
    formData.append("file", pdfBlob, "contest_records.pdf");

    try {
      setResmatchLoading(true);
      const response = await dispatch(pdfApi(pdfBlob));
      setSnackbarOpen(true);
      setSnackbarMessage("PDF sent successfully");
    } catch (error) {
      console.error("Error sending PDF:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("Failed to send PDF");
    }finally{
      setResmatchLoading(false);
    }
  };


  const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
      };
  const parseFormFields = (fieldsValuesString) => {
    try {
      const fieldsValues = JSON.parse(JSON.parse(fieldsValuesString));
      return fieldsValues.name;
    } catch (error) {
      console.error("Error parsing fields_values:", error);
      return "Unknown";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  const hasTieInFirstSix = tied;


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box sx={{ padding: isSmall ? "2rem 10%" : "2rem 30%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          All Records
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
          consectetur lorem ipsum dolor sit amet.
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell>Participant Name</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow
                  key={record.participant_id}
                  sx={{
                    border:
                      index < 6 &&
                      selectedParticipants.includes(
                        record.participant_id
                      )
                        ? "2px solid red"
                        : "none",
                  }}
                  onClick={() =>
                    index < 6 &&
                    handleSelectParticipant(record.participant_id)
                  }
                >
                  <TableCell>
                    <Positions
                      number={record.position}
                      color={record.color}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={record.avatar}
                        alt={record.participant.name}
                        sx={{ marginRight: 2 }}
                      />
                      {parseFormFields(
                        record.participant.fields_values
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {record?.total_score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {hasTieInFirstSix ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "100%", textTransform: "none" }}
              onClick={handleSubmitRematch}
              disabled={rematchloading}
            >
              {rematchloading ? (
                <CircularProgress size={24} />
              ) : (
                "Rematch"
              )}
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
            gap={2}
          >
            <Button
              variant="contained"
              sx={{
                color: "black",
                fontWeight: 600,
                textTransform: "none",
                backgroundColor: "#dc9092",
                width: "100%",
              }}
              onClick={generateAndSendPDF}
              disabled={rematchloading}
            >  <TelegramIcon />
            {rematchloading ? (
              <CircularProgress size={24} />
            ) : (
              "Send To Organizer"
            )}

            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%", textTransform: "none" }}
              onClick={handleShowOnPublicScreen}
              disabled={showScreenloading}
            >
              {showScreenloading ? (
                <CircularProgress size={24} />
              ) : (
                " Show On Public Screen"
              )}
            </Button>
          </Box>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default AllRecords;


