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
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Allevents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contestId = location.state?.id;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://expopusher.saeedantechpvt.com/api/all/events`,
        {
          params: {
            page,
            per_page: rowsPerPage,
          },
        }
      );
      setRecords(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching records:", error);
      setSnackbarMessage("Failed to fetch data");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // newPage is zero-based index, API uses 1-based index
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page when rows per page changes
  };

  const handleRowClick = (id) => {
    // Navigate to AllContents screen with the specific ID
    navigate(`/all-contest/${id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
          All Events
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ minWidth: isSmall ? "100%" : "700px" }}
        >
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow
                  key={record.id}
                  onClick={() => handleRowClick(record.id)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{record.name}</TableCell>
                  <TableCell>
                    {new Date(record.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalPages * rowsPerPage} // This should ideally come from the API total count
          page={page - 1} // Convert to zero-based index for MUI pagination
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
