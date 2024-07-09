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
import FilterListIcon from "@mui/icons-material/FilterList";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, monthFilter, yearFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://expoproject.saeedantechpvt.com/api/all/events`,
        {
          params: {
            page: page + 1,
            per_page: rowsPerPage,
            month: monthFilter,
            year: yearFilter,
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

  const handleRowClick = (id) => {
    // Navigate to AllContents screen with the specific ID
    navigate(`/all-contest/${id}`);
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={{ padding: 2, width: "300px" }}>
              <Typography variant="subtitle1" gutterBottom>
                Filter Events
              </Typography>
              <TextField
                select
                label="Month"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ mb: 2 }}
              >
                {[...Array(12).keys()].map((m) => (
                  <MenuItem key={m + 1} value={m + 1}>
                    {new Date(0, m).toLocaleString("default", { month: "long" })}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Year"
                type="number"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleFilterClose} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button onClick={handleApplyFilter} variant="contained">
                  Apply
                </Button>
              </Box>
            </Box>
          </Menu>
        </Box>
        <TableContainer component={Paper} sx={{ minWidth: "700px" }}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id} onClick={() => handleRowClick(record.id)} style={{ cursor: "pointer" }}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{new Date(record.created_at).toLocaleDateString()}</TableCell>
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
    </Box>
  );
};

export default Allevents;
