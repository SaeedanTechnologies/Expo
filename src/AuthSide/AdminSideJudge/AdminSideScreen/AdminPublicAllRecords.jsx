import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Positions from "../../../page/components/Positions";
import { useDispatch } from "react-redux";
import { getAllRecordsPublic } from "../../../store/actions/contestStartActions";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AdminPublicAllRecords = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  console.log(id, "KLKKKK")
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAllRecordsPublic(id));
        const { data } = response.data;
        if (data.length === 0) {
          // Display snackbar if records are not found
          setSnackbarMessage("Records not found.");
          setSnackbarOpen(true);
        }
        setRecords(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching records:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleSelectParticipant = (participantId) => {
    setSelectedParticipants((prevSelected) =>
      prevSelected.includes(participantId)
        ? prevSelected.filter((id) => id !== participantId)
        : [...prevSelected, participantId]
    );
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

  const firstSixRecords = records.slice(0, 6);
  const maxScore = Math.max(...firstSixRecords.map((record) => record.total_score));
  const tiedParticipants = firstSixRecords
    .filter((record) => record.total_score === maxScore)
    .map((record) => record.participant_id);

  const hasTieInFirstSix = tiedParticipants.length > 1;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box sx={{ padding: isSmall ? "2rem 10%" : "2rem 0%" }}>
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
                  // sx={{
                  //   border:
                  //     index < 6 &&
                  //     selectedParticipants.includes(record.participant_id)
                       
                  // }}
                  // onClick={() =>
                  //   index < 6 &&
                  //   handleSelectParticipant(record.participant_id)
                  // }
                >
                  <TableCell>
                    <Positions number={record.position} color={record.color} />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* <Avatar
                        src={record.avatar}
                        alt={record.participant.name}
                        sx={{ marginRight: 2 }}
                      /> */}
                      {parseFormFields(record.participant.fields_values)}
                    </Box>
                  </TableCell>
                  <TableCell>{record.total_score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default AdminPublicAllRecords;
