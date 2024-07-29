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
import { getBehindScreen } from "../store/actions/contestStartActions";
import { useSelector } from "react-redux";

const AllHistory = () => {
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

  const token = useSelector((state) => state?.admin?.token);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://expowithpusherbackend.saeedantechpvt.com/api/admin/expo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setRecords(response?.data?.payload);
      const sortedRecords = response.data.payload.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setRecords(sortedRecords);
    } catch (error) {
      console.error("Error fetching records:", error);
      setSnackbarMessage("Failed to fetch data");
      setSnackbarOpen(true);
      setLoading(false);
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
    navigate(`/user-contest/${id}`);
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
            All History
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ minWidth: isSmall ? "100%" : "700px" }}
          >
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
                <TableRow>
                  <TableCell>Convention Name</TableCell>
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
    </>
  );
};

export default AllHistory;
