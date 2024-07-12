import React, { useEffect, useState } from "react";
import {
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
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
import { getBehindScreen, getBehindScreenResults } from "../store/actions/contestStartActions";

const SubHistoryComponent = () => {

    const judgeData = [
        {
          name: "usama",
          email: "usama@yopmail.com",
        },
        // Add more judge data as needed
      ];

      const resultData = [
        {
          position: "1",
          name: "usama",
          score: "12.50",
        },
        // Add more result data as needed
      ];




  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dialogType, setDialogType] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, monthFilter, yearFilter, dateFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://expoproject.saeedantechpvt.com/api/all/contests/${id}`,
        {
          params: {
            page: page + 1,
            per_page: rowsPerPage,
            month: monthFilter,
            year: yearFilter,
            date: dateFilter ? dayjs(dateFilter).format("YYYY-MM-DD") : null,
          },
        }
      );
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
      setSnackbarMessage("Failed to fetch data");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleApplyFilter = () => {
    setPage(0);
    fetchData();
    handleFilterClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDateChange = (newDate) => {
    setDateFilter(newDate);
  };

  const handleDialogOpen = async (record, type) => {
    setSelectedRecord(record);
    setDialogType(type);

    // try {

    //   await dispatch(getBehindScreen(record.id));

    // } catch (error) {
    //   console.error("Error fetching additional data:", error);
    //   setSnackbarMessage("Failed to fetch additional data");
    //   setSnackbarOpen(true);
    // } finally {
    //   setLoading(false);
    // }

    try {
        const result = await dispatch(getBehindScreenResults(record.id));
        // setContestResults(result.data.data);
        console.log(result.data.data, 'result data')
      } catch (err) {
        console.log(err);
      }


    const url = `https://frontend.saeedantechpvt.com/admin/contest/${record.id}`;
    setQrCodeUrl(url);

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogType(null);
    setQrCodeUrl("");
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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Box sx={{ padding: isSmall ? "2rem 5%" : "2rem 0%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Contest by User
          </Typography>

          <TableContainer
            component={Paper}
            sx={{ minWidth: isSmall ? "100%" : "700px" }}
          >
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Judges</TableCell>
                  <TableCell>Participants</TableCell>
                  <TableCell>Results</TableCell>
                  <TableCell>QR code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none", fontSize: "0.8rem" }}
                        onClick={() => handleDialogOpen(record, "judges")}
                      >
                        View Judges
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none", fontSize: "0.8rem" }}
                        onClick={() => handleDialogOpen(record, "participants")}
                      >
                        View Participants
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none", fontSize: "0.8rem" }}
                        onClick={() => handleDialogOpen(record, "results")}
                      >
                        View Results
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ textTransform: "none", fontSize: "0.8rem" }}
                        onClick={() => handleDialogOpen(record, "qrcode")}
                      >
                        QR code
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={records.length} // Adjust this based on your API's total count
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
        <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DialogTitle>
              Contest Name : {selectedRecord && selectedRecord.name}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleDialogClose}>
                <ImCross />
              </Button>
            </DialogActions>
          </Box>
          <DialogContent>
            {dialogType === "judges" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                    backgroundColor: "#e3e3e3",
                    padding: "0.5rem 3rem",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ marginLeft: "1rem" }}>Name</Typography>
                  </Box>
                  <Typography>Email</Typography>
                </Box>
                {judgeData.map((judge, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar />
                      <Typography sx={{ marginLeft: "1rem" }}>
                        {judge.name}
                      </Typography>
                    </Box>
                    <Typography>{judge.email}</Typography>
                  </Box>
                ))}
              </>
            )}
            {dialogType === "participants" && (
              <>
                <Typography>Content related to Participants</Typography>
              </>
            )}
            {dialogType === "results" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                    backgroundColor: "#e3e3e3",
                    padding: "0.5rem 0rem",
                  }}
                >
                  <Typography sx={{ marginLeft: "1rem" }}>Position</Typography>
                  <Typography sx={{ marginLeft: "1rem" }}>Name</Typography>
                  <Typography>Score</Typography>
                </Box>
                {resultData.map((result, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Typography sx={{ marginLeft: "1rem" }}>
                      {result.position}
                    </Typography>
                    <Typography sx={{ marginLeft: "1rem" }}>
                      {result.name}
                    </Typography>
                    <Typography>{result.score}</Typography>
                  </Box>
                ))}
              </>
            )}
            {dialogType === "qrcode" && (
              <>
               <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
               {qrCodeUrl && <QRCode value={qrCodeUrl} />}
                {!qrCodeUrl && (
                  <Typography>No QR code URL available.</Typography>
                )}

               </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default SubHistoryComponent;
