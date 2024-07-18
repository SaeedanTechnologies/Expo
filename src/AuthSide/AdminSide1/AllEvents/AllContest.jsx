// import React, { useEffect, useState } from "react";
// import {
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
//   Snackbar,
//   TablePagination,
//   TextField,
//   MenuItem,
//   IconButton,
//   Menu,
// } from "@mui/material";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import MyTextField from "../../../page/components/MyTextField";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { useParams } from "react-router-dom";
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker, TimePicker } from "@mui/x-date-pickers";
// const Allevents = () => {
//   const location = useLocation();
//   //const id = location.state?.id;
//   const { id } = useParams();

//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [monthFilter, setMonthFilter] = useState("");
//   const [yearFilter, setYearFilter] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [dateFilter, setDateFilter] = useState(null);
//   console.log(id,"idData")
//   useEffect(() => {
//     fetchData();
//   }, [page, rowsPerPage, monthFilter, yearFilter]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://expoproject.saeedantechpvt.com/api/all/contests/${id}`,
//         {
//           params: {
//             page: page + 1,
//             per_page: rowsPerPage,
//             month: monthFilter,
//             year: yearFilter,

//           },
//         }
//       );
//       setRecords(response.data);
//     } catch (error) {
//       console.error("Error fetching records:", error);
//       setSnackbarMessage("Failed to fetch data");
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleFilterClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };




//   const handleFilterClose = () => {
//     setAnchorEl(null);
//   };

//   const handleApplyFilter = () => {
//     setPage(0);
//     fetchData();
//     handleFilterClose();
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
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

//   return (


//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "80vh",
//         }}
//       >
//         <Box sx={{ padding: isSmall ? "2rem 10%" : "2rem 30%" }}>
//           <Typography variant="h4" align="center" gutterBottom>
//             All Contest
//           </Typography>
//           <DatePicker
//           label="Start Contest Date"


//           renderInput={(params) => <MyTextField {...params} />}

//           sx={{ marginBottom: "16px" }}
//         />
//           <TableContainer component={Paper} sx={{ minWidth: "700px" }}>
//             <Table aria-label="simple table">
//               <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {records.map((record) => (
//                   <TableRow key={record.id}>
//                     <TableCell>{record.name}</TableCell>
//                     <TableCell>{new Date(record.start_date_time).toLocaleDateString()}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             component="div"
//             count={records.length} // Adjust this based on your API's total count
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Box>
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           message={snackbarMessage}
//         />
//       </Box>


//   );
// };

// export default Allevents;

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
  TextField,
  MenuItem,
  IconButton,
  Menu,
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MyTextField from "../../../page/components/MyTextField";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

const Allevents = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

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

  const recordId=records.map(ids=>ids.id);
  console.log(recordId,"klkkkk");
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, monthFilter, yearFilter, dateFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://deeplink.saeedantechpvt.com/api/all/contests/${id}`,
        {
          params: {
            page: page + 1,
            per_page: rowsPerPage,
            month: monthFilter,
            year: yearFilter,
            date: dateFilter ? dayjs(dateFilter).format('YYYY-MM-DD') : null,
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

  const handleRowClick = (recordId) => {
    navigate(`/public_all-records/${recordId}`);
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
          All Contests
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/*   <Box sx={{textAlign:'end'}}>
        <DatePicker
        label="Date"
        value={dateFilter}
        onChange={handleDateChange}
        renderInput={(params) => <MyTextField {...params} />}
        sx={{ marginBottom: "16px" }}
      />
        </Box> */}
        </LocalizationProvider>
        <TableContainer component={Paper} sx={{ minWidth:  isSmall ? "100%" : "700px"}}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id} onClick={() => handleRowClick(record.id)}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{new Date(record.start_date_time).toLocaleDateString()}</TableCell>
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
    </Box>
  );
};

export default Allevents;

