import React, { useEffect, useState, useRef } from "react";
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
  Divider,
} from "@mui/material";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllJudges,
  getAllParticipants,
  getBehindScreen,
  getBehindScreenResults,
} from "../store/actions/contestStartActions";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const SubHistoryComponent = () => {
  const namee = useSelector((state) => state?.admin?.user?.name);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [records, setRecords] = useState([]);
  const [contestResults, setContestResults] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  const [contestJudges, setContestJudges] = useState([]);
  const [contestParticipants, setContestParticipants] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingJudges, setLoadingJudges] = useState(false);
  const [loadingParticipants, setLoadingParticipants] = useState({});
  const [loadingResults, setLoadingResults] = useState({});
  const [loadingQRCode, setLoadingQRCode] = useState(false);

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
  const qrRef = useRef();

  const handleAddContest = () => {
    localStorage.setItem("expo_id", id);
    dispatch({
      type: "RESET_STATE",
    });
    navigate("/admin/add-content");
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, monthFilter, yearFilter, dateFilter]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://expowithpusherbackend.saeedantechpvt.com/api/all/contests/${id}`,
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
      setRecords(response?.data);

      const gg = response?.data?.map((ss) => ss?.id);
      continueFunction(gg);
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

  const [continuebtn, setContinue] = useState([]);
  const [continueLoading, setContinueLoading] = useState(false);

  const recordid = records.map((record) => record.id);

  const continueFunction = async (gg) => {
    // const recordid = records.map(record => record?.id);
    setContinueLoading(true);
    try {
      const result = await dispatch(getBehindScreenResults(gg));
      setContinue(result?.data?.data);
      setContinueLoading(false);
    } catch (err) {

      setContinueLoading(false);
    } finally {
      setContinueLoading(false);
    }
  };

  // useEffect(() => {
  //   // const intervalId = setInterval(continueFunction, 3000);
  //   // // Cleanup function to clear the interval when the component is unmounted
  //   // return () => clearInterval(intervalId);
  //   continueFunction()
  // }, []);

  const handleDialogOpen = async (record, type) => {
    setSelectedRecord(record);
    setDialogType(type);

    switch (type) {
      case "judges":
        // setLoadingJudges(true);
        setLoadingStates((prevStates) => ({
          ...prevStates,
          [record.id]: true,
        }));
        try {
          const result = await dispatch(getAllJudges(record.id));
          setContestJudges(result.data.payload);
        } catch (err) {
          console.log(err);
        } finally {
          // setLoadingJudges(false);
          setLoadingStates((prevStates) => ({
            ...prevStates,
            [record.id]: false,
          }));
        }
        break;

      case "participants":
        // setLoadingParticipants(true);

        setLoadingParticipants((prevStates) => ({
          ...prevStates,
          [record.id]: true,
        }));

        try {
          const result = await dispatch(getAllParticipants(record.id));
          setContestParticipants(result.data.payload);
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingParticipants((prevStates) => ({
            ...prevStates,
            [record.id]: false,
          }));
        }
        break;

      case "results":
        // setLoadingResults(true);
        setLoadingResults((prevStates) => ({
          ...prevStates,
          [record.id]: true,
        }));
        try {
          const result = await dispatch(getBehindScreenResults(record.id));
          setContestResults(result.data.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingResults((prevStates) => ({
            ...prevStates,
            [record.id]: false,
          }));
        }
        break;

      case "qrcode":
        setLoadingQRCode(true);
        const url = `${window.location.origin}/admin/contest/${record.id}`;
        setQrCodeUrl(url);
        setLoadingQRCode(false);
        break;

      default:
        break;
    }

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogType(null);
    setQrCodeUrl("");
  };

  // Persist Data for Edit dges from History
  const scorecardExtract = contestJudges
    .map((judge) => judge.scorecards)
    .flat();
  const textFields = scorecardExtract.map((scorecard) => {
    const fields = JSON.parse(scorecard.fields);
    return fields;
  });

  const or = textFields.map((val) => val).flat();


  // const ex = or.map((item, index) => ({

  //   name: "",
  //   label: "",
  //   type: item.type,
  //   value:item.name,
  //   required:true
  // }));

  const seenNames = new Set();

  const ex = or
    .filter((item) => {
      if (seenNames.has(item.name)) {
        return false;
      } else {
        seenNames.add(item.name);
        return true;
      }
    })
    .map((item) => ({
      name: "",
      label: "",
      type: item.type,
      value: item.name,
      required: true,
    }));



  const contestt_id = contestJudges.map((judge) => judge.contest_id);
  const cont_id = contestt_id[0];

  const judgeid = contestJudges.map((judge) => judge.id);

  // const convertImageToBase64 = async (imageUrl) => {
  //   const response = await fetch(imageUrl);
  //   const blob = await response.blob();
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };

  const judgesData = contestJudges.map((item) => ({
    judge_name: item.name,
    email: item.email,
    profile_picture: item.profile_picture,
  }));

  const EditJudges = () => {
    dispatch({
      type: "JUDGES",
      payload: judgesData,
    });

    dispatch({
      type: "JUD_ID",
      payload: judgeid,
    });

    dispatch({
      type: "CONT_ID",
      payload: cont_id,
    });

    dispatch({
      type: "TXT_FIELDS",
      payload: ex,
    });

    navigate("/add-judges");
  };

  const generatePdf = async () => {
    const element = qrRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("qrcode.pdf");
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

          padding: isSmall ? "1rem" : "2rem",
        }}
      >
        <Box sx={{ width: isSmall ? "100%" : "auto" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Contest by {namee}
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}
          >
            <Button
              variant="contained"
              onClick={handleAddContest}
              sx={{ textTransform: "none" }}
            >
              Add New Contest
            </Button>
          </Box>
          <br />
          <br />

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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          fontSize: isSmall ? "0.5rem" : "0.8rem",
                        }}
                        onClick={() => handleDialogOpen(record, "judges")}
                        disabled={loadingStates[record.id]}
                      >
                        {loadingStates[record.id] && dialogType === "judges" ? (
                          <CircularProgress size={20} />
                        ) : (
                          "View Judges"
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          fontSize: isSmall ? "0.5rem" : "0.8rem",
                        }}
                        onClick={() => handleDialogOpen(record, "participants")}
                        disabled={loadingParticipants[record.id]}
                      >
                        {loadingParticipants[record.id] &&
                        dialogType === "participants" ? (
                          <CircularProgress size={20} />
                        ) : (
                          "View Participants"
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          fontSize: isSmall ? "0.5rem" : "0.8rem",
                        }}
                        onClick={() => handleDialogOpen(record, "results")}
                        disabled={loadingResults[record.id]}
                      >
                        {loadingResults[record.id] &&
                        dialogType === "results" ? (
                          <CircularProgress size={20} />
                        ) : (
                          "View Results"
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          fontSize: isSmall ? "0.5rem" : "0.8rem",
                        }}
                        onClick={() => handleDialogOpen(record, "qrcode")}
                        disabled={loadingQRCode}
                      >
                        {loadingQRCode && dialogType === "qrcode" ? (
                          <CircularProgress size={20} />
                        ) : (
                          "QR code"
                        )}
                      </Button>
                    </TableCell>
                    {continueLoading ? (
                      <TableCell colSpan={4}>
                        <CircularProgress />
                      </TableCell>
                    ) : (
                      <>
                        {continuebtn.length === 0 ? (
                          <TableCell colSpan={4}>
                            <Button
                              variant="contained"
                              sx={{ textTransform: "none" }}
                              onClick={() => {
                                // navigate(`/admin-contest-start/${record.id}`);
                                navigate(`/links`, {
                                  state: { contest_id: record.id },
                                });
                              }}
                            >
                              Start the Contest
                            </Button>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={records.length}
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
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    onClick={EditJudges}
                  >
                    Edit
                  </Button>
                </Box>

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
                {contestJudges && contestJudges.length > 0 ? (
                  contestJudges.map((judge, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1rem",
                        padding: "0.5rem 3rem",
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={judge.profile_picture} />
                        <Typography sx={{ marginLeft: "1rem" }}>
                          {judge.name}
                        </Typography>
                      </Box>
                      <Typography>{judge.email}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center", marginTop: "1rem" }}>
                    Judges not found
                  </Typography>
                )}
              </>
            )}
            {dialogType === "participants" && (
              <>
                {contestParticipants.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "20vh",
                    }}
                  >
                    <Typography sx={{ fontWeight: "600", fontSize: "1.5rem" }}>
                      No participants found.
                    </Typography>
                  </Box>
                ) : (
                  contestParticipants.map((participant, index) => {
                    let fieldsValues = {};
                    try {
                      const jsonString = participant.fields_values
                        .replace(/^\"/, "") // remove starting double quote
                        .replace(/\"$/, "") // remove ending double quote
                        .replace(/\\"/g, '"') // replace \" with "
                        .replace(/\\\\/g, "\\"); // replace \\ with \

                      fieldsValues = JSON.parse(jsonString);
                    } catch (error) {
                      console.error("Error parsing fields_values:", error);
                    }
                    return (
                      <Box key={index} sx={{}}>
                        <Typography>
                          Participant ID : {participant.id}
                        </Typography>
                        <Box>
                          {Object.keys(fieldsValues).map((key) => {
                            const value = fieldsValues[key];
                            return (
                              <div
                                key={key}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                <Box>
                                  <Typography sx={{ fontWeight: 600 }}>
                                    {key}:
                                  </Typography>
                                </Box>
                                {typeof value === "string" &&
                                value.startsWith("data:image") ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={value}
                                      alt={key}
                                      style={{
                                        width: "25%",
                                        height: "25%",
                                        display: "block",
                                        // marginBottom: "0.5rem",
                                      }}
                                    />
                                  </Box>
                                ) : (
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      color: "black",
                                      fontFamily: "Roboto",
                                      fontSize: { xs: "14px", md: "16px" },

                                      lineHeight: "16px",
                                      // marginBottom: "0.5rem",
                                    }}
                                  >
                                    {value}
                                  </Typography>
                                )}
                              </div>
                            );
                          })}

                          <Divider />
                          <br />
                        </Box>
                      </Box>
                    );
                  })
                )}
              </>
            )}
            {/* {dialogType === "participants" && (
              <>
                {contestParticipants.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "20vh",
                    }}
                  >
                    <Typography sx={{ fontWeight: "600", fontSize: "1.5rem" }}>
                      No participants found.
                    </Typography>
                  </Box>
                ) : (
                  contestParticipants.map((participant, index) => {
                    let fieldsValues = {};
                    try {
                      const jsonString = participant.fields_values
                        .replace(/^\"/, "") // remove starting double quote
                        .replace(/\"$/, "") // remove ending double quote
                        .replace(/\\"/g, '"') // replace \" with "
                        .replace(/\\\\/g, "\\"); // replace \\ with \

                      fieldsValues = JSON.parse(jsonString);
                    } catch (error) {
                      console.error("Error parsing fields_values:", error);
                    }
                    return (
                      <Box key={index} sx={{}}>
                        <Typography>
                          Participant ID : {participant.id}
                        </Typography>
                        <Box>
                          {Object.keys(fieldsValues).map((key) => {
                            const value = fieldsValues[key];
                            return (
                              <div
                                key={key}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                <Box>
                                  <Typography sx={{ fontWeight: 600 }}>
                                    {key}:
                                  </Typography>
                                </Box>
                                {typeof value === "string" &&
                                value.startsWith("data:image") ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={value}
                                      alt={key}
                                      style={{
                                        width: "25%",
                                        height: "25%",
                                        display: "block",
                                        // marginBottom: "0.5rem",
                                      }}
                                    />
                                  </Box>
                                ) : (
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      color: "black",
                                      fontFamily: "Roboto",
                                      fontSize: { xs: "14px", md: "16px" },

                                      lineHeight: "16px",
                                      // marginBottom: "0.5rem",
                                    }}
                                  >
                                    {value}
                                  </Typography>
                                )}
                              </div>
                            );
                          })}

                          <Divider />
                          <br />
                        </Box>
                      </Box>
                    );
                  })
                )}
                }) )}
              </>
            )} */}

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
                <Box>
                  {contestResults.length === 0 ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: "30vh",
                        }}
                      >
                        <Typography>No Result found.</Typography>
                      </Box>
                    </>
                  ) : (
                    contestResults.map((result, index) => {
                      const fieldsValues = JSON.parse(
                        result.participant.fields_values
                      );
                      return (
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
                            {JSON.parse(fieldsValues).name}
                          </Typography>
                          <Typography>
                            {result.total_score.toFixed(2)}
                          </Typography>
                        </Box>
                      );
                    })
                  )}
                </Box>
              </>
            )}
            {dialogType === "qrcode" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {qrCodeUrl && (
                    <div ref={qrRef}>
                      <QRCode value={qrCodeUrl} />
                    </div>
                  )}
                  {!qrCodeUrl && (
                    <Typography>No QR code URL available.</Typography>
                  )}
                  <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={generatePdf}
                    >
                      Download QR Code as PDF
                    </Button>
                  </Box>
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
