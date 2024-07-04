// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Button,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   Box,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import Positions from "../../page/components/Positions";
// import TelegramIcon from "@mui/icons-material/Telegram";
// import { useDispatch } from "react-redux";
// import {
//   getAllRecords,
//   saveToPublicScreen,
// } from "../../store/actions/contestStartActions";
// import { useLocation } from "react-router";
// import { Snackbar } from "@mui/material";
// const AllRecords = () => {
//   const location = useLocation();
//   const contestId = location.state?.id;

//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

//   const dispatch = useDispatch();

//   const [records1, setRecords1] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   useEffect(
//     () => {
//       const fetchData = async () => {
//         try {
//           const response = await dispatch(getAllRecords(contestId));
//           setRecords1(response.data.data);
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching records:", error);
//           setLoading(false);
//         }
//       };

//       fetchData();
//     },
//     [dispatch],
//     contestId
//   );

//   const handleShowOnPublicScreen = async () => {
//     try {
//       const response = await dispatch(saveToPublicScreen(149));
//       setSnackbarOpen(true);
//       setSnackbarMessage(response.data.message);
//       console.log("Response from public screen API:", response);
//     } catch (error) {
//       setSnackbarOpen(true);
//       setSnackbarMessage(error.response?.data?.message || "An error occurred");
//       console.error("Error saving to public screen:", error);
//     }
//   };

//   const parseFormFields = (fieldsValuesString) => {
//     try {
//       const fieldsValues = JSON.parse(JSON.parse(fieldsValuesString));
//       return fieldsValues;
//     } catch (error) {
//       console.error("Error parsing fields_values:", error);
//       return { name: "Unknown" };
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "80vh",
//       }}
//     >
//       <Box sx={{ padding: isSmall ? "2rem 10%" : "2rem 30%" }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           All Records
//         </Typography>
//         <Typography variant="body1" align="center" gutterBottom>
//           Lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet
//           consectetur lorem ipsum dolor sit amet.
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table aria-label="simple table">
//             <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
//               <TableRow>
//                 <TableCell>Position</TableCell>
//                 <TableCell>Participant Name</TableCell>
//                 <TableCell>Score</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {records1?.map((record) => (
//                 <TableRow key={record.position}>
//                   <TableCell>
//                     <Positions number={record.position} color={record.color} />
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Avatar
//                         src={record.avatar}
//                         alt={record.participant.name}
//                         sx={{ marginRight: 2 }}
//                       />
//                       {parseFormFields(record.participant.fields_values).name}
//                     </Box>
//                   </TableCell>
//                   <TableCell>{record.total_score.toFixed(2)}</TableCell>

//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginTop: 2,
//           }}
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             sx={{
//               color: "black",
//               fontWeight: 600,
//               textTransform: "none",
//               backgroundColor: "#dc9092",
//               width: "100%",
//             }}
//           >
//             <TelegramIcon /> Send To Organizer
//           </Button>
//           <Button
//             variant="contained"
//             sx={{ width: "100%", textTransform: "none" }}
//             onClick={handleShowOnPublicScreen}
//           >
//             Show On Public Screen
//           </Button>
//         </Box>
//       </Box>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         message={snackbarMessage}
//       />
//     </Box>
//   );
// };

// export default AllRecords;


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
} from "../../store/actions/contestStartActions";
import { useLocation } from "react-router";

const AllRecords = () => {
  const location = useLocation();
  const contestId = location.state?.id;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  const [records1, setRecords1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tied, setTied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAllRecords(contestId));
        const records = response.data.data;
        setRecords1(records);
        setLoading(false);

        // Check for tied scores
        const scores = records.map(record => record.total_score);
        console.log(scores, "total score")
        const uniqueScores = new Set(scores);
        setTied(scores.length !== uniqueScores.size);
      } catch (error) {
        console.error("Error fetching records:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, contestId]);

  const handleShowOnPublicScreen = async () => {
    try {
      const response = await dispatch(saveToPublicScreen(149));
      setSnackbarOpen(true);
      setSnackbarMessage(response.data.message);
      console.log("Response from public screen API:", response);
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarMessage(error.response?.data?.message || "An error occurred");
      console.error("Error saving to public screen:", error);
    }
  };

  const parseFormFields = (fieldsValuesString) => {
    try {
      const fieldsValues = JSON.parse(JSON.parse(fieldsValuesString));
      return fieldsValues;
    } catch (error) {
      console.error("Error parsing fields_values:", error);
      return { name: "Unknown" };
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
              {records1.map((record) => (
                <TableRow key={record.position}>
                  <TableCell>
                    <Positions number={record.position} color={record.color} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={record.avatar}
                        alt={record.participant.name}
                        sx={{ marginRight: 2 }}
                      />
                      {parseFormFields(record.participant.fields_values).name}
                    </Box>
                  </TableCell>
                  <TableCell>{record.total_score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
          >
            <TelegramIcon /> Send To Organizer
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%", textTransform: "none" }}
            onClick={handleShowOnPublicScreen}
          >
            Show On Public Screen
          </Button>
        </Box>
        {tied && (
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
            >
              Rematch
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
